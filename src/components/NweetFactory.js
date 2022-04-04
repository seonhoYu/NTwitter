import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) =>{
    const [contents, setContents] = useState("");
    const [selectedImg, setSelectedImg] = useState("");

    const onSubmit = async (event) => {

      if(contents === ""){
        return;
      }

        event.preventDefault();
        let attachmentUrl = "";

        if(selectedImg != ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuid()}`);
            const response = await attachmentRef.putString(selectedImg, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweet ={
            contents : contents,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl : attachmentUrl
        };

        await dbService.collection("nweets").add(nweet);
        setContents("");
        setSelectedImg("");
    }
    const onChange = (event) => {
        const {target : {value}} = event;
        setContents(value);
    }

    const onFileChange = (event) =>{
        const {target : {files},
        } = event;
        
        const theFile = files[0];
        console.log(theFile);
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            setSelectedImg(finishedEvent.currentTarget.result);
        }
        reader.readAsDataURL(theFile);
    }

    const clearPhoto = () => setSelectedImg("");

    return <form onSubmit={onSubmit} className="factoryForm">
          <div className="factoryInput__container">
            <input
            className="factoryInput__input"
            value={contents}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            />
            <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label for="attach-file" className="factoryInput__label">
            <span>Add photos</span>
            <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
            id="attach-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{
            opacity: 0,
            }}
        />
        {selectedImg && (
        <div className="factoryForm__attachment">
          <img
            src={selectedImg}
            style={{
              backgroundImage: selectedImg,
            }}
          />
          <div className="factoryForm__clear" onClick={clearPhoto}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>

}

export default NweetFactory;