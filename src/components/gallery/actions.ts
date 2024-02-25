import { Image, RawImage } from "./types";
import { AppThunk } from "../../services/store/store";
import { Dispatch } from "react";
import fetchCats from "../../api/fetchCats";

export const LOAD_GALLERY_START: 'LOAD_GALLERY_START' = 'LOAD_GALLERY_START'
export const LOAD_GALLERY_SUCCESS: 'LOAD_GALLERY_SUCCESS' = 'LOAD_GALLERY_SUCCESS'
export const LOAD_GALLERY_FAILED: 'LOAD_GALLERY_FAILED' = 'LOAD_GALLERY_FAILED'
interface LoadSuccessAction {
  readonly type: typeof LOAD_GALLERY_SUCCESS;
  payload: Image[];
}

interface LoadStartAction {
  readonly type: typeof LOAD_GALLERY_START;
}
interface LoadFailedAction {
  readonly type: typeof LOAD_GALLERY_FAILED;
}

export type GalleryActionTypes = LoadStartAction | LoadSuccessAction | LoadFailedAction;

export const getImages: AppThunk = () => async (dispatch: Dispatch<GalleryActionTypes>) => {
  dispatch({
    type: LOAD_GALLERY_START,
  });

  return fetchCats.getCats()
    .then(res => {
      if (res) {
        console.log("res", res)
        const data = res.map((item: RawImage) => ({id: item.id, url: item.url}))
        dispatch({
          type: LOAD_GALLERY_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: LOAD_GALLERY_FAILED
        })
      }
      return res;
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: LOAD_GALLERY_FAILED
      })
    })
};
