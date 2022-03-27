import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [contents, setContents] = useState("");
    const [contentList, setContentList] = useState([]);
    
    const getContents = async() =>{
        const datas = await dbService.collection("nweets").get(); 
      
        datas.forEach((document) => {
            const newContents ={
                ...document.data(),
                id : document.id
            };
            setContentList((prev) => [newContents, ...prev]);
        });
        
    }

    useEffect(async() => {
        getContents();
    }, []);

    const onSubmit = async (event) => {
      
        event.preventDefault();
        await dbService.collection("nweets").add({
            contents : contents,
            createdAt : Date.now(),
        });
        setContents("");
    }
    const onChange = (event) => {
        const {target : {value}} = event;
        setContents(value);
    }

    console.log(contentList);

    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="지금 무슨 생각을 하고 계신가요?" maxLength="120" vlaue={contents} onChange={onChange}></input>
            <input type="submit" value="게시"></input>
        </form>
        <div>
            {contentList.map((content) =>(
                    <div key={content.id}>
                        <h4>{content.contents}</h4>
                    </div>
            ))}
        </div>
    </div>
}
export default Home;