import React from 'react';
import axios from './axios';


export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BioEditorIsVisible: false,
            new:""
        };
        // this.showBioEditor=this.showBioEditor.bind(this);
        
        this.handleChange= this.handleChange.bind(this);
        this.updateBio= this.updateBio.bind(this);
    }

    handleChange(e) {
        this.setState (
            {
                new : e.target.value
            }
        );
    }

    updateBio() {
        console.log('this.state.new',this.state.new);
        axios.post('/bio',{bio:this.state.new}).then(({data}) => {
            console.log('data', data);
            console.log('this.props updateBio', this.props );
            this.props.setBio(data.data.bio);
        });
    }

    render() {
        return(

            <div className="bio">
                {this.state.updateBio && <BioEditor bio={this.state.bio}/>}

                <p> Edit Bio </p>

                <textarea name="text" rows="4" cols="50" onChange={this.handleChange}/>
                <button onClick={this.updateBio}> Save </button>
            </div>

        );
    }
}



// if (data.success) {
//     location.replace('./app');
// } else {
//     this.setState({
//         error: true,
//     });
// }
