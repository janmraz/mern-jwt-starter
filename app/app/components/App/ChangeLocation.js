/**
 * Created by janmraz on 26/03/2017.
 */
import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';


class Profile extends React.Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.state = {
            location: '',
            startDate: new moment(),
            endDate: new moment(),
            focusedInput: null
        }
    }
    handleChange(event) {
        this.setState({location: event.target.value});
    }
    onDatesChange({ startDate, endDate }) {
        this.setState({startDate, endDate});
    }
    componentDidMount(){
        console.log(this.props.location);
        this.setState({
            startDate: moment.unix(this.props.startDate),
            endDate: moment.unix(this.props.endDate),
            location: this.props.location
        });
    }
    render() {
        return (
                <div className="container well text-center">
                    <h4>{this.props.header}</h4>
                    <h2><input value={this.state.location} onChange={this.handleChange}/></h2>
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

export default Profile;