import React, { useState } from 'react';
import {Link} from 'react-router-dom';


const Register = () => {
    const [emailId , setEmailId] = useState("");
    const [loginPassword , setLoginPassword] = useState("");
    const [username , setUsername] = useState("");
    const [confirmLoginPassword , setConfirmLoginPassword] =  useState("");

    //const history = useHistory();

    const PostData = async(e)=>{
        e.preventDefault();
        const res = await fetch('/user/register' , {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            //Note -> frontened se bhejte time backened me jis naam se access/destructure kiye h use naam se yha bhejege
            body: JSON.stringify({
                username,
                email:emailId,
                password: loginPassword,
                confirmPassword: confirmLoginPassword
            })
        });
        
        const resData = await res.json();
        console.log("Response - ",resData);
        
        if(!resData || resData.success === false){
            alert("Invalid email or password");
            return;
        }
        else{
            alert("Register Successful");
        }
        
    }
  return (
    <div>
       <form method="POST">
       <div>
            <label htmlFor="username">Username:</label> 
              <input 
                value={username}
                id="username"
                onChange={(e)=>setUsername(e.target.value)}
              />
        </div>
        <div>
            <label htmlFor="email">Email:</label> 
              <input 
                value={emailId}
                id="email"
                onChange={(e)=>setEmailId(e.target.value)}
              />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input 
              value={loginPassword}
              id="password"
              onChange={(e)=>setLoginPassword(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="confirmPass">Confirm_Password:</label>
            <input 
              value={confirmLoginPassword}
              id="confirmPass"
              onChange={(e)=>setConfirmLoginPassword(e.target.value)}
            />
        </div>
        <Link to='/home'>
        <button type="submit" onClick={PostData}>Register</button>
        </Link>
     </form>
    </div>
  )
}

export default Register
