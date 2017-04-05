/**
 * Created by janmraz on 26/03/2017.
 */
import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Autocomplete from 'react-google-autocomplete';
import { addAlert } from '../../actions/actions_alert';
import { connect } from 'react-redux';
import moment from 'moment';


class Profile extends React.Component {
    constructor(){
        super();
        this.chosenPlace = this.chosenPlace.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.state = {
            location: '',
            startDate: new moment(),
            endDate: new moment(),
            focusedInput: null
        }
    }
    chosenPlace(place) {
        console.log(place.name);
        this.setState({location: place.name});
    }
    onDatesChange({ startDate, endDate }) {
        this.setState({startDate, endDate});
    }
    componentDidMount(){
        console.log(this.props);
        let startDate = this.props.startDate ? moment.unix(this.props.startDate) : new moment();
        let endDate = this.props.endDate ? moment.unix(this.props.endDate) : new moment();
        let location = this.props.location ? this.props.location : '';
        this.setState({
            startDate,
            endDate,
            location
        });
    }
    render() {
        return (
                <div className="container well text-center">
                    <h4>{this.props.header}</h4>
                    <Autocomplete
                        style={{width: '60%',height: '50px',fontSize: 'large'}}
                        onPlaceSelected={this.chosenPlace}
                        types={['establishment']}
                    />
                    <br />
                    <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        onDatesChange={this.onDatesChange}// PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    />
                    <br />
                    <br />
                    <button className="btn btn-success" onClick={() => this.props.changeLocation(this.state.location,this.state.startDate.unix(),this.state.endDate.unix())}>Change Location</button>
                </div>
        );
    }
}

export default connect()(Profile);