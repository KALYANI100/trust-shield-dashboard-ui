# 🛡️ Trust Shield Dashboard – Strengthening Retail Cybersecurity

## Overview

With the rise in online transactions, e-commerce platforms like Walmart are increasingly vulnerable to threats such as fraud, data breaches, and identity theft. **Trust Shield Dashboard** is an AI-powered cybersecurity solution designed to enhance trust and transparency for both customers and administrators.

---

## 🚀 Features

### 🔓 Customer Dashboard
- Password Strength Indicator  
- Multi-Factor Authentication (MFA) – Google Authenticator  
- Real-Time Login Alerts  
- Security Score Display  
- Multi-Session Management  
- **Secure 3-Step Payment**  
  - AI-Based Fraud Detection  
  - End-to-End Encryption  
  - Blockchain Verification  
- AI-Verified Product Safety  
- Transaction Dispute Portal  
- Downloadable Proof of Transaction  

### 🧠 Admin Dashboard
- Live Threat Monitoring  
- Attack Detection – Bot, brute force, SQL injection, DoS  
- Auto-Mitigation & IP Blocking  
- Zero Trust Session Control (Verified / Pending / Denied)  
- Transaction Oversight – Approve, reject, investigate  
- Payment Security – Geo-blocking, VPN blocking, Device Fingerprinting  
- Region & Method-Based Restrictions  
- System Settings:  
  - Alert Thresholds  
  - Email Alerts  
  - Two-Factor Authentication  
  - Daily Reports  
  - Session Timeouts  
  - Syslog Support  
  - Data Retention Management  

---

## ✅ Key Benefits
- Boosts customer confidence and platform transparency  
- Enables proactive & AI-powered threat mitigation  
- Reduces fraud and chargebacks  
- Ensures secure, smooth retail operations  

---

## 🧰 Tech Stack

| Layer         | Technology                       |
|---------------|----------------------------------|
| Frontend      | React.js (MERN Stack)            |
| Backend       | Node.js, Express.js, MongoDB     |
| Authentication| Google Sign-In, Google Authenticator (MFA) |
| AI Module     | Python, TensorFlow for Fraud Detection |
| Blockchain    | For secure transaction validation |
| Security      | JWT, Helmet.js, Rate Limiting, Device Fingerprinting |

---

## 🔧 Getting Started

### 📁 Clone the Repository
```bash
git clone https://github.com/KALYANI100/trust-shield-dashboard-ui.git
cd trust-shield-dashboard-ui


cd Backend
npm install
node server.js


cd ..
npm install
npm run dev
```
Create a .env file inside the Backend directory:
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=3d
GOOGLE_CLIENT_ID=your_google_client_id
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=5000

In the Root Directory:-
Create a .env file in the root of the project (same level as frontend package.json):

VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
VITE_SECRET_KEY=your_secret_key_if_needed
VITE_GOOGLE_CLIENT_ID=your_google_client_id
