const express = require('express');
const Session = require('../model/Session');
const { protect } = require('../middleware/authMiddleware');
const UAParser = require('ua-parser-js');


const router = express.Router();

// @route   GET /api/auth/sessions
// @desc    Get all active sessions for the logged-in user
// @access  Private
// router.get('/sessions', protect, async (req, res) => {
//   try {
//     console.log(req.user);
//     const sessions = await Session.find({ userId: req.user._id })
//       .sort({ createdAt: -1 })
//       .select('-token'); // hide token from frontend

//     res.status(200).json({ sessions });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to retrieve sessions' });
//   }
// });

router.get('/sessions', protect, async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const currentBrowser = parser.getResult();

    const sessions = await Session.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-token'); // don't send token

    // Map sessions and parse each userAgent
    const formattedSessions = sessions.map((session) => {
      const parsedUA = new UAParser(session.userAgent).getResult();
      const deviceName = `${parsedUA.browser.name || 'Unknown Browser'} on ${parsedUA.os.name || 'Unknown OS'}`;

      const isCurrentSession = session.userAgent === userAgent;

      return {
        _id: session._id,
        ip: session.ip,
        userAgent: session.userAgent,
        deviceName,
         ipAddress: session.ipAddress,
        createdAt: session.createdAt,
        lastActive: session.lastActive,
        current: isCurrentSession
      };
    });

    res.status(200).json({ sessions: formattedSessions });
  } catch (err) {
    console.error("Error in /sessions:", err);
    res.status(500).json({ message: 'Failed to retrieve sessions' });
  }
});

// @route   DELETE /api/auth/sessions/:sessionId
// @desc    Delete (logout) a specific session by sessionId
// @access  Private
router.delete('/sessions/:sessionId', protect, async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({
      _id: sessionId,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    await session.deleteOne();
    res.status(200).json({ message: 'Session terminated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to terminate session' });
  }
});

// @route   POST /api/auth/logout-all
// @desc    Logout from all devices (delete all sessions)
// @access  Private
router.post('/logout-all', protect, async (req, res) => {
  try {
    await Session.deleteMany({ userId: req.user._id });
    res.status(200).json({ message: 'Logged out from all sessions' });
  } catch (err) {
    res.status(500).json({ message: 'Logout from all failed' });
  }
});

module.exports = router;
