import {ADD_SINGLE_RECORD, UPDATE_SINGLE_RECORD, DELETE_SINGLE_RECORD} from "../actions/location";

const INITIAL_STATE ={
    locations: []
  };

export default function locationData(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_SINGLE_RECORD: 
            return Object.assign({}, state, {
                locations: state.locations.concat(action.details.data)
              });

        case UPDATE_SINGLE_RECORD: 
            return {
                ...state, locations : state.locations.map(val => { 
                    if(val.id == action.details.data.id){
                        return action.details.data
                    }
                    else{
                        return val
                    }
                })
            }
        
        case DELETE_SINGLE_RECORD:
            return {
                ...state, locations : state.locations.filter(val => { 
                    if(val.id != action.details.id){
                        return val
                    }
                })
            } 
            
        default:            
            return state

    }
}