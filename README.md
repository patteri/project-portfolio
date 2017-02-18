# Project Portfolio

This is a template project for creating project portfolios, containing:

- Responsive AngularJS single page app frontend
- Node.js + MongoDB backend

Tools used: Node, MongoDB, NPM, Bower and Gulp.

## Initializing the project
Install packages:
```
npm install

cd frontend
bower install
```

Configure project by editing backend/config.js (server port, MongoDB address etc.) 

Initialize MongoDB:
1. Rename file 'backend/models/_inital_data.js' to 'backend/models/inital_data.js'.
2. Make sure that MongoDB is running.
3. ```npm run init```

## Running the project
Running the server:

Make sure that MongoDB is running.
```
npm start
```

Frontend development:
```
cd frontend
gulp
```