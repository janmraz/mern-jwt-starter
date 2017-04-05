const React = require('react');
import FacebookLogin from 'react-facebook-login';
import { logInUser } from '../../actions/actions_user';
import { connect } from 'react-redux';

class Auth extends React.Component {
    constructor(){
        super();
        this.responseFacebook = this.responseFacebook.bind(this);
        console.log('init');
    }

    responseFacebook(response){
        console.log('fb login',response);
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
                    autoLoad={false}
                    scope="public_profile,email,user_about_me,user_birthday,user_education_history,user_hometown,user_location,user_photos,user_work_history"
                    fields="name,email,picture,age_range,first_name,last_name,gender,cover,link,locale,timezone,hometown,education,about,birthday,location,work,context,currency,languages,relationship_status"
                    callback={_this.responseFacebook} />
            </div>
        );
    }
}


export default connect()(Auth);
