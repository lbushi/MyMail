var express = require("express");
var bodyParser = require("body-parser");
var user = require("./user");
var { Message } = require("./user");
var userData = require("./userData");
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var loggedInUser = {};
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
})
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const [theUser, error] = user.authUser({name: username, password: password, messages: []});
    if (error) {
        res.sendFile(__dirname + "/public/loginError.html");
    }
    else {
        res.render("seeMessages", {user: theUser});
        loggedInUser = theUser;
    }
})
app.get("/signUp", (req, res) => {
    res.sendFile(__dirname + "/public/signUp.html");

})
app.post("/signUp", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new user.User(username, password);
    error = user.addUser(newUser);
    if (!error) {
        userData.WriteUsersToFile();
    }
    res.render("signUpResult", {error: error});
})
app.get("/sendMessage", (req, res) => {
    res.sendFile(__dirname + "/public/sendMessage.html");
})
app.post("/sendMessage", (req, res) => {
    const receiver = req.body.receiver;
    const content = req.body.content;
    const msg = new Message(loggedInUser.name, content);
    const [success, failure] = ["Your message has been sent!", "There was an error sending your message, please try again!"];
    for (let i = 0; i < user.userList.length; ++i) {
        if (user.userList[i].name === receiver) {
            user.userList[i].receiveMessage(msg);
            res.render("sentMessage", {message: success});
            userData.WriteUsersToFile();
            return;
        }
    }
    res.render("sentMessage", {message: failure});
})
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started successfully!");
    userData.GetUsersFromFile();
})