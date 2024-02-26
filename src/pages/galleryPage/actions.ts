import { Image, RawImage } from "./types";
import { AppThunk, RootState } from "../../services/store/store";
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

async function retrieveImages(count: number = 1, dispatch: Dispatch<GalleryActionTypes>, getState: () => RootState): Promise<any> {
  return fetchCats.getCats(count)
    .then(res => {
      if (res) {
        const data = res.map((item: RawImage) => {
          const { galleryReducer } = getState();
          if (galleryReducer.images.find(image => (image.id === item.id))) {
            return null;
          }
          return ({ id: item.id, url: item.url });
        }).filter(Boolean);

        if (data.length === 0) {
          return retrieveImages(count, dispatch, getState);
        } else {
          dispatch({
            type: LOAD_GALLERY_SUCCESS,
            payload: data
          });
          return res;
        }
      } else {
        dispatch({
          type: LOAD_GALLERY_FAILED
        })
        return [];
      }
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: LOAD_GALLERY_FAILED
      })
    })
}

export const getImages: AppThunk = (count: number = 1) =>
  async (dispatch: Dispatch<GalleryActionTypes>, getState: () => RootState) => {
    dispatch({
      type: LOAD_GALLERY_START,
    });

    return retrieveImages(count, dispatch, getState);
  };
