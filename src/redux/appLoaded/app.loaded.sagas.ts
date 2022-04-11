import {put, takeEvery, call} from 'redux-saga/effects';
import {UpdateCookieInfoFromLocalStorage} from '../site/site.actions';
import {AppLoadedActionType} from './app.loaded.actions';
import {checkLocalStorageForSession} from '../createSubscriber/create.subscriber.sagas';

function* appLoaded() {
    yield put(UpdateCookieInfoFromLocalStorage());
    yield call(checkLocalStorageForSession);
}

export default function* appLoadedWatcher() {
    yield takeEvery(AppLoadedActionType, appLoaded);
}
