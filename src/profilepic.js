import React from 'react';

export default function ProfilePic(
  {first, last, onClick, image = '/default.jpg'},
) {
  return <img src={image} alt={`${first} ${last}`} onClick={onClick} />;
}
