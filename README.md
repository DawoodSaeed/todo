# todo APP
# Frontend
Frontend is done in react js form handling is done using react hook form and states are managed using the context api
For making the request to backend I have used axios and haved the concept of interceptors



To RUN : npm run dev
To CHANGE BACKEND URL GO TO: src/utility/URL.js
DOESN'T have .env file


ABOUT THE APP:
You need to login first or register it will store the token using js-cookie
took you to do the todo page 

YOU CAN CLICK THE IMAGE TO UPLOAD THE IMAGE

FOLDER STRUCTURE:
inside SRC
Pages => The main the pages such Todo , Login and Logout screen
Then there is a component page
Services => Has methods to make  request to the api
api => axios configuration file
utility => has URl file to chnage the url of the backend server

NOTIFICATION OF ERRORS ARE DONE USING TOAST PROVIDED => BOOTSTRAP
FORM HANDLING => REACT HOOK FORM
JS-COOKIES
REACT-ROUTER-DOM
AXIOS
CONTEXT API IS USED TO AVOID PROP DRILLING

# BACKEND

To run use: npm start

What I have done
Authentication is done using => passport.js / passport-JWT
To seperate the logic i have used => statics and instance methods of mongoose
Password hashing => bcyrpt
Data validation and schema definition => JOI
Image Upload => Multer


CLEAN CODE AND FOLDER STRUCTURE OF THE CODE

SAMPLE .env file is provided in the github repo

