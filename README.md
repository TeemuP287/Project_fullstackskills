# Project_fullstackskills
 
MEAN Stack Task Management Application

This is a task management application built on the MEAN (MongoDB, Express.js, Angular, Node.js) stack, allowing users to add, edit, delete, and mark tasks as completed, with a few extra features. The project video can be found in the Project_video folder.


## Client

This project was generated with [Angular CLI](https://gitahub.com/angular/angular-cli) version 17.3.6.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


---------------------


Installation

##
Install Node.js
To install Node.js, follow these instructions:

Download the installation package from the official Node.js website at nodejs.org and install the latest version.

For Windows: Open the downloaded installation package and follow the installation instructions.
For macOS: Open the downloaded .pkg file and follow the installation instructions.
For Linux: Open a terminal and execute the installation package with the following command:
Copy code
sudo apt install nodejs

Ensure that Node.js and npm are installed successfully by opening a terminal and running the following commands:

node -v
npm -v
These commands should display the Node.js and npm versions.

##
Angular
To install Angular using npm, run the following command:
npm install -g @angular/cli

##
Express.js
Install Express.js using npm with the following command:
npm install -g express

##
MongoDB
Follow the official MongoDB instructions to install MongoDB.

##
Nodemon
Nodemon helps in developing Node.js applications faster by automatically restarting the server whenever files are modified. You can install Nodemon using npm with the following command:
npm install -g nodemon
Getting Started
Cloning the Repository
Clone this repository to your local machine.

##
Client (Frontend)
Navigate to the client directory:
cd client

##
Install Dependencies
Install the required dependencies by running:
npm install
Starting the Angular Application
To start the Angular application, run:
ng serve
The application will be accessible at http://localhost:4200


---------------------

##
Server (Backend)
Navigate to the server directory:
cd server
Install Dependencies
Install the required dependencies by running:
npm install
Starting the Express.js Server
To start the Express.js server, run:
npm run dev
The Express.js server will be running at_ http://localhost:3000


##
Database
The application uses MongoDB as the database, with a collection named "tasks" containing the following fields:

`_id`: Unique identifier for the task
`title`: Task title
`description`: Task description
`completed`: Boolean value indicating whether the task is completed or not
`created_at`: Date of task creation
`updated_at`: Date of last task update
`__v`: MongoDB versioning information

Ensure MongoDB is running. By default, it should be accessible at: mongodb://localhost:27017/mydatabase


##
Accessing the API
You can access the tasks through the following endpoint: http://localhost:3000/api/tasks
