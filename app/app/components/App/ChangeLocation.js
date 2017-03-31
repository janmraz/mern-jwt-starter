/**
 * Created by janmraz on 26/03/2017.
 */
import React from 'react';


class Profile extends React.Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            location: ''
        }
    }
    handleChange(event) {
        this.setState({location: event.target.value});
    }
    render() {
        return (
                <div className="container well text-center">
                    <h4>{this.props.header}</h4>
                    <h2><input value={this.state.location} onChange={this.handleChange}/></h2>
                    <button className="btn btn-success" onClick={() => this.props.changeLocation(this.state.location)}>Change Location</button>
                </div>
        );
    }
}

export default Profile;