# MovieReviewApp
Description: This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to create accounts, log in, and interact with a movie review system. Users can browse movies and leave reviews, while administrators have additional permissions to manage movie data.

How to Run the Project:

To connect to Backend: A preconfigured .env file has been provided for the grader.

To start Backend server 
(runs on http://localhost:5000):
cd server, npm install, node server.js

To start Frontend server 
(runs on http://localhost:3000):
cd client, npm install, npm start

API Routes
POST /api/auth/register, POST /api/auth/login, GET /api/auth/profile, GET /api/auth/admin-test

MongoDB Database
Name: MovieReview
Collections: genres, movies, reviews, users, watchlists



