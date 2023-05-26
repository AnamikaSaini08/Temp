const app = require('./app');
const dotenv = require('dotenv');
const dbConnection = require('./config/dbConnection');
const User = require('./models/loginModel');
const QuizQuestion = require('./models/quizQuestionMode');

//configuration of env file
dotenv.config( {path: "./config/config.env"});

//connect to db
dbConnection();

//addQuizQuestion
app.post('/admin/addQuestion' , async(req,res)=>{
   const {question , options, correctOptionIndex, imageUrl , videoUrl} = req.body;
   if(!question || options.length || !correctOptionIndex || imageUrl){
    return req.status(404).json({
        success: false,
        message: 'Please provide all the required fields'
    });
   }
   const newQuestion = await new QuizQuestion({question , options, correctOptionIndex, imageUrl , videoUrl});
   await newQuestion.save();
   return res.status(200).json({
    success: true,
    mesaage: "New Question Added successfully"
});
})

//register
app.post('/user/register' , async(req , res)=>{
    const {username , email , password , confirmPassword} = req.body;
    console.log(username , email, password , confirmPassword);
    if(!email || !password || !confirmPassword || !username){
        return res.status(404).json({
            success: false,
            message: "Each Field is required"
        })
    }
    const newUser = await new User({username,email,password});
    await newUser.save();
    return res.status(200).json({
        success: true,
        mesaage: "User register successfully"
    });
});

//login
app.get('/user/login',async(req,res)=>{
    const {email , password} = req.query;
  
    if(!email || !password){
        return res.status(404).json({
            success: false,
            message: "Each Field is required"
        })
    }
    const user = await User.findOne({email});
    console.log(user);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    if(user.password !== password){
        return res.status(404).json({
            success: true,
            message: "emailid or password is incorrect",
        });
    }
    return res.status(200).json({
        success: true,
        name: user.username
    })
})

const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is working at http://localhost:${process.env.PORT}`);
});

//Unhandle Promise Rejection Error
process.on("unhandledRejection", (err)=>{
    console.log("Unhandled Promise Rejection Occurs - ", err.message);
    console.log("Shut down server due to unhandle promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})