const path = require("path");
const express = require("express");
const app = express();

app.use(express.static("public"));

// API to get a list of users.
app.get("/api/users", (req, res) => {
    var responseObj = {
        message: "Sending a list of all users.",
        messageHtml: "Sending a list of <b>all</b> users."
    };

    res.json(responseObj);
});

// API to get a single user.
app.get("/api/users/:userId", (req, res) => {
    var userId = req.params.userId;

    var responseObj = {
        userId: parseInt(userId),
        message: `Sending a user with the id ${userId}.`,
        messageHtml: `Sending a <b>user</b> with the id <b>${userId}.</b>`
    };

    res.json(responseObj);
});


// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);