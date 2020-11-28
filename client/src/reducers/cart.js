import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_COUNT,
  DECREASE_COUNT,
  CLEAR_CART
} from "../actions/types";

const initialState = {
  cartItems: [],
  itemCount: 0,
  finalCost: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  function sum(array, key) {
    return array.reduce(function (a, b) {
      return a + b[key];
    }, 0);
  }

  switch (type) {
    case ADD_ITEM:
      state.cartItems.push(payload);
      return {
        ...state,
        itemCount: sum(state.cartItems, "counter"),
        finalCost: sum(state.cartItems, "totalCost").toFixed(2),
      };

    case REMOVE_ITEM:
      state.cartItems.splice(payload, 1);

      return {
        ...state,
        itemCount: sum(state.cartItems, "counter"),
        finalCost: sum(state.cartItems, "totalCost").toFixed(2),
      };

    case INCREASE_COUNT:
      if (state.cartItems[payload].counter < 10) {
        state.cartItems[payload].counter += 1;
        state.cartItems[payload].totalCost = state.cartItems[payload].currentCost * state.cartItems[payload].counter
      }
      return {
        ...state,
        itemCount: sum(state.cartItems, "counter"),
        finalCost: sum(state.cartItems, "totalCost").toFixed(2),
      };
    case DECREASE_COUNT:
      if (state.cartItems[payload].counter > 1) {
        state.cartItems[payload].counter -= 1;
        state.cartItems[payload].totalCost = state.cartItems[payload].currentCost * state.cartItems[payload].counter
      }
      return {
        ...state,
        itemCount: sum(state.cartItems, "counter"),
        finalCost: sum(state.cartItems, "totalCost").toFixed(2),
      };
      case CLEAR_CART:
        return {
          cartItems: [],
          itemCount: 0,
          finalCost: 0
        }
    default:
      return state;
  }
}
