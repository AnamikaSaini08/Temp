import React from 'react'
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';


const Login = () => {
    const [emailId , setEmailId] = useState("");
    const [loginPassword , setLoginPassword] = useState("");
    const navigate = useNavigate();

    const GetData = async(e)=>{
        e.preventDefault();
        const res = await fetch(`/user/login?email=${emailId}&password=${loginPassword}`, {
            method: "GET",
            headers : {
                "Content-Type": "application/json"
            },
        });

        const resData = await res.json();
        console.log("Respose - ",resData);
        if(resData.status === 422 || !resData || !resData.success){
            alert("Invalid email or password");
            return;
        }
        else{
            alert("Login Successful");
            navigate('/home' , { state: { name: resData.name } });
        }
    }
  return (
    <div>
       <form method='GET'>
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
            <button type="submit" onClick={GetData}>Login</button>
            
     </form>
    </div>
  )
}

export default Login
