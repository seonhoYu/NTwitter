import { firebaseInstance, authService } from "fbase";
import React, { useState } from "react";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) =>{
        const {target : {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }
        else if(name === "password") {
            setPassword(value);
        }
    }

    const toggleAccount = ()=>{
        setNewAccount((prev) => !prev);
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

    const onSocialClick =async(event) =>{
        const {target : {name}} = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (<div>
    <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required onChange={onChange}></input>
        <input name="password" type="Password" placeholder="password" required onChange={onChange}></input>
        
        <input type="submit" value={newAccount ? "Crete Account" : "Login"} ></input>
        <span>{error}</span>
    </form>
    <span onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>
    <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
    </div>
</div>)
}
export default Auth;