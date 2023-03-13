const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

// Set up Handlebars.
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: ''
}));

app.set("view engine", ".hbs");

// Set up Body Parser.
app.use(express.urlencoded({ extended: true }));

// Connect to the mongodb
mongoose.connect("mongodb+srv://dbUser:Password123@web322cluster.nbkntje.mongodb.net/web322db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define my schema and model
const nameSchema = new mongoose.Schema({
    "nickname": {
        "type": String,
        "unique": true
    },
    "fName": String,
    "lName": String,
    "age": {
        "type": Number,
        "default": 21
    }
});

const nameModel = mongoose.model("names", nameSchema);

// Add your routes here
// e.g. app.get() { ... }

app.get("/", (req, res) => {
    nameModel.find()
        .then(data => {
            // Pull the data (exclusively)
            // This is to ensure that our "data" object contains the returned data (only) and nothing else.
            let names = data.map(value => value.toObject());

            res.render("nameTable", {
                names
            });
        });
});

app.post("/addName", (req, res) => {
    var { nickname, fName, lName, age } = req.body;

    // age = parseInt(age);

    // if (isNaN(age))
    //     age = undefined;

    const newName = new nameModel({
        nickname,
        fName,
        lName,
        age
    });

    newName.save()
        .then(() => {
            console.log("Created a name document for: " + nickname);
            res.redirect("/");
        })
        .catch(err => {
            console.log("Couldn't create the name: " + nickname);
            res.redirect("/");
        });
});

app.post("/updateName", (req, res) => {
    var { nickname, fName, lName, age } = req.body;

    // Check to see if the first name and last name fields are blank.
    if (fName.trim().length === 0 && lName.trim().length === 0) {
        // Remove the document from the collection.

        nameModel.deleteOne({
            nickname
        })
            .then(() => {
                console.log("Successfully deleted the document for: " + nickname);
                res.redirect("/");
            })
            .catch(err => {
                console.log("Failed to delete the document for: " + nickname);
                res.redirect("/");
            });
    }
    else {
        // Update the document in the collection.
        age = parseInt(age);

        if (isNaN(age))
            age = undefined;

        nameModel.updateOne({
            nickname
        }, {
            $set: {
                lName,
                fName,
                age
            }
        })
            .then(() => {
                console.log("Successfully updated the document for: " + nickname);
                res.redirect("/");
            })
            .catch(err => {
                console.log("Failed to update the document for: " + nickname);
                res.redirect("/");
            });
    }
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