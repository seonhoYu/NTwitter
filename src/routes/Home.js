import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    const [contentList, setContentList] = useState([]);

    useEffect(async() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id : doc.id,
                ...doc.data(),
            }));
            setContentList(nweetArray);
        });
    }, []);

    return <div>
        <div className="container">
            <NweetFactory userObj={userObj}></NweetFactory>
            <div style={{ marginTop: 30 }}>
            {contentList.map((content) =>(
                <Nweet key={content.id} nweetObj={content} isOwner={userObj.uid == content.creatorId}></Nweet>
            ))}
            </div>
        </div>
    </div>
}
export default Home;