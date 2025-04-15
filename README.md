# MOTO ARENA SERVER

A robust backend server for the Moto Arena e-commerce platform, built with TypeScript and Express.js.

## Tech Stack

- **Runtime Environment:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Payment Processing:** Stripe
- **Validation:** Zod
- **Error Handling:** Custom error handling middleware
- **Code Quality:** ESLint, Prettier
- **Deployment:** Vercel

## Features

- 🔐 JWT-based Authentication & Authorization
- 👤 User Management (Admin/Customer roles)
- 🏍️ Product Management
- 🛒 Order Processing
- 💳 Stripe Payment Integration
- 🔄 Middleware for Request Validation
- ⚡ TypeScript for Type Safety
- 🛡️ Error Handling
- 📝 Input Validation with Zod

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas URI)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/habibb2r/MOTO-ARENA-SERVER.git
cd MOTO-ARENA-SERVER
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NODE_ENV=development
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_ACCESS_EXPIRES_IN=10d
JWT_REFRESH_EXPIRES_IN=365d
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Running the Server

For development:
```bash
npm run start:dev
# or
yarn start:dev
```

For production build:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## API Endpoints

### Auth Routes
- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user

### Product Routes
- GET /api/products - Get all products
- GET /api/products/:productId - Get single product
- POST /api/products/create-product - Create new product (Admin)
- PUT /api/products/:productId - Update product (Admin)
- DELETE /api/products/delete/:productId - Delete product (Admin)

### Order Routes
- POST /api/orders/make-order - Create new order
- GET /api/orders/myorders/:email - Get user orders
- GET /api/orders/allorders - Get all orders (Admin)
- PATCH /api/orders/update - Update order status (Admin)

### User Routes
- GET /api/user/all - Get all users (Admin)
- GET /api/user/userInfo/:email - Get single user
- PATCH /api/user/update - Update user status (Admin)
- PATCH /api/user/update/user - Update user profile
- PATCH /api/user/update/password - Update user password

## Error Handling

The application includes comprehensive error handling for:
- Validation errors
- Cast errors
- Duplicate key errors
- Generic errors
- Not found routes


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

**HABIBB2R**

- GitHub: [@habibb2r](https://github.com/habibb2r)
- LinkedIn: [@habibb2r](https://linkedin.com/in/habibb2r)
- Portfolio: [habibb2r.site](https://habibb2r.site)

---

Built with ❤️ by HABIBB2R