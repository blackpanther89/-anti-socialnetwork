import React from 'react';
import axios from './axios';


export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BioEditorIsVisible: false,
            new:""
        };
        this.showBioEditor=this.showBioEditor.bind(this);
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
    showBioEditor(){
        this.setState({ BioEditorIsVisible: true});

    }

    updateBio() {

        axios.post('/bio',{bio:this.state.new}).then(({data}) => {
            console.log('data', data);

            this.props.setBio(data);
            this.setState({BioEditorIsVisible:false});
        });
    }

    render() {
        console.log('this.props, props in bio editor eee', this.props);
        return(

            <div className="bio-box">

                {!this.props.bio &&  <button className="add-button"  onClick={this.showBioEditor}>  Add Bio </button> }
                {this.props.bio &&  <button   className="edit-button" onClick={this.showBioEditor}> Edit Bio </button> }
                <br/>
                <br/>
                <br/>

                {this.state.BioEditorIsVisible && (
                    <div>
                        <textarea name="text" rows="4" cols="50" onChange={this.handleChange}/>

                        <button className="save-button" onClick={this.updateBio}> Save </button>
                    </div>
                )}


            </div>
        );


    }
}
