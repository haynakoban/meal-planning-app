# Meal Planning Application Adaptive to User Nutritional Preferences and Available Ingredients

**Capstone Project for University Requirements**

## Overview

This Meal Planning Application is a comprehensive mobile applcation solution developed as a capstone project for university. It is designed to help users plan their meals based on their nutritional preferences and the ingredients they have available. This application offers a user-friendly interface that allows users to create personalized meal plans that align with their dietary goals, while also minimizing food waste by utilizing ingredients they already possess.

![Application Screenshot](screenshot.png) <!-- Replace with a screenshot of your application -->

## Technologies Used

- **Design and Prototyping**: Figma
- **Front-end Development**:
  - HTML 5 (Hypertext Markup Language)
  - CSS 3 (Cascading Style Sheets)
  - JavaScript
  - React.js
  - React Native
- **Development Tools**:
  - Visual Studio Code
  - Node.js
  - Express.js
  - MongoDB
- **API Integration**:
  - Caloriesninjas API
- **Mobile Development**:
  - Expo Go
- **Operating System**:
  - Windows 10

The application utilizes a combination of front-end and back-end technologies, with the front-end developed using HTML, CSS, and JavaScript, powered by the React.js framework for web and React Native for mobile. The back-end is built using Node.js and Express.js, with data stored in a MongoDB database. API integration with Caloriesninjas provides accurate nutritional information, and Figma was used for design and prototyping. Development and coding were done in Visual Studio Code on a Windows 10 environment.

## Installation and Setup

To get started with Meal Planning Application Adaptive to User Nutritional Preferences and Available Ingredients, follow these steps to install and set up the project locally:

### Prerequisites

1. Node.js and npm
2. Git
3. Expo CLI
4. MongoDB (as the database)
5. Editor/IDE (e.g., Visual Studio Code, Sublime Text)

### Step 1: Clone the Repository

Clone the Meal Planning Application Adaptive to User Nutritional Preferences and Available Ingredients repository to your local machine using Git:

  ```
  git clone https://github.com/haynakoban/meal-planning-app.git
  ```

### Step 2: Install Dependencies for **Admin**

1. **Navigate to the project's root directory**: After cloning the project, proceed to the root directory of the project:

  ```
  cd meal-planning-app
  ```

2. **Navigate to Admin directory**: Once you are in the project's root directory, navigate to the "admin" directory:

  ```
  cd admin
  ```

3. **Install Dependencies**: In the "admin" directory, install all the JavaScript dependencies using npm:

  ```
  npm install
  ```

4. **Start the Application**: After all the dependencies are installed, you can start the ReactJS application:

  ```
  npm start
  ```

The application will be available at **http://localhost:3000**.

While the admin panel is running, please open a new terminal and navigate to the project's root directory. In this new terminal, you can proceed to install the server dependencies using the appropriate package manager command for your Node.js server.

### Step 3: Install Dependencies for **Server**

1. **Navigate to the project's root directory**: proceed to the root directory of the project:

  ```
  cd meal-planning-app
  ```

2. **Navigate to Server directory**: Once you are in the project's root directory, navigate to the "server" directory:

  ```
  cd server
  ```

3. **Install Dependencies**: In the "server" directory, install all the JavaScript dependencies using npm:

  ```
  npm install
  ```

4. **Configure Environment Variables**: Create an .env file in your server directory and update the following variables with your own credentials:
   
  ```
  MONGO_URL="add_your_mongo_url"
  ACCESS_SECRET_KEY="create_your_own_access_key"
  EMAIL_PASS="add_your_email_password"
  EMAIL="add_your_email"
  ```
   
5. **Start the Application**: After all the dependencies are installed, you can start the NodeJS application:

  ```
  npm run dev
  ```

The application will be available at **http://localhost:5000**.

Make sure to update the .env file with your desired configurations, such as the database connection details, mail settings, and any other required variables.

While having both the admin panel and server applications running, you can open a new terminal and navigate to the 'client' directory. This directory hosts the user application, which is developed using React Native Expo.

### Step 4: Install Dependencies for **Client**

1. **Navigate to the project's root directory**: proceed to the root directory of the project:

  ```
  cd meal-planning-app
  ```

2. **Navigate to Client directory**: Once you are in the project's root directory, navigate to the "client" directory:

  ```
  cd client
  ```

3. **Install Dependencies**: In the "client" directory, install all the JavaScript dependencies using npm:

  ```
  npm install
  ```
   
4. **Start the Application**: After all the dependencies are installed, you can start the React Native Expo application:

  ```
  npx expo start
  ```

The application will be available and can access it through various methods:

- **Expo Go App**: If you have the Expo Go app installed on your mobile device, you can scan the QR code provided during development to access the application.

- **Web Browser**: If you're running the application on your computer, you can open your web browser and visit the provided localhost URL, typically [http://localhost:19002](http://localhost:19002), to launch the Expo DevTools. From there, you can choose to run the application in your browser.

- **Emulators/Simulators**: You can run the application on mobile device emulators or simulators. The method for doing this depends on your development environment.

Please note that the specific URL and methods for accessing your React Native Expo application may vary depending on your project's configuration and settings.

That's it! **Meal Planning Application Adaptive to User Nutritional Preferences and Available Ingredients** is now installed and ready to be used locally. You can access it in your machine and start exploring the features.

Feel free to customize the installation instructions based on your project's specific requirements.

## License

This project is open-source and is released under the MIT License. You are free to use, modify, and distribute it in accordance with the terms and conditions specified in the license.

## Acknowledgments

We would like to thank the following for their contributions and support in the development of this project:

- Caloriesninjas API: For providing nutritional information data.
- Expo: For simplifying mobile development.
- Node.js, Express.js, and MongoDB: For the robust back-end infrastructure.
- The open-source community for various libraries and tools used in this project.

## Contact

If you have any questions, encounter issues, or need support, please don't hesitate to reach out to our team:

- Email: contact@mealplanningapp.com
- [Twitter](https://twitter.com/mealplanningapp)
- [GitHub Issues](https://github.com/mealplanningapp/mealplanner/issues)

## Disclaimer

This project is developed for educational purposes as a university capstone project and may not be intended for production use. Use it at your own discretion.




