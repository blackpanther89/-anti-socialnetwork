import React from 'react';
// import axios from './axios';

export default function ProfilePic (
  {firstName, lastName, showUploader, image = './default.png'},
) {
  return <img  className ='default' src={image} alt={`${firstName} ${lastName}`} onClick={showUploader} />;
}
