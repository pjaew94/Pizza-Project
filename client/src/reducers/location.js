import { SET_LOCATION, REMOVE_LOCATION } from "../actions/types";

const initialState = {
    loading: true,
    location: {
      option: '',
        addressType: '',
        streetAddress: '',
        suiteApt: '',
        zipCode: ''
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOCATION:
      return {
          loading: false,
          location: payload
      };


      case REMOVE_LOCATION:
        return {
          ...state,
          location: {
            option: '',
          }
        }

    default:
      return state;
  }
}
