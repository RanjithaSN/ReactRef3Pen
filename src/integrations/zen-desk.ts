import {
  SelectedSystemId
} from 'selfcare-core/src/redux//settings/settings.selectors';
import { CurrentSession } from 'selfcare-core/src/redux/session/session.selectors';
import { Subscriber } from 'selfcare-core/src/redux/subscriber/subscriber.selectors';
import AppConfig from 'AppConfig';
import { Store } from 'redux';

interface RetrieveAuthSubInfoResponse {
  id_token: string;
}


export const prefillZendesk = (store: Store) => {
  const subscriber = Subscriber(store.getState());
  if (subscriber) {
    //@ts-ignore
    window.zE('webWidget', 'prefill', {
      email: {
        value: subscriber.Email,
        readOnly: true
      },
      name: {
        value: `${subscriber.FirstName} ${subscriber.LastName}`,
        readOnly: true
      }
    });
  }
};

export const setupZenDesk = (store: Store) => {

  if (!window.zE) {

    window.zESettings = {
      webWidget: {
        authenticate: {
          chat: {
            jwtFn: async (callback) => {
              const subscriber = Subscriber(store.getState());
              if (subscriber) {
                const response = await fetch(`${AppConfig.TELE2_AUTH_URL}/retrieveAuthSubInfo`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${CurrentSession(store.getState())}`,
                    'CD-SubscriberId': subscriber.Id,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'CD-SystemId': SelectedSystemId()
                  }
                });
                const data = await response.json() as RetrieveAuthSubInfoResponse;
                callback(data.id_token);
              }
            }
          }
        }
      }
    };

    const head = document.getElementsByTagName('head')[0];
    const zenDeskScript = document.createElement('script');
    zenDeskScript.src = `https://static.zdassets.com/ekr/snippet.js?key=${AppConfig.ZEN_DESK_KEY}`;
    zenDeskScript.id = 'ze-snippet';
    head.appendChild(zenDeskScript);

    const styles = `
    #launcher {
      display: none;
    }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

  }
};