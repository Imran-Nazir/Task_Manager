const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");


exports.registration = async (req, res)=>{
    let reqBody = req.body;
    try{
        let result = await UsersModel.create(reqBody);
        res.status(200).json({status:"Success", data: result})
    }
    catch(e){ 
        res.status(200).json({status:"Fail", data: e})
    }
}

exports.login = async (req, res)=>{

    let reqBody = req.body;

    try{
        let email = req.body['email'];
        let password =  req.body['password'];
        let result = await UsersModel.find({email:email, password:password}).count();

        if(result === 1){
            let Payload = {
                exp: Math.floor(Date.now() / 1000) + 24*60*60 , //1 hour
                data: email
            }
            let token = jwt.sign(Payload, "secrateKey1234")
            res.status(200).json({status:"Success", data: token});
        }
        else{
            res.status(200).json({status:"Failed", data: "User not found"});
        }
        
    }


    catch(e){
        res.status(200).json({status:"Fail", data: e.toString()})
    }
}

exports.profileUpdate = async (req, res)=>{

    try{
        let email = req.headers['email'];
        let reqBody = req.body;
        let result = await UsersModel.updateOne({email:email}, reqBody);
        res.status(200).json({status:"Success", data: result})
    }
    catch(e){
        res.status(200).json({status:"Fail", data: e.toString()})
    }

}

exports.profileDetails = async (req, res)=>{
    try{
        let email = req.headers['email'];
        let result = await UsersModel.find({email:email});
        res.status(200).json({status:"Success", data: result})
    }
    catch(e){
        res.status(200).json({status:"Fail", data: e.toString()})
    }
}

exports.RecoverVerifyEmail = async (req, res)=>{
    try{
        let email = req.params.email;
        let OTPCode = Math.floor(100000 + Math.random()*900000);
        let result = await UsersModel.find({ email: email}).count();
        let EmailText = "Your verification code is: "+OTPCode;
        let EmailSubject = "Task Manager verification code"
        if(result === 1){
            //verification code send to email
            await SendEmailUtility(email, EmailText, EmailSubject);
            //otps collection creation
            let result = await OTPModel.create({email:email, otp: OTPCode})
            res.status(200).json({status:"Success", data: "6 digit verification code has been send"});

        }
        else{
            res.status(200).json({status:"Fail", data: e.toString()})
        }
    }
    catch(e){
        res.status(200).json({status:"Fail", data: e})
    }

}

exports.RecoverVerifyOTP =async (req, res)=>{
    
        let email = req.params.email;
        let OTPCode = req.params.otp;
        //otp unused obosthae thakle status 0 r used hole status 1
        let status = 0;
        let statusUpdate = 1;

        let result = await OTPModel.find({email: email, otp: OTPCode, status:status}).count();
        //এখানে time validation দিতে হবে। এবং এটি দেওয়ার জন্য otps collection থেকে ডেইট পিক করতে হবে find মেথড দিয়ে।


        if(result===1){
            //opt used hoe gele er status 0 theke 1 kore dite hobe, jar karone status updateOne korte hobe
            await OTPModel.updateOne({email:email,otp:OTPCode, status: status}, {status:statusUpdate});
            res.status(200).json({status:"success",data:"Verification Completed"});
        }
        else{
            res.status(200).json({status:"fail",data:"Invalid Verification"});
        }


    
}

exports.RecoverResetPass =async (req, res)=>{
    let email = req.body['email'];
    let OTPCode = req.body['otp'];
    let NewPass = req.body['password'];
    let statusUpdate = 1;

    //পাসওয়ার্ড ভেরিফিকেশনের জন্য আমাদেরকে আবার ওটিপি এর স্ট্যাটাস চেক করতে হবে
    let result = await OTPModel.find({ email: email, otp: OTPCode, status: statusUpdate}).count();

    if(result===1){
        await UsersModel.updateOne({email:email}, {password:NewPass});
        res.status(200).json({status:"success", data:"Password reset successful"});
    }
    else{
        res.status(200).json({status:"Failed", data:"Invalid Verification"});
    }
}