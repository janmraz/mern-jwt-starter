import { combineReducers } from 'redux';

// reducers
import UserReducer from './reducer_user';
import AlertReducer from './reducer_alert';
import PeopleReducer from './reducer_people';
import DetailReducer from './reducer_detail';

const rootReducer = combineReducers({
  user: UserReducer,
  alerts: AlertReducer,
  people: PeopleReducer,
  detail: DetailReducer
});

export default rootReducer;