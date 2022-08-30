const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Login = require('./models/login');

const dbUrl = 'mongodb+srv://Bilal:bilash15@cluster0.zpy2y2w.mongodb.net/LoginOne?retryWrites=true&w=majority';
mongoose.connect(dbUrl,{useNewUrlparser:true, useUnifiedTopology:true})
    .then((result) => app.listen(3000))
    .catch((err)=> console.log(err));

app.set('view engine','ejs');

//middleware and static files express function [CSS]
app.use(express.static('public') );
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/',(req,res)=>{
    // res.send('<p>Home Page</p>');
    res.render('index');
    
});

app.use((req,res,next)=>{
    console.log('path:', req.path);
    next();
});

app.get('/about', (req,res)=>{
    res.redirect('/users');
});

app.get('/users',(req,res) => {
    Login.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('about',{users:result})
    })
    .catch((err) => {
        console.log(err);
    })
})

// ASK ????
app.post('/', (req, res) => {
     //console.log(req.body);
    const login = new Login(req.body);
  
    login.save()
      .then(result => {
        res.redirect('/users');
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Login.findById(id)
    .then(result => {
         res.render('details',{user:result});
        //  {user: result, title:'User Details'})
         })
         .catch(err => {
        console.log(err);
         });
  })

  app.delete('/users/:id',(req,res) =>{
    const id= req.params.id;

    //ajax request
    Login.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/users'});
    })
    .catch(err =>
        console.log(err));
  })

// app.get('/about',(req,res)=>{
//     // res.send('<p>About Page</p>');
//     res.render('about')
// });

app.use((req,res)=> {
    res.status(404).render('404Page');
})

