// Import modules
const fs = require("fs")
// Initialize Express app instance and configure it
const express = require("express")
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as the view engine
app.set("view engine", "ejs")

// Guestbook FP
const guestbookFilePath = "./data/guestbook.json";




// Respond with EJS pages to GET requests
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render("index")
});

app.get('/guestbook', (req, res) => {
    // res.sendFile(__dirname + '/views/guestbook.html');
    res.render("guestbook")
});

app.get('/newmessage', (req, res) => {
    // res.sendFile(__dirname + '/views/newmessage.html');
    res.render("newmessage")
});

app.get('/ajaxmessage', (req, res) => {
    // res.sendFile(__dirname + '/views/ajaxmessage.html');
    res.render("ajaxmessage")
});






// Set operatoins to POST requests
// Client requests guestbook contents
app.post('/guestbook', (req, res) => {
    const guestBookContentsAsStr = fs.readFileSync(guestbookFilePath, "utf-8", (err) => {
        if (err) throw err;
    })
    const guestBookContentAsArray = JSON.parse(guestBookContentsAsStr);
    console.log(guestBookContentAsArray.length);
    res.send(guestBookContentAsArray);
});

// New guest guests form, create AJAX call post data to server and save it
app.post("/ajaxmessage", (req, res) => {
    const newGuest = req.body;
    let guestbookContentAsArray;
    fs.stat(guestbookFilePath, (err, stats) => {
        if (err) {
            console.error("Virhe:", err);
        }
        if (stats.size === 0) {
            guestbookContentAsArray = [];
        } else {
            guestbookContentAsArray = JSON.parse(fs.readFileSync(guestbookFilePath));
        }

        guestbookContentAsArray.push(newGuest);
        fs.writeFileSync(guestbookFilePath, JSON.stringify(guestbookContentAsArray, null, 2));

        let responseArray = []
        const successMessageForClient = "Vieraan lisääminen onnistui!💫"
        const amountOfItems = guestbookContentAsArray.length
        responseArray.push(successMessageForClient, amountOfItems, guestbookContentAsArray);
        console.log(responseArray[2][0]);

        res.send(responseArray)
    });
});

// New guest submits HTML form (non-ajax), save data to guestbook
app.post("/newmessage", (req, res) => {
    const newGuest = req.body;
    let guestbookContentAsArray;
    fs.stat(guestbookFilePath, (err, stats) => {
        if (err) {
            console.error("Virhe:", err);
        }
        if (stats.size === 0) {
            guestbookContentAsArray = [];
        } else {
            guestbookContentAsArray = JSON.parse(fs.readFileSync(guestbookFilePath));
        }
        guestbookContentAsArray.push(newGuest);
        fs.writeFileSync(guestbookFilePath, JSON.stringify(guestbookContentAsArray, null, 2));
    });
    res.render("newmessage")
});













// Set up a 404 page
app.use((req, res) => {
    // res.status(404).sendFile(__dirname + '/views/404.html');
    res.render("404")
})
app.listen(8888, () => {
});


