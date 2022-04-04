import { authService } from "fbase";
import React, { useState } from "react";


const AuthForm = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const toggleAccount = ()=>{
        setNewAccount((prev) => !prev);
    }

    const onChange = (event) =>{
        const {target : {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }
        else if(name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) =>{
        event.preventDefault();
        let data;
        try{
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                data = await authService.signInWithEmailAndPassword(email, password); 
            }
            console.log(data);
        }
        catch(err){
            setError(err.message);
        }
    }

    return  <>
    <form className="container" onSubmit={onSubmit}>
        <input className="authInput" name="email" type="email" placeholder="Email" required onChange={onChange}></input>
        <input className="authInput" name="password" type="Password" placeholder="password" required onChange={onChange}></input>
        
        <input className="authInput authSubmit" type="submit" value={newAccount ? "Crete Account" : "Login"} ></input>
        {error && <span className="authError">{error}</span>}
    </form>
    <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
}
export default AuthForm;