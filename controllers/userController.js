const Login = require('../models/login');

const user_index = (req,res) =>{
Login.find().sort({createdAt:-1})
.then((result)=>{
    res.render('about',{users:result})
})
.catch((err) => {
    console.log(err);
})
}


const user_details = (req,res) =>{
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
    }

    const user_delete = (req,res) =>{
        const id= req.params.id;
    //ajax request
    Login.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/users'});
    })
    .catch(err => {
        console.log(err);
    })
}



module.exports = {
    user_index,
    user_details,
    user_delete
}