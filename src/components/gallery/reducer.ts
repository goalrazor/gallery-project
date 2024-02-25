import { GalleryState } from "./types";
import { GalleryActionTypes, LOAD_GALLERY_FAILED, LOAD_GALLERY_START, LOAD_GALLERY_SUCCESS } from "./actions";

const initialState: GalleryState = {
  images: [],
  page: 0,
  moreAvailable: true
};

export const galleryReducer = (state = initialState, action: GalleryActionTypes): GalleryState => {
  switch (action.type) {
    case LOAD_GALLERY_START:
      return {
        ...state,
        page: state.page + 1
      };
    case LOAD_GALLERY_SUCCESS:
      return {
        ...state,
        images: [...state.images, ...action.payload],
        moreAvailable: action.payload.length > 0
      };
    case LOAD_GALLERY_FAILED:
      return {
        ...state,
        images: [],
        moreAvailable: false,
      };
    default:
      return state;
  }
};
