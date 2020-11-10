import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/index';
// import { saveState, loadState } from '../localStorage'


const store = createStore(rootReducer,  applyMiddleware(thunk))

store.subscribe(() => {
  store.getState()
})

export default store;