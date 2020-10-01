# Instant Messenger

## **Version 1.0**

---

## Overview

This is an instant messaging tool that enables real-time communication between multiple users. It also includes encrypted authentication for login functionality.

## Table of Contents

1. [Tech stack](#Tech-Stack)
2. [Setting up a local instance](#Setting-up-a-local-instance)

## Tech Stack

- Frontend: React Hooks, Lodash, WebSocket from Socket.io, Sass, cookie storage
- Backend: Node.js/Express.js, WebSocket from Socket.io, bcrypt, Mongoose
- Database: MongoDB

## Setting up a local instance

1. **Clone the repo**  
   Navigate to the directory in which you would like to download this repo. Now, run  
   `git clone https://github.com/Shreshth3/instant-messenger.git`. If you prefer, you can fork this repo and clone your forked repo instead, but this is up to you.

2. **Install dependencies**  
   Let's start by navigating into this repo using `cd instant-messenger`. Now, you'll need to install the dependencies that this project will need to run. To do so, run `npm install`.

3. **Run the application**  
   Now that you've cloned the repo and installed your dependencies, simply start your application using `npm run dev`.

4. **Test it out!**  
   It's time to see the instant messenger in action! If this wasn't already done for you, go to http://localhost:8080/ in your browser. You'll want to open this in at least 2 different tabs. Now, create 1 account for each tab and sign in. You're good to go! Simply start sending messages and you should be able to communicate between tabs.
