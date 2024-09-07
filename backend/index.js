var express = require("express");
var cors = require("cors");
var { MongoClient } = require("mongodb");
const multer = require("multer");

var app = express();
app.use(cors());

var password = "kamiru890#"; // Replace with your actual password
var encodedPassword = encodeURIComponent(password); // Encode the password

var CONNECTION_STRING = `mongodb+srv://mwangikamiru477:${encodedPassword}@cluster0.ehfuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
var dbName = "Solvit";

var database;

const client = new MongoClient(CONNECTION_STRING);

app.listen(5038, () => {
    console.log("Server is running on http://localhost:5038");
    client.connect((error) => {
        if (error) {
            console.error("MongoDB Connection Failed:", error);
            return;
        }
        database = client.db(dbName);
        console.log("MongoDB Connection Success");
    });
});


app.post('/api/solvit/sending', (req, res) => {
    const { firstName, middleName, lastName, email, gender } = req.body;
    
    // Insert the subscriber data into the collection
    database.collection("SolvItdata").insertOne({
        firstName,
        middleName,
        lastName,
        email,
        gender,
    })
    .then(() => res.json("success"))
    .catch(error => {
        console.error("Error inserting document:", error);
        res.status(500).json("Error inserting document");
    });
});