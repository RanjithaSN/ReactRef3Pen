import {ProspectIsAvailable} from '../orderFlow/subscriberInformation/subscriber.information.selectors';
import {RetrieveUserAccountInformation} from '../account/account.actions';
import {LocalStorageChecked} from './create.subscriber.actions';
import {put, select, call, spawn, delay} from 'redux-saga/effects';
import {SESSION_ID_HEADER, SUBSCRIBER_CURRENT_COUNTRY} from 'selfcare-core/src/redux/utils/api.constants';
import * as LocalStorageHelper from 'selfcare-core/src/helpers/storage/local.storage';


function* createSubscriberFromSessionId(action: {sessionId: string, country: string}) {
        yield put({
            type: "CREATE_SUBSCRIBER_SESSION.SUCCESS",
            payload: {
                SessionId: action.sessionId,
                Country: action.country
                // We also might need to add SessionSummary or PasswordTemporary for the isPasswordTemporary field in store, see session.reducer.js
            }
        });

        const isProspectCustomer = yield select(ProspectIsAvailable);

        if (!isProspectCustomer) {
            yield call(RetrieveUserAccountInformation)
        }

        // yield spawn(getLivePersonEngagements);
}

export function* checkLocalStorageForSession() {
    const sessionId = LocalStorageHelper.read(SESSION_ID_HEADER);
    const country = LocalStorageHelper.read(SUBSCRIBER_CURRENT_COUNTRY);
    if (sessionId && sessionId !== 'undefined') {
        yield call(createSubscriberFromSessionId, {
            sessionId,
            country
        });
    }
    yield put(LocalStorageChecked());
}
