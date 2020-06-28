const express = require('express')
const app = express()
const port = 3000
var results

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "short_url"
});
app.use(express.urlencoded({ extended: false }))


app.use(express.static('./src/'));

app.set('view engine', 'ejs')
app.set('Views', './views/')
app.listen(port, () => console.log(`Example app listening at http://localhos:${port}`))

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});





app.get('/', (req, res) => {

    con.query("SELECT * FROM url", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        results = result
        res.render("index", { results })
    });
    console.log(results)

})

app.get('/url/:shorturl', (req, res) => {

    let url = con.query(`SELECT url FROM url where short_url="${req.params.shorturl}"`, function (err, result, fields) {
        if (err) throw err;
        console.log(result[0]);

        url = JSON.stringify(result[0].url)


        res.redirect(url.replace('"', '').replace('"', ''))

    });


})


app.post('/url', (req, res) => {
    if (){
        console.log(req.body.url)
    let random_url = Math.random().toString(36).substring(6);
        console.log("random", random_url);
        con.query(`INSERT INTO url (url, short_url) values ("${req.body.url}","${random_url}")`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            results = result
        });
    }
    res.redirect("/");

});
