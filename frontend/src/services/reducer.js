import * as Actions from './action';

const initialState = {
    team_data: {},
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case Actions.SET_TEAM_DATA: {
        return {
          ...state,
          team_data: action.payload,
        }
      }

      default: {
        return state;
      }
    }
}

export default Reducer;