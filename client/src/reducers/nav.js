import { SHOW_NAV, HIDE_NAV } from "../actions/types";

const initialState = {
  displayNav: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SHOW_NAV:
      return {
        displayNav: true,
      };

    case HIDE_NAV:
      return {
        displayNav: false,
      };
    default:
      return state;
  }
}
