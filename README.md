
# YouMove - A Fitness App

YouMove app is a fitness app that allows users to create customized workouts that are associated with a specific workout video from YouTube. The purpose of the app is for users to be able to have all their favorite workout videos in one place and to easily take notes on their favorite workout videos!


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, PostgreSQL

## API Reference

[YouTube API](https://developers.google.com/youtube/v3)

[Auth0 API](https://auth0.com/docs/api)

## Wireframe 

![Wireframe](images/wireframe.png)

## Database Tables

![Tables](images/DBSchema.png)

## Installation

This project requires **Auth0**! Please visit Auth0 to make an account and retrieve a domain and clientid. See .envexample for set up!

Step 1: Clone my project & switch into the project directory 

  ```
  git clone git@github.com:yazmintorres/YouMoveApp.git
  cd youmoveapp
```

Step 2: Install all packages.

  ```
  cd client && npm install && cd ../server && npm install
```

Step 3: Setup Environment Variables

Copy the instructions from both .envexample files in the client and server.

Step 4: Connect the database and the data.

  ```
   cd server
   psql postgres -f db.sql
```

Step 5: Start the program!

  ```
   npm run dev
```

Note: Client server will be running on http://localhost:5173 and server will be running on http://localhost:8080.
