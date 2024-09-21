# Todo App

## Overview

This application is a full-stack Todo application built using React for the frontend and Node.js for the backend. It includes user authentication, todo management, and image upload functionality. 

## Frontend

The frontend is developed in React, utilizing the following technologies:

- **React Hook Form**: For efficient form handling.
- **Context API**: For state management, avoiding prop drilling.
- **Axios**: For making HTTP requests to the backend with interceptors for enhanced request management.
- **JS-Cookies**: For storing authentication tokens.
- **React Router DOM**: For navigation between different pages.
- **Bootstrap Toast**: For displaying error notifications.

### Folder Structure

- **src**
  - **Pages**: Contains main pages like Todo, Login, and Logout screens.
  - **Components**: Reusable components used across the app.
  - **Services**: Methods for making requests to the API.
  - **API**: Axios configuration file for setting up requests.
  - **Utility**: Contains the `URL.js` file to change the backend server URL.

### Running the Frontend

To run the frontend application:

1. Navigate to the project directory.
2. Run the following command:
   ```bash
   npm run dev
