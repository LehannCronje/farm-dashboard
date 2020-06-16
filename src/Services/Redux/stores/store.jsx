import { createStore, combineReducers } from "redux";
import signInReducer from "Services/Redux/reducers/SignIn";
import SaveFarmStateReducer from "Services/Redux/reducers/SaveFarmStateReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const allReducers = combineReducers({
  signInReducer,
  SaveFarmStateReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
