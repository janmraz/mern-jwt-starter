/**
 * Created by janmraz on 26/03/2017.
 */
import React from 'react';
import 'react-dates/lib/css/_datepicker.css';

class Profile extends React.Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
        this.state = {
            name: '',
            email: '',
            work: '',
            education: ''
        }
    }
    handleChange(event,type) {
        switch (type){
            case 'name':
                this.setState({name: event.target.value});
                break;
            case 'email':
                this.setState({email: event.target.value});
                break;
            case 'work':
                this.setState({work: event.target.value});
                break;
            case 'education':
                this.setState({education: event.target.value});
                break;
            default:
                console.log('err');
        }

    }
    send(){
        this.props.update(this.state.name,this.state.email,this.state.work,this.state.education)
    }
    componentDidMount(){
        console.log('props',this.props);
        this.setState({
            name: this.props.name ? this.props.name : '',
            email: this.props.email ? this.props.email : '',
            work: this.props.work ? this.props.work : '',
            education: this.props.education ? this.props.education : ''
        });
    }
    render() {
        return (
            <div className="container well text-center">
                <h2>{this.props.header}</h2>
                <h4>Name:<input value={this.state.name} onChange={(event) => this.handleChange(event,'name')}/></h4>
                <h4>Email:<input value={this.state.email} onChange={(event) => this.handleChange(event,'email')}/></h4>
                <h4>Education:<input value={this.state.education} onChange={(event) =>this.handleChange(event,'education')}/></h4>
                <h4>Work:<input value={this.state.work} onChange={(event) => this.handleChange(event,'work')}/></h4>
                <br />
                <br />
                <button className="btn btn-success" onClick={this.send}>Edit User</button>
            </div>
        );
    }
}

export default Profile;