import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component  {
  constructor(props) {
        super(props);
        this.state = {};
        // this.uploadFile = this.uploadFile.bind(this);
    }
    render() {
      return (
          <div>
          <form
          <label htmlFor="file">Browse</label>
          <input type='file'id='file' onChange={e=>{
              const fd = new FormData
              fd.append('file', e.target.files[0])
              axios.post('/upload', fd)
         }}/>
         <button> Upload Picture </button>
         </form>
         </div>
     )
    }
    }