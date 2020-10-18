# MyMail
Email Application written in Node.js.

MyMail is an Email application written in Node.js and uses HTML, CSS and Javascript to achieve its functionality. 
The functionality encompasses actions such as registering new users, signing in, checking your inbox, and sending messages to other people when you know their username. The application also provides persistent session logins in order to prevent username discrepancies that may arise as a result of  distinct connections opened between the browser and the server. The app also provides persistent user accounts which are stored in a file in the repository.

In order to start the app, first make sure you have Node.js installed on your computer, then simply download or fork this repository on your local machine and then run npm install to download and install all the dependencies of the project and run npm start to start the server.

Finally, once the server is up and running, go to localhost:3000 in your browser to access the application.

There is a lot of room for optimization, especially with regards to how the persistence of user accounts is implemented and the data structures used to store user information. I might optimize this features in the future, but for now the application will remain as it is. Feel free to fork the repo and edit it as you wish.
