# Shortland Supermarket - Backend API

**Robust, Scalable, and Secure.**

The backbone of Shortland Supermarket, this API manages the business logic, data persistence, and real-time communications that power the application. It serves as the single source of truth for both the customer interface and the admin dashboard.

---

## 🔐 Core Capabilities

### **1. Secure Restful API**
*   **Authentication & Authorization**: Implements industry-standard JWT (JSON Web Tokens) for stateless authentication. Custom middleware protects sensitive routes, ensuring only authorized admins can access management endpoints.
*   **Data Validation**: rigorous input validation ensures data integrity before it ever reaches the database.

### **2. Real-Time Engine**
*   **Socket.io Server**: Acts as the central hub for event broadcasting. It tracks active connections and instantly emits events (like `new_order` or `order_status_change`) to relevant clients, enabling the "live" feel of the platform.

### **3. Media Processing**
*   **Cloud Storage Integration**: Instead of storing heavy images locally or in the database, the backend acts as a secure signing authority to upload files to Cloudinary, returning optimized URLs for frontend delivery.

---

## 🏗️ Architecture & Tools

### **Database & ORM**
*   **PostgreSQL**: A powerful, open-source object-relational database chosen for its reliability and support for complex relationships.
*   **Prisma ORM**: Provides a type-safe database client. It defines the data model in a declarative schema file, automates database migrations, and simplifies complex joins and queries.

### **Server Framework**
*   **Node.js & Express**: Built on the V8 engine for high-performance non-blocking I/O. Express provides the routing layer and middleware support (CORS, Parsing, Logging).

### **Data & Security Utilities**
*   **BCrypt**: Uses salt+hash encryption for storing passwords, ensuring user credentials are safe even in the event of a data breach.
*   **Multer**: Handling `multipart/form-data` for efficient file uploads before offloading to cloud storage.
*   **Dotenv**: Environment variable management to keep secrets (API keys, DB URLs) secure and out of the codebase.

---

## 📂 API Structure Overview

*   **Auth Routes**: Registration, Login, Session validation.
*   **Product Routes**: CRUD operations for inventory management.
*   **Order Routes**: Order placement, status updates, and history retrieval.
*   **Upload Routes**: Secure endpoints for handling media uploads.
