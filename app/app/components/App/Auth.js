const React = require('react');
import FacebookLogin from 'react-facebook-login';
import { logInUser } from '../../actions/actions_user';
import { connect } from 'react-redux';

class Auth extends React.Component {
    constructor(){
        super();
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    responseFacebook(response){
        console.log(response);
        this.props.dispatch(logInUser(response)).then(function () {
            location.reload();
        });
    }

    render(){
        let _this = this;
        return (
            <div className="container text-center">
                <h1>Login</h1>
                <FacebookLogin
                    appId="1851001551787668"
                    autoLoad={true}
                    scope="public_profile, email, user_birthday"
                    fields="name,email,picture"
                    callback={_this.responseFacebook} />
            </div>
        );
    }
}


export default connect()(Auth);
