const express = require('express');
const router= express.Router();
const User = require('../../models/User');
const Transaction = require('../../models/transaction');

const UserSession = require('../../models/UserSession');
// module.exports = (app) => {
    // app.get('/api/counters', (req, res, next) => {
    //   Counter.find()
    //     .exec()
    //     .then((counter) => res.json(counter))
    //     .catch((err) => next(err));
    // });
  
    // app.post('/api/counters', function (req, res, next) {
    //   const counter = new Counter();
  
    //   counter.save()
    //     .then(() => res.json(counter))
    //     .catch((err) => next(err));
    // });
    router.post('/history',(req,res) =>{
        const {body} = req;
        const {
            Name
        } = body;
        console.log(Name);
        Transaction.find({
            Payee : Name 
        },(err,Users) => {
            if(err){
                return res.send({
                    success: false,
                    history : {'Error' : 'Network error'}
                });
            }
            console.log(Users);
            return res.send({
                success : true,
                Users
            });
           
        } );
    });
    router.post('/pay',(req,res) => {
        const {body} = req;
        const {
            PaidTo,
            Payee,
            Amount
        } = body;
        console.log(PaidTo);
        if(!PaidTo){

            return res.send({
                success: false,
                message : 'Error : PaidTo not given'
            });
        }
        if(!Payee){
            return res.send({
                success: false,
                message : 'Error : Payee not given'
            });
        }
        if(!Amount){
            return res.send({
                success: false,
                message : 'Error : Amount not given'
            });
        }
        User.find({
            Name : PaidTo
        },(err,Users) => {
            if(err){
                return res.send({
                    success: false,
                    message : 'Error : PaidTo not signup'
                });
            }
            // console.log(Users);
            const user=Users[0];
            // console.log(user.Amount)
            // console.log(Amount)
            NewAmount = Number(user.Amount) + Number(Amount);
            // console.log(NewAmount);
            User.findOneAndUpdate({
                Name : PaidTo,
            }, {
                $set :{
                    Amount : NewAmount
                }
            } , null,(err,sessions) => {
                if(err){
                    return res.send({
                        success : false,
                        message : 'Error: Server error'
                    });
                }
                
            });
           
        } );
        User.find({
            Name : Payee
        },(err,Users) => {
            if(err){
                return res.send({
                    success: false,
                    message : 'Error : Payee not signup'
                });
            }
            const user=Users[0];
            const NewAmount = Number(user.Amount) - Number(Amount);
            User.findOneAndUpdate({
                Name : Payee,
            }, {
                $set :{
                    Amount : NewAmount
                }
            } , null,(err,sessions) => {
                if(err){
                    return res.send({
                        success : false,
                        message : 'Error: Server error'
                    });
                }
            });
           
           
        } );
        const newtransaction = new Transaction();
        newtransaction.PaidTo=PaidTo;
        newtransaction.Payee=Payee;
        newtransaction.Amount=Amount;
        console.log(PaidTo);
        console.log(newtransaction.PaidTo,newtransaction.Payee,newtransaction.Amount);
        newtransaction.save((err,result) =>{
            if(err){
                return res.send({
                    success: false,
                    message : 'Error : transaction not saved'
                });
            }
            return res.send({
                success: true,
                message : 'Transaction saved'
            });
        });
        
        


    });
    router.post('/signup',(req,res) => {
        const {body} = req;
        const {
            Name,
            Roll_no,
            password
        } = body;
        const Amount=10000;
        console.log("hello");
        console.log(req.body);
        console.log(req.body.Roll_no);
        if(!Name){

            return res.send({
                success: false,
                message : 'Error : Name not given'
            });
        }
        if(!Roll_no){
            return res.send({
                success: false,
                message : 'Error : Roll No not given'
            });
        }
        if(!password){
            return res.send({
                success: false,
                message : 'Error : password not given'
            });
        }
        User.find({
            Roll_no : Roll_no
        },(err,previousUser) => {
            if(err){
                return res.send({
                    success: false,
                    message : 'Error : Name not given'
                });
            }
            else if(previousUser.length>0)
            {
                return res.send({
                    success: false,
                    message : 'Error :  Account already exist'
                });
            }
            // Save new User
            const newUser = new User();
            newUser.Name=Name;
            newUser.Roll_no=Roll_no;
            newUser.generateHash(password);
            newUser.Amount=Amount;
            newUser.save((err,user) =>{
                if(err){
                    return res.send({
                        success: false,
                        message : 'Error : Name not given'
                    });
                }
                return res.send({
                    success: true,
                    message : 'Signed Up'
                });
            });
        } );
        
    });
    router.post('/signin',(req,res,next) => {
        const {body} = req;
        const {  
            Roll_no,
            password
        } = body;
        if(!Roll_no){
            return res.send({
                success: false,
                message : 'Error : Roll No not given'
            });
        }
        if(!password){
            return res.send({
                success: false,
                message : 'Error : password not given'
            });
        }
        User.find({
            Roll_no : Roll_no
        },(err,users) => {
            if(err){
                return res.send({
                    success: false,
                    message : 'Error : Name not given'
                });
            }
            else if(users.length!=1)
            {
                return res.send({
                    success: false,
                    message : 'Error :  Account already exist'
                });
            }
            const user=users[0];
            if(!user.validPassword(password))
            {
                return res.send({
                    success: false,
                    message : 'Error : Invalid password'
                });
            }
            // otherwise create user session 
            const userSession =  new UserSession();
            userSession.userId = user._id;
            userSession.save((err,doc) => {
                if(err) {
                    return res.send({
                        success : false,
                        message : 'Error : server error'
                    }); 
                }
                return res.send({
                    success: true,
                    message : 'valid sign in',
                    token : doc._id
                });
            });

        });
        

    });
    router.get('/verify',(req,res,next) => {
        const {query} = req;
        const {token} = query;
        UserSession.find({
            _id : token,
            isDeleted : false
        },(err,sessions) => {
            if(err){
                return res.send({
                    success : false,
                    message : 'Error: Server error'
                });
            }
            if(sessions.length != 1){
                return res.send({
                    success : false,
                    message : 'Error: Server error '
                });
            }
            else{
                return res.send({
                    success : true,
                    message : 'Good'
                });
            }
        });
    });
    router.get('/logout',(req,res,next) => {
        const {query} = req;
        const {token} = query;
        UserSession.findOneAndUpdate({
            _id : token,
            isDeleted : false
        }, {
            $set :{
                isDeleted : true
            }
        } , null,(err,sessions) => {
            if(err){
                return res.send({
                    success : false,
                    message : 'Error: Server error'
                });
            }
            if(!sessions){
                return res.send({
                    success : false,
                    message : 'Error: session not found'
                });
            }
            if(sessions.length != 1){
                return res.send({
                    success : false,
                    message : sessions.length
                });
            }
            else{
                return res.send({
                    success : true,
                    message : 'Good'
                });
            }
        });
    });
// };   
module.exports= router;