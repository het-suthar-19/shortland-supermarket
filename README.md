# Shortland Supermarket

**A Next-Generation E-Commerce Platform**

Shortland Supermarket is a modern, full-stack web application designed to deliver a seamless shopping experience for customers and a powerful management interface for administrators. Built with a focus on **real-time interactivity**, **scalability**, and **user-centric design**, this project bridges the gap between traditional e-commerce and modern web capabilities.

---

## 🚀 Key Features

### 🛍️ Customer Experience
*   **Immersive Product Browsing**: A responsive and fast product catalog with categorized views and detailed product pages.
*   **Real-Time Order Tracking**: Leveraging WebSockets, customers receive instant status updates on their orders without needing to refresh the page.
*   **Seamless Cart Management**: Optimized global state management ensures the shopping cart persists and updates instantly across the application.
*   **Secure Authentication**: Robust user registration and login system ensuring data privacy.

### 💼 Admin Dashboard
*   **Centralized Control**: comprehensive dashboard for managing products, orders, and user data.
*   **Live Order Management**: Admins receive real-time notifications for new orders and can update statuses (Accepted, Shipped, Delivered) instantly.
*   **Cloud-Based Asset Management**: Integration with Cloudinary for secure and optimized product image uploads and hosting.
*   **Inventory Control**: Tools to add, edit, or remove products effortlessly.

---

## 🛠️ Technology Stack

This project works on a high-performance **Service-Oriented Architecture**, utilizing best-in-class technologies for each layer of the application.

### **Frontend**
*   **Core**: React.js (Vite) for a lightning-fast component-based UI.
*   **Styling**: Tailwind CSS for a modern, responsive, and mobile-first design system.
*   **State Management**: Zustand for simplified and scalable application state.
*   **Network**: Axios for efficient API communication.
*   **Real-Time**: Socket.io Client for bi-directional live events.
*   **Icons**: Lucide React for a clean and consistent icon set.

### **Backend**
*   **Runtime**: Node.js & Express.js for a robust non-blocking event-driven server.
*   **Database**: PostgreSQL (via Prisma ORM) for reliable, relational data integrity and complex querying.
*   **ORM**: Prisma for type-safe database access and efficient schema migrations.
*   **Storage**: Cloudinary for scalable cloud-based media management.
*   **Real-Time**: Socket.io for handling concurrent connections and broadcasting events.
*   **Security**: JSON Web Tokens (JWT) for stateless authentication and BCrypt for password hashing.
