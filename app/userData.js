var fs = require("fs");
var user = require("./user");
const fileName = "/public/userData.json";
function WriteUsersToFile() {
    fs.writeFile(__dirname + fileName, JSON.stringify({users: user.userList}), (err) => {
        if (err) {
            throw err;
        }
    })};
function GetUsersFromFile() {
    const data = fs.readFileSync(__dirname + fileName);
    const data_array = JSON.parse(data).users;
    user.populateList(data_array);
}
module.exports = {
    WriteUsersToFile: WriteUsersToFile,
    GetUsersFromFile: GetUsersFromFile
}

