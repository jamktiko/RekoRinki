# Backend

## This backend uses the following key technologies:

•
Node.js (ES Modules)
•
Express 5
•
MySQL + Sequelize
•
JWT authentication
•
bcryptjs for password hashing
•
dotenv for environment variables
•
AWS Secrets Manager (for secure secret storage)
•
Morgan for HTTP request logging
•
CORS, cookie-parser, http-errors
Dev tools:
•
nodemon for development hot-reloading

## Setup for New Developers

1.  Clone the repo

```bash
git clone https://github.com/jamktiko/RekoRinki.git

2. Go to backend folder
cd backend

3. Install dependencies
npm install

4. Create a .env file in the backend root with the following content:
NODE_ENV=development
DB_PORT=3306
BACKEND_PORT=3000
DB_HOST=localhost
DB_DATABASE=rekorinki
DB_USER=root
DB_PASSWORD=password
SECRET=password123

Running the Application
npm run dev
Production mode
npm start
```
