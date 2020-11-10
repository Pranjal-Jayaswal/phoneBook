const express = require('express');
const path = require('path');

const port = 8000;

const db=require('./config/mongoose');
const Contact=require ('./models/contact');

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
   Contact.find({},function(err,contacts){
    if(err){
        console.log('errrorrr in fetching');
        return;
    }
    return res.render('index.ejs', {
        title: 'Contact List',
        c_l: contacts,
    });
   })
   
    // return res.render('index.ejs', {
    //     title: 'Contact List',
    //     c_l: cl,
    // });
});

app.get('/delete_contact/',function(req,res){
   
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting');
            return;
        }
        return res.redirect('back');

    })
//     let phone=req.query.phone;
//     //console.log(req.query);
//    let indexCount =cl.findIndex(num => num.phone==phone);
//     if(indexCount != -1){
//         cl.splice(indexCount, 1);
//     }

//     return res.redirect('back');
});

app.post('/createContact',function(req,res){
  //  cl.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone,
    },function(err,newContact){
        if(err){
            console.log('errrorrr');
        }
    })
    console.log('new contact dbdb created')
    return res.redirect('/');
});
  

app.listen(port, function (err) {
    if (err) {
        console.log('error', err);
    }
    console.log('port up running on :', port);
});