# 🔐 KeyVaultX - RFID Based Smart Key Management System

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/RFID-IoT-success">
  <img src="https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/Status-Completed-brightgreen">
</p>

<p align="center">
  <strong>A secure RFID-powered key management platform for tracking, monitoring, and controlling physical key access in real time.</strong>
</p>

---

# 📖 Overview

KeyVaultX is a Smart Key Management System designed to securely manage physical keys using RFID authentication and a centralized web-based dashboard.

The system ensures that only authorized users can access specific keys while maintaining a complete audit trail of key transactions.

By combining RFID technology with a web application and database backend, KeyVaultX provides secure access control, real-time monitoring, and user management capabilities.

---

# 🎯 Problem Statement

Organizations often struggle with:

* Lost or misplaced keys
* Unauthorized key access
* Lack of accountability
* Manual tracking processes
* Security vulnerabilities

Traditional key cabinets provide little visibility into who accessed a key and when.

KeyVaultX addresses these challenges through RFID authentication and centralized monitoring.

---

# ✨ Features

## 🔑 RFID-Based Authentication

Users authenticate using RFID cards before accessing keys.

Benefits:

* Secure authentication
* Fast access verification
* Reduced manual intervention
* Improved accountability

---

## 👤 User Management

Supports:

* User Registration
* User Authentication
* User-Specific Access Control
* Access Permission Management

---

## 📊 Real-Time Monitoring

Track:

* Key Checkouts
* Key Returns
* User Activity
* Access Logs
* Current Key Status

---

## 🗄️ Secure Database Storage

All information is securely stored including:

* User Records
* RFID Information
* Key Transactions
* Audit Logs

---

## ☁️ Cloud Integration

The system supports AWS connectivity for:

* Centralized Data Storage
* Remote Monitoring
* Scalable Infrastructure

---

## 📈 Activity Tracking

Every action is recorded including:

```text
User Login
RFID Verification
Key Withdrawal
Key Return
Administrative Updates
```

---

# 🏗️ System Architecture

```text
+----------------------+
|      RFID Card       |
+----------+-----------+
           |
           v
+----------------------+
| RFID Reader Module   |
+----------+-----------+
           |
           v
+----------------------+
| Node.js Application  |
+----------+-----------+
           |
           v
+----------------------+
| Express Server       |
+----------+-----------+
           |
           v
+----------------------+
| MySQL Database       |
+----------+-----------+
           |
           v
+----------------------+
| Web Dashboard        |
+----------------------+
```

---

# 🛠️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* EJS Templates

## Backend

* Node.js
* Express.js

## Database

* MySQL

## Hardware

* RFID Reader
* RFID Cards

## Cloud

* AWS

---

# 📂 Project Structure

```text
KeyVaultX/
│
├── RFID_code/
│
├── public/
│   ├── css
│   ├── js
│   └── assets
│
├── views/
│
├── index.js
├── connection.js
│
├── database.sql
│
├── package.json
├── package-lock.json
│
├── .env
│
└── README.md
```

---

# ⚙️ Core Components

## RFID Module

Responsible for:

* Reading RFID Tags
* User Authentication
* Access Validation

---

## Node.js Server

Handles:

* Request Processing
* Authentication Logic
* Database Communication
* User Sessions

---

## Express Framework

Provides:

* Routing
* Middleware
* API Handling
* Server Management

---

## MySQL Database

Stores:

| Entity       | Description           |
| ------------ | --------------------- |
| Users        | Registered users      |
| RFID Tags    | User RFID information |
| Keys         | Available keys        |
| Transactions | Key activity records  |
| Logs         | Audit history         |

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/SDeBAS/KeyVaultX.git
```

## Navigate to Project

```bash
cd KeyVaultX
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=keyvaultx

AWS_ACCESS_KEY=your_key
AWS_SECRET_KEY=your_secret
```

## Create Database

Import:

```sql
database.sql
```

into MySQL.

---

## Start Application

```bash
node index.js
```

or

```bash
npm start
```

---

# 🔄 Workflow

```text
User Scans RFID Card
          │
          ▼
Authentication Check
          │
          ▼
Permission Validation
          │
          ▼
Key Access Granted
          │
          ▼
Transaction Recorded
          │
          ▼
Dashboard Updated
```

---

# 📊 Sample Use Cases

### Educational Institutions

* Laboratory Key Management
* Department Resource Access

### Corporate Offices

* Server Room Keys
* Facility Management

### Hotels

* Secure Key Tracking

### Industrial Facilities

* Restricted Area Access

---

# 🎓 Learning Outcomes

This project demonstrates expertise in:

* IoT Systems
* RFID Technology
* Node.js Development
* Express Framework
* MySQL Database Design
* AWS Integration
* Authentication Systems
* Access Control Management

---

# 🔮 Future Enhancements

Potential improvements include:

* QR Code Authentication
* Mobile Application
* Biometric Authentication
* Real-Time Notifications
* Role-Based Access Control (RBAC)
* Analytics Dashboard
* Cloud-Native Deployment
* Multi-Location Key Tracking

---

# 👨‍💻 Author

## Debanjan Basu

Data Engineer | BI Developer | Full Stack & IoT Enthusiast

GitHub: https://github.com/SDeBAS

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Contributions, suggestions, and feedback are always welcome.
