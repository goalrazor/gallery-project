import { CarouselState } from './types';
import { CarouselActionTypes, SET_ACTIVE_IMAGE_INDEX } from "./actions";

const initialState: CarouselState = {
  activeImageIndex: 0,
};

export default function carouselReducer(
  state = initialState,
  action: CarouselActionTypes
): CarouselState {
  switch(action.type) {
    case SET_ACTIVE_IMAGE_INDEX:
      return {
        ...state,
        activeImageIndex: action.payload,
      };
    default:
      return state;
  }
}