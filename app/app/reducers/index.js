import { combineReducers } from 'redux';

// reducers
import UserReducer from './reducer_user';
import AlertReducer from './reducer_alert';
import PeopleReducer from './reducer_people';
import DetailReducer from './reducer_detail';
import MessagesReducer from './reducer_messages';
import PeersReducer from './reducer_peers';

const rootReducer = combineReducers({
  user: UserReducer,
  alerts: AlertReducer,
  people: PeopleReducer,
  detail: DetailReducer,
  messages: MessagesReducer,
  peers: PeersReducer
});

export default rootReducer;
