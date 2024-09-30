const express = require ('express');
const app= express();
const hbs= require('hbs');
const nocache= require('nocache');
const session =require('express-session');
app.set('view engine', 'hbs');
const username= "admin";
const password= "admin@123";
app.use(express.static('public'));
app.use(express.urlencoded({extended:true }));
app.use (express.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(nocache())


app.get('/', (req, res)=>{

if(req.session.user){
    res.render('home')
}else{
    if(req.session.passwordwrong) {
        res.render('login',{msg:"invalid Credentials"})
        req.session.passwordwrong=false
    }else{
        res.render('login');
    }  

}

})


app.post('/verify',(req,res)=>{
    
    console.log(req.body);
    
    if(req.body.username === username && req.body.password===password){

req.session.user = req.body.username
        res.redirect('/home');
    }
    else {
        req.session.passwordwrong=true
        res.redirect('/')
    }
})

app.get('/home',(req, res)=>{

 if(req.session.user){
 
    res.render('home');
 }   
 else
 {
    if(req.session.passwordwrong){
        req.session.passwordwrong=false
        res.render('login',{msg:"Invalid Credentials"})
    }
    else{
        res.render('login')
    }
 }
})



app.get('/logout',(req, res) => {
    req.session.destroy()
    res.render('login',{msg:"Logged Out"})
})





app.listen(3003,()=>console.log("Server Running on port 3000"))

// ----------------------------------------------
// -----------------------------
// -----------------------------------


// const express = require ('express');
// const hbs= require('hbs');
// const session = require('express-session');
// const nocache= require('nocache');
// const app= express();
// const username= "admin";
// const password= "admin@123";
// app.use(express.static('public'));
// app.use(express.urlencoded({extended:true }));
// app.use(express.json());
// app.use(nocache());
// app.use(session({
//     secret : 'keyboard cat',
//     resave :false,
// saveUninitialized:false
// }));
// app.set('view engine','hbs');
// app.get('/',(req,res)=>{
//     if(req.session.user)
//         res.render('home')
//     else {
//         if(req.session.passwordwrong){
//             res.render('login',{msg:"Invalid  Credentials"});
//             req.session.passwordwrong=false
//         }
//         else{
//             res.render('login');
//         }
        
//     }
// })
// app.post("/verify",(req,res)=>{
//     console.log(req.body);
//     if(req.body.username===username&&req.body.password===password){
//        req.session.user=req.body.username;
//        res.redirect('/home');
//     }else {
//         req.session.passwordwrong=true
//       res.redirect('/');
//     }
// })
// app.get('/home',(req,res)=>{
//     if(req.session.user){
//         res.render('home')
//     }
//     else {
//         if(req.session.passwordwrong ){
//             res.render('login',{msg:"Invalid  Credentials"});
//             req.session.passwordwrong=false;
//         } else{
//             res. render('login')
//         }
//     }
// })
// app.get('/logout', (req, res) => {
//     req.session.destroy(() => {
//         res.render('login', { msg: "Logged Out Successfully!!" });
//     });
// });
// app.listen(3000,()=>console.log("Server Running"))
