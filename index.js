const express = require("express")
const body_parser = require("body-parser")
const app = express()
const https = require("https")

app.use(express.static("public"));
app.use(body_parser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post('/', (req, res) => {
    const firstName = req.body.fn
    const lastName = req.body.ln
    const email = req.body.email
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data)
    var url = 'https://us9.api.mailchimp.com/3.0/lists/831fc721ff';
    var options = {
        method: "POST",
        auth: "inmadar:7d9df18a818bf4802342769c3bb38853-us9"

    }
    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()
})
app.listen(process.env.PORT, (req, res) => {
    console.log("Server is Running on Port 3000")
})


// a1bcf8ecb54e8c3957a1afba48dac2fa-us14
// 92aacedc59

// 7d9df18a818bf4802342769c3bb38853-us9
// 831fc721ff