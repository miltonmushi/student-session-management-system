# 📘 Student Session Management System

A lightweight **front-end web application** for managing students and their academic sessions, built with **HTML**, **CSS**, and **vanilla JavaScript**, with persistent storage using **LocalStorage**.

This project demonstrates **core software engineering principles**, including data modeling, validation, business rules, UI state management, and client-side persistence.

---

## 🚀 Overview

The application allows users to:

- Add, edit, and delete students
- Assign academic sessions to students
- Enforce real-world business constraints
- Persist data across browser refreshes
- Manage relational data without a backend

Designed as a **clean, maintainable CRUD system**, similar to internal tools used in real-world organizations.

---

## 🧠 Key Features

### 👨‍🎓 Student Management
- Add students with:
  - First name
  - Last name
  - Course
  - Academic year
- Edit student details using a modal interface
- Prevent duplicate students
- Cascade delete (removes a student’s sessions when the student is deleted)

---

### 📅 Session Management
- Assign sessions to registered students
- Each session includes:
  - Student reference
  - Date
  - Duration (hours)
  - Academic module
- Business rule enforcement:
  - A student cannot have more than one session on the same date
  - Past dates are disabled
- Sessions are automatically linked to students

---

### 💾 Persistent Storage
- Uses **Browser LocalStorage**
- Data remains available after refresh or browser restart
- Students and sessions stored independently but linked by IDs

---

### 🛡 Validation & Error Handling
- Name validation using regular expressions
- Required field validation
- User-friendly inline error messages
- Defensive programming to prevent invalid state

---

## 🏗 Tech Stack

| Layer | Technology |
|------|-----------|
| Markup | HTML5 |
| Styling | CSS3 |
| Logic | JavaScript (ES6+) |
| Storage | Browser LocalStorage |
| UI | Vanilla JS + DOM API |

No frameworks were used intentionally to demonstrate strong fundamentals.

---

## 📂 Project Structure

├── index.html  
├── css/  
│   └── styles.css  
├── js/  
│   └── app.js  
└── README.md  

---

## 🔑 Core Design Decisions

### Why LocalStorage?
- Eliminates backend complexity
- Allows focus on data relationships and business logic
- Suitable for small-scale internal tools and prototypes

### Why Vanilla JavaScript?
- Demonstrates understanding of DOM manipulation
- Event-driven programming
- State management
- No abstraction hides implementation details

### Why ID-based Relationships?
- Students and sessions are linked using unique IDs
- Mimics relational database principles on the client side

---

## 🧪 Business Rules Implemented

1. A student must have a unique combination of first name, last name, and course
2. A student may not have two sessions on the same date
3. Deleting a student automatically deletes all related sessions
4. Session dates cannot be in the past
5. Names must contain letters only and be at least 2 characters long

---

## 🖥 User Interface Highlights

- Clean tabular layout for data visibility
- Modal-based editing for better UX
- Inline error messages instead of alerts
- Reset buttons for fast form clearing

---

## 🧩 Possible Enhancements

- Modular JavaScript architecture
- REST API integration
- Authentication & user roles
- Search and filtering
- Pagination for large datasets
- Unit testing
- Migration to React or Angular

---

## 🎯 What This Project Demonstrates

- Strong JavaScript fundamentals
- Understanding of CRUD operations
- Client-side data persistence
- Business rule enforcement
- UI state management
- Clean and readable code

---

## 👤 Author

**Milton**

Computer Science Graduate | Aspiring Software Engineer
