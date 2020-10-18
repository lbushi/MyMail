var userList = [];
function User(name, password, messages = []) {
    this.name = name;
    this.password = password;
    this.messages = messages;
    this.receiveMessage = function(msg) {
        this.messages.push(msg);

    }
}
function Message(sender, content) {
    this.sender = sender;
    this.content = content;
}
function addUser(user) {
    if (userList.map((element) => {
        return element.name;
    }).includes(user.name)) {
        return true;
    }
    userList.push(user);
    return false;
}
function authUser(user) {
        for (let i = 0; i < userList.length; ++i) {
            if (userList[i].name === user.name && userList[i].password === user.password) {
                return [userList[i], false];
            }
        }
    return [null, true];
}
function populateList(data_array) {
    for (let i = 0; i < userList.length; ++i) {
        userList.pop();
    }
    for (let i = 0; i < data_array.length; ++i) {
        userList.push(new User(data_array[i].name, data_array[i].password, data_array[i].messages));
    }
}
function getUser(username) {
    for (let i = 0; i < userList.length; ++i) {
        if (userList[i].name === username) {
            return userList[i];
        }
    }
}
module.exports = {
    userList: userList,
    User: User,
    Message: Message,
    addUser: addUser, 
    authUser: authUser,
    populateList: populateList,
    getUser: getUser
}