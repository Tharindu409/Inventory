# 📦 Inventory & Support System

A Full-Stack application for managing warehouse inventory and customer support inquiries. Built using **Spring Boot** (Backend) and **React** (Frontend).

## 🚀 Key Features
- **Inventory Management:** Full CRUD operations for products with image uploads.
- **Stock Alerts:** Automatically tracks low stock levels based on limits.
- **Customer Support:** Integrated "Contact Us" form that saves messages to a database.
- **Admin Inbox:** Specialized dashboard to view, mark as read, or delete messages.
- **Secure Auth:** Password reset functionality via real email (SMTP).
- **Activity Logs:** Tracks all admin actions for accountability.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Spring Boot, Spring Data JPA, Java Mail API
- **Database:** MySQL

## ⚙️ Quick Start

### 1. Database Setup
Create a MySQL database and update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
2. Run Backend
Bash

cd backend
./mvnw spring-boot:run
3. Run Frontend
Bash

cd frontend
npm install
npm start
📂 Project Structure
backend/ - Spring Boot source code and API logic.

frontend/ - React components and user interface.

uploads/ - Directory for stored inventory images.

