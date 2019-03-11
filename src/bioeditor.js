import React from 'react';
import axios from './axios';


export default class BioEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        BioEditorIsVisible: false
    }
    // this.showBioEditor=this.showBioEditor.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.updateBio=this.updateBio.bind(this)


    }
    handleChange(e) {
      this[e.target.name] = e.target.value;
    }
    // // showBioEditor(){
    // //     this.setState({ BioEditorIsVisible: true})
    //
    // }
    updateBio(text){
        console.log('IAM HERE');
        axios.post('/bio',{text:bio.state.bio}) .then(({data}) => {
           if (data.success) {
             location.replace('./app');
           } else {
             this.setState({
               error: true,
             });
           }
       }


    render() {
        return(

            <div className="bio">
            { this.props.bio}
            <p> Edit Bio </p>

    <textarea name="text" rows="4" cols="50" onChange={e => this.handleChange(e)}

    />     <button type="submit" onClick={this.updateBio}> Save </button>
          </div>




        )
    }


  }
