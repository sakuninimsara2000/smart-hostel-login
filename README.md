
🏨 Smart Hostel Management System with Fingerprint Attendance

Sathyapala Girls Hostel – University of Ruhuna

Group 05

---
 📌 Overview

The Smart Hostel Management System is designed to digitally manage hostel operations by replacing manual work.
The system includes fingerprint-based attendance, online student registration, and automatic room allocation for secure and efficient hostel management.

---

 ⭐ Main Features

🔐 Fingerprint Attendance

* Students scan their fingerprints to mark entry and exit
* Warden views real-time attendance
* OLED display shows status messages (e.g., “Marked Attendance”, “Access Denied”)

 📝 Online Registration

* New students complete online registration
* System sends confirmation emails
* Admin/Warden can edit student details

🏠 Room Allocation

* System automatically assigns rooms to newly registered students
* Rooms are allocated based on availability
* Admin can manually update room numbers if needed
* Room details included in student profile and email confirmation

---

🎯 Objectives

* Automate hostel operations
* Improve student security
* Ensure accurate attendance records
* Speed up registration and room assignment
* Reduce manual errors

---

🚫 Problem Domain

* Manual logbook attendance
* Slow and inaccurate record updates
* Manual room assignment leading to errors
* No real-time tracking

---

 💡 Our Solution

A digital system with the following modules:
✔ Attendance Module
✔ Registration Module
✔ Room Allocation Module

---

✔ Functional Requirements

Attendance Module

* Students scan fingerprint to mark entry/exit
* Real-time attendance dashboard
* Display student ID and name during scanning

 Registration Module

* Students register online with personal details
* System validates inputs
* Admin can update student profiles

Room Allocation Module

* System automatically assigns rooms during registration
* Admin can reassign rooms
* Students receive room details via email

---

🔒 Non-Functional Requirements

* Fast and accurate fingerprint recognition
* Real-time data syncing with server
* Secure data transfer from ESP32
* Easy-to-use, responsive interface
* Secure and organized database

---

🛠 Tools & Technologies

Software

* HTML, CSS, JavaScript, Bootstrap
* Laravel (Backend)
* MySQL (Database)
* Figma, VS Code, GitHub

Hardware

* ESP32 Microcontroller
* Fingerprint Sensor
* OLED Display

---
 🧩 Development Method – Waterfall

1. Requirement Gathering
2. System Design
3. Implementation
4. Testing
5. Deployment

---

🧠 Development Process

* Interviewed students and wardens
* Designed UI, system architecture, and database structure
* Developed frontend and backend
* Integrated ESP32 fingerprint module with API
* Performed testing (Unit + Integration + UAT)
* Deployment and user training

---

 🏛 System Architecture

Client Layer:

* Web application (Admin, Warden, Students)
* Fingerprint device for attendance

Application Layer:

* Attendance processing
* Student registration
* Room allocation logic
* Authentication & access control

Database Layer:

* Students
* Rooms & allocations
* Attendance logs


