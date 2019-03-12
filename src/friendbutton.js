import React from 'react';
import axios from './axios';
export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){
        console.log('handle click running');
        this.state({
            
        });
    }
}
