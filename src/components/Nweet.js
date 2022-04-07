import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) =>{
    const [editing, setEditing] = useState(false);
    const [newContent, setNewContent] = useState(nweetObj.contents);

    const onDeleteClick = async(event) =>{
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if(isConfirmed){
            if(nweetObj.attachmentUrl != ""){
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            }
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    }

    const onChange = (event) => {
        setNewContent(event.target.value);
    }

    const onSubmit = async(event) =>{
        event.preventDefault();
        await dbService.doc(`/nweets/${nweetObj.id}`).update({
            contents : newContent
        });
        setEditing(false);
    }

    const onEditClick = () =>{
        setEditing((prev) => !prev);
    }
    
    return (
        <div className="nweet">
        
        {editing ? <><form onSubmit={onSubmit} className="container nweetEdit">
                <input className="formInput" type="text" required placeholder="수정할 내용을 입력하세요." onChange={onChange} value={newContent}></input>
                <input className="formBtn" type="submit" value="업데이트" ></input>
            </form>
            <span onClick={onEditClick} className="formBtn cancelBtn">
              Cancel
            </span>
            </> :  
            <>
                <h4>{nweetObj.contents}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
            </> }
        {isOwner && editing === false ? (
        <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={onEditClick}>
                <FontAwesomeIcon icon={faPencilAlt} />
                </span>
            </div>) : null} 
    </div>);
}

export default Nweet;