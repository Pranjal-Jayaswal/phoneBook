const express = require('express');
const path = require('path');

const port = 8000;
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('myassets'));
let cl = [
    {
        name: 'Pranjal',
        phone: '8340792564',
    },
    {
        name: 'John',
        phone: '123456789',
    },
    {
        name: 'Rockefeller',
        phone: '987654321',
    }
];

app.get('/', function (req, res) {
    return res.render('index.ejs', {
        title: 'Contact List',
        c_l: cl,
    });
});

app.get('/delete_contact/',function(req,res){
    let phone=req.query.phone;
    //console.log(req.query);
   let indexCount =cl.findIndex(num => num.phone==phone);
    if(indexCount != -1){
        cl.splice(indexCount, 1);
    }

    return res.redirect('back');
});

app.post('/createContact',function(req,res){
    cl.push(req.body);
    res.redirect('/');
});


app.listen(port, function (err) {
    if (err) {
        console.log('error', err);
    }
    console.log('port up running on :', port);
});