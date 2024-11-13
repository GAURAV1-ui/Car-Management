Usage
Env variable:
Create a .env file in server directory and add the following:

MONGODB_URI = "Your Mongo URI"
PORT = 8000
JWT_SECRET = "Your JWT secret"

cd client
npm install
npm start
Server:
Note: Make sure that you have installed 'nodemon' as global package.

cd server
npm install
npm run dev
