# StellarFlip Trading Application

StellarFlip is a comprehensive trading application that provides users with various functionalities, including user authentication, trading, and asset management. The application is built with a Spring Boot backend and a React frontend using Shadcn for UI components, Tailwind CSS for styling, and Vite as the build tool.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- User authentication (signup, login, forgot password)
- Two-factor authentication
- Asset management and trading
- Watchlist management
- Wallet management (deposit, withdrawal, transfers)
- Order history and transaction details

## Technologies

### Backend

- **Framework:** Spring Boot
- **Language:** Java
- **Database:** MySQL
- **APIs:** CoinGecko for trading data
- **Security:** JWT for authentication
### Frontend

- **Framework:** React
- **UI Library:** Shadcn
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **State Management:** Redux
- **Form Handling:** React Hook Form

## Dependencies

### Backend

- `spring-boot-starter-web` - For building web applications and RESTful services.
- `spring-boot-starter-data-jpa` - For JPA and Hibernate support.
- `spring-boot-starter-security` - For securing applications with Spring Security.
- `spring-boot-starter-validation` - For validation support.
- `jjwt` - For JSON Web Token (JWT) creation and validation.
- `coin-gecko-api` - For interacting with CoinGecko APIs.
### Frontend

- `react` - A JavaScript library for building user interfaces.
- `@radix-ui/react-avatar` - For Avatar component.
- `@reduxjs/toolkit` - For Redux state management.
- `react-hook-form` - For handling form state and validation.
- `tailwindcss` - For utility-first CSS framework.
- `vite` - For fast and optimized build tooling.
- `shadcn` - For UI components (ensure you have the correct package and version).

## Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/stellarflip-backend.git
   ```
2. **Navigate to the Project Directory:**
```bash
cd stellarflip-backend
```
3. **Install Dependencies:** Make sure you have Java and Maven installed.
```bash
mvn install
```
4. **Run the application:**
```bash
mvn spring-boot:run
```
## Frontend Setup
1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/stellarflip-frontend.git
```
2. **Navigate to the Project Directory:**
```bash
cd stellarflip-frontend
```
3. **Install Dependencies:**
```bash
npm install
```
4. **Run the Development Server:**
```bash
npm run dev
```
5. **Access the Application:** Open your browser and navigate to http://localhost:3000 to view the application.

## API Endpoints
### **User Endpoints**
1. GET /api/users/profile

- Description: Retrieve user profile
- Headers: Authorization: Bearer {jwt}

2. POST /api/users/verification/{verificationType}/send-otp

- Description: Send OTP for verification
- Headers: Authorization: Bearer {jwt}
- Path Parameters: verificationType (EMAIL/MOBILE)

3. PATCH /api/users/enable-two-factor/verify-otp/{otp}

- Description: Enable two-factor authentication
- Headers: Authorization: Bearer {jwt}
- Path Parameters: otp

4. POST /api/users/reset-password/send-otp

- Description: Send OTP for password reset
- Body: { "sendTo": "email", "verificationType": "EMAIL/MOBILE" }

5. PATCH /auth/users/reset-password/verify-otp

- Description: Verify OTP and reset password
- Query Parameters: id
- Body: { "otp": "otp", "password": "newPassword" }
- Headers: Authorization: Bearer {jwt}
### **Wallet Endpoints**
1. GET /api/wallet

- Description: Get user wallet details
- Headers: Authorization: Bearer {jwt}

2. PUT /api/wallet/{walletId}/transfer

- Description: Transfer funds between wallets
- Headers: Authorization: Bearer {jwt}
- Path Parameters: walletId
- Body: { "amount": "amount" }

3. PUT /api/wallet/order/{orderId}/pay

- Description: Pay for an order
- Headers: Authorization: Bearer {jwt}
- Path Parameters: orderId

4. PUT /api/wallet/deposit

- Description: Deposit funds into the wallet
- Headers: Authorization: Bearer {jwt}
- Query Parameters: order_id, payment_id
### **Watchlist Endpoints**
1. GET /api/watchlist/user

- Description: Get user watchlist
- Headers: Authorization: Bearer {jwt}

2. GET /api/watchlist/{watchlistId}

- Description: Get watchlist by ID
- Path Parameters: watchlistId

3. PATCH /api/watchlist/add/coin/{coinId}

- Description: Add a coin to the watchlist
- Headers: Authorization: Bearer {jwt}
- Path Parameters: coinId
### **Withdrawal Endpoints**
1. POST /api/withdrawal/{amount}

- Description: Request a withdrawal
- Headers: Authorization: Bearer {jwt}
- Path Parameters: amount

2. PATCH /api/admin/withdrawal/{id}/proceed/{accept}

- Description: Admin proceed with withdrawal
- Headers: Authorization: Bearer {jwt}
- Path Parameters: id, accept

3. GET /api/withdrawal

- Description: Get user withdrawal history
- Headers: Authorization: Bearer {jwt}

3. GET /api/admin/withdrawal

- Description: Get all withdrawal requests
- Headers: Authorization: Bearer {jwt}
## Usage
- Authentication: Users can sign up, log in, and manage their accounts through the provided forms. JWT tokens are used for authentication and authorization.

- Trading: Users can view and manage their assets, place trades, and monitor their order history.

- Wallet Management: Users can deposit, withdraw, and transfer funds between wallets.

- Watchlist Management: Users can add and manage coins in their watchlist.

## Contributing
If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes. Be sure to follow the coding standards and include tests for your changes.
