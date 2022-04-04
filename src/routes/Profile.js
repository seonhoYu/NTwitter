import { authService, dbService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";


export default ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogoutClick = () =>{
        authService.signOut();
        history.push("/");
        refreshUser();
    }

    const getMyNweets =async() =>{
        const nweets = dbService
                        .collection("nweets")
                        .where("creatorId", "==", `${userObj.uid}`)
                        .orderBy("createdAt")
                        .get();

        console.log((await nweets).docs.map(doc => doc.data()));
    }

    const onChange = (event) =>{
        setNewDisplayName(event.target.value);
    }

    const onSubmit = async(event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName : newDisplayName
            });
            refreshUser();
        }
    }

    useEffect(() =>{
        getMyNweets();
    },[])

    return  <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplayName} className="formInput"></input>
            <input
          type="submit"
          value="프로필 업데이트"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
        </form>
        <button className="formBtn cancelBtn logOut"  onClick={onLogoutClick}>로그아웃</button>
    </div>
}