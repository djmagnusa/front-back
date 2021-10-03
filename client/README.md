# MoxieHawk Internal Assignment (using MERN stack)

## How to run

cd server
nodemon app.js

cd client
yarn start

## How it works

Register yourself in the app. The password will be hashed with 12 salt rounds using bcryptjs, making it secure in the database.  

Then try to login and your name will appear in the home screen. This is due to the unique token or cookie being generated for every user



