import React from 'react';
import axios from './axios';

export default function ProfilePic (
  {first, last, onClick, image = './default.png'},
) {
  return <img src={image} alt={`${first} ${last}`} onClick={onClick} />;
}
