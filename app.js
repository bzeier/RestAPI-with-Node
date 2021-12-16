var express = require('express');
var app = express();
const port = 3000;


var apiKeys = ['mykey1', 'mykey2', 'mykey3'];



var users = [
    {
        name: "brandon",
        age: "24"
    },
    {
        name: "John",
        age: "21"
    },
    {
        name: "Samantha",
        age: "31"
    },
    {
        name: "Toby",
        age: "51"
    },
]


// catch 404 and forward to error handler
app.use(function (req, res, next) {

    var key = req.query['api-key'];

    if (!key) return next(error(400, 'api key required'));

    if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));


    req.key = key;

    next();

});


// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    if (err) res.send("invalid api key");
});




app.get('/api/user/:name/age', function (req, res, next) {
    var name = req.params.name;
    var age = null;
    users.forEach(user => {
        if (user.name === name) age = user.age;
    })
    if (age) {
        res.send(age)
    } else next();
})

app.get('/api/users', function (req, res, next) {
    res.send(users);
})

app.use(function (req, res) {
    res.status(404);
    res.send({ error: "cant find that"});
});



app.listen(port, () => {
    console.log("Server listening at http://localhost:" + port)
})
