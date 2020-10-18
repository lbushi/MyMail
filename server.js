var express = require("express");
var bodyParser = require("body-parser");
var user = require("./user");
var { Message } = require("./user");
var { getUser } = require("./user");
var userData = require("./userData");
var cookieSession = require("cookie-session");
var checkSession = function (req) {
    if (req.session && req.session.loggedInUser) {
    }
}
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    name: "session",
    signed: false
}))
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.redirect("/login");
})
app.get("/deleteSession", (req, res) => {
    req.session = null;
    res.redirect("/login");
})
app.get("/login/:user", (req, res) => {
    if (req.session && req.session.loggedInUser == req.params.user) {
        res.render("seeMessages", {user: getUser(req.params.user)});
    }
    else {
    res.sendFile(__dirname + "/public/AuthenticationError.html");
    }
})
app.get("/login", (req, res) => {
    if (!req.session.loggedInUser) {
    res.sendFile(__dirname + "/public/login.html");
    }
    else {
        res.redirect("/login/" + req.session.loggedInUser);
    }
})
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const [theUser, error] = user.authUser({name: username, password: password, messages: []});
    if (error) {
        res.sendFile(__dirname + "/public/loginError.html");
    }
    else {
        req.session.loggedInUser = username;
        res.redirect("/login/" + username);
    }
})
app.get("/signUp", (req, res) => {
    if (!req.session.loggedInUser) {
    res.sendFile(__dirname + "/public/signUp.html");
    }
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
    const msg = new Message(req.session.loggedInUser, content);
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