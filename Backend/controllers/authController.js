// const User = require('../model/user');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { OAuth2Client } = require('google-auth-library');

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // Helper function to generate JWT token
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Create new user
//     const user = await User.create({ name, email, password, role });

//     // Generate token
//     const token = generateToken(user._id);

//     res.status(201).json({ user, token });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).reduce((acc, err) => {
//         acc[err.path] = err.message;
//         return acc;
//       }, {});
//       return res.status(400).json({ errors });
//     }
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Check password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate token
//     const token = generateToken(user._id);

//     res.json({ user, token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.googleLogin = async (req, res) => {
//   try {
//     const { credential } = req.body;

//     // Verify Google token
//     const ticket = await googleClient.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     if (!payload) {
//       return res.status(401).json({ message: 'Invalid Google token' });
//     }

//     // Check if user exists
//     let user = await User.findOne({ email: payload.email });

//     if (!user) {
//       // Create new user if doesn't exist
//       user = await User.create({
//         name: payload.name || payload.email.split('@')[0],
//         email: payload.email,
//         password: Math.random().toString(36).slice(-8), // Random password
//         avatar: payload.picture,
//       });
//     }

//     // Generate token
//     const token = generateToken(user._id);

//     res.json({ user, token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getMe = async (req, res) => {
//   try {
//     // req.user is set by the auth middleware
//     const user = await User.findById(req.user?.id).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.logout = async (req, res) => {
//   try {
//     // In a real app, you might want to invalidate the token
//     res.json({ message: 'Logged out successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.verifyRecaptcha = async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.status(400).json({ message: 'Token is required' });
//     }

//     const response = await axios.post(
//       `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
//     );

//     const { success, score } = response.data;

//     if (!success || score < 0.5) {
//       return res.status(400).json({ 
//         message: 'reCAPTCHA verification failed',
//         details: response.data
//       });
//     }

//     res.json({ success: true, score });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const User = require('../model/user');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const Session = require('../model/Session');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper: Generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Helper: Save session
const saveSession = async (userId, token, req) => {
  await Session.create({
    userId,
    token,
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.create({ name, email, password, role });

    const token = generateToken(user._id);
    await saveSession(user._id, token, req);

    res.status(201).json({ user, token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    await saveSession(user._id, token, req);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: 'Invalid Google token' });
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        password: Math.random().toString(36).slice(-8),
        avatar: payload.picture,
      });
    }

    const token = generateToken(user._id);
    await saveSession(user._id, token, req);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    await Session.deleteOne({ userId: req.user.id, token: req.token });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyRecaptcha = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );

    const { success, score } = response.data;

    if (!success || score < 0.5) {
      return res.status(400).json({
        message: 'reCAPTCHA verification failed',
        details: response.data,
      });
    }

    res.json({ success: true, score });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
