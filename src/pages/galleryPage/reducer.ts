import { GalleryState } from "./types";
import { GalleryActionTypes, LOAD_GALLERY_FAILED, LOAD_GALLERY_START, LOAD_GALLERY_SUCCESS } from "./actions";

const initialState: GalleryState = {
  images: [],
};

export const galleryReducer = (state = initialState, action: GalleryActionTypes): GalleryState => {
  switch (action.type) {
    case LOAD_GALLERY_START:
      return {
        ...state,
      };
    case LOAD_GALLERY_SUCCESS:

      return {
        ...state,
        images: [...state.images, ...action.payload],
      };
    case LOAD_GALLERY_FAILED:
      return {
        ...state,
        images: [],
      };
    default:
      return state;
  }
};
