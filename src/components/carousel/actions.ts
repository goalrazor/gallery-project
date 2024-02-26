export const SET_ACTIVE_IMAGE_INDEX: 'SET_ACTIVE_IMAGE_INDEX' = 'SET_ACTIVE_IMAGE_INDEX'

interface SetActiveImageIndexAction {
  type: typeof SET_ACTIVE_IMAGE_INDEX,
  payload: number;
}

export type CarouselActionTypes = SetActiveImageIndexAction;

export const setActiveImageIndex = (index: number): CarouselActionTypes => {
  return {
    type: SET_ACTIVE_IMAGE_INDEX,
    payload: index
  };
};