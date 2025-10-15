# OneCart – E-Commerce Website (MERN Stack)

---

## **Project Overview**
OneCart is a full-stack e-commerce platform built using the **MERN stack**, enabling secure user authentication, dynamic shopping experience, and efficient order processing. It integrates **JWT-based authentication**, **Razorpay payment gateway**, and a modern UI with **Tailwind CSS** for responsive design.  

---

## **Live Demo**
- Frontend: [Live Demo Link](https://onecart-frontend-al3b.onrender.com)   

## **Features**

- **User Authentication & Profile Management** – Secure signup, login, and profile handling using JWT.
- **Dynamic Shopping Cart** – Add/remove products, view totals, and smooth checkout.
- **Admin Panel** – Manage products, categories, and orders with CRUD operations.
- **Payment Integration** – Razorpay integration for secure payments.
- **Real-Time Communication** – RESTful APIs for seamless frontend-backend interaction.
- **Responsive UI** – Tailwind CSS for mobile-first, interactive design.

---

## **Tech Stack**

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Tailwind CSS, Firebase |
| Backend | Node.js, Express.js, REST API, JWT |
| Database | MongoDB |
| Payment Gateway | Razorpay |
| Deployment | Render |

---

## **Installation**

### **Backend**
1. Clone the repository
```bash
git clone https://github.com/Sanjay-P-56/OneCart.git
cd OneCart/backend
npm install
```

2. Environment Variables

To run the backend locally or on a server, you need to create a `.env` file in the `/backend` directory with the following variables:
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
3.Start the backend
```bash
npm run dev
```
### **Frontend**
1.Navigate to frontend
```bash
cd OneCart/frontend
npm install
```
2.Environment Variables

To run the frontend locally, create a `.env` file in the `/frontend` directory with the following variables:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

