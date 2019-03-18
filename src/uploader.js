import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {};

    }
    render() {
        return (
            <div className="uploader-box">
                <form>
                    <label htmlFor="file">Upload</label>

                    <input type='file'id='file' onChange={e=>{
                        const fd = new FormData;
                        fd.append('file', e.target.files[0]);
                        axios.post('/upload', fd);
                    }}/>
                    <br/>
                    <br/>
                    <button className="upload"> Upload Picture </button>

                </form>
            </div>
        );
    }
}
