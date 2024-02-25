import { GalleryActionTypes } from "../../components/gallery/actions";
import thunk, { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, combineReducers, createStore, applyMiddleware, compose } from "redux";
import { galleryReducer } from "../../components/gallery/reducer";

const rootReducer = combineReducers({
  galleryReducer,
})


const composeEnhancers =
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);

type TAppActions = GalleryActionTypes;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = Promise<any> | void> = ActionCreator<ThunkAction<
  ReturnType,
  RootState,
  TAppActions,
  Action<string>>
>;
