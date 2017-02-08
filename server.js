const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if(err){
      console.log('Unable to append to the server.log')
    }
  });
  next();
});

// app.use((req,res,next) => {
// res.render('maintance.hbs');
// next();
//
// });
app.use(express.static(__dirname + '/public'));
app.use(express.static('./public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res)=>{
  // res.send('<h1>Hello Express!</h1>')
  res.render('home.hbs',{
    pageTitle:'Home page',
    welcomeMessage:'Who am I?',

  });

});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',

  });

});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Project Page',
    welcomeMessage:'Projects'

  });

});

app.get('/skills',(req,res)=>{
  res.render('skills.hbs',{
    pageTitle:'Skills Page',
    welcomeMessage:'What are my skills?'

  });

});
app.get('/contact',(req,res)=>{
  res.render('contact.hbs',{
    pageTitle:'Contact Page',
    welcomeMessage:'Contact me'

  });

});

app.get('/bad',(req,res)=>{
  res.send({
  errorMessage:"Unable to handle request"});

});

app.listen(port,() =>{
  console.log(`Server is up on port ${port}`)
});
