import React from 'react';
import './Profile.css';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Comments = ({ checkNewComments }) => {
    // console.log('checkNewComments:', checkNewComments);
    
  return (
    <>
      {checkNewComments.map((item, index) => (
        <div id={`comment_${item.id}`} style={{display:'flex'}} key={index}>
            {item.image ? (
                 <img
                   src={`https://soc-net.info/${item.image}`}
                   alt="Profile Preview"
                   style={{
                     marginLeft: '1px',
                     marginBottom: '6px',
                     maxWidth: '100%',
                     marginRight: '15px',
                     height: '45px',
                     width: '45px',
                     verticalAlign: 'middle',
                     borderRadius: '50%',
                   }}
                 />
               ) : (
                 <i id="profile10" className="dropbtn fa-solid fa-user"></i>
               )}

               <div>
                  <Link to={`/profile?username=${item.username}`}><span style={{fontWeight:'bold',color:'rgba(0,0,0,0.5)'}}>@{item.username}</span></Link> - <span style={{fontWeight:'500'}}>{item.content}</span>
                  <br/>
                  <span style={{color:'rgba(0,0,0,0.5)',fontWeight:'500',fontSize:'0.9em'}}>({item.formatted_time})</span>
               </div>
        </div>
      ))
    }
    </>
  );
};

export default Comments;
