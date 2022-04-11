import AppConfig from 'AppConfig';

export const NODE_ACTION_TYPE = {
    NODE: 'NODE',
    CHAT: 'CHAT',
    LAST: 'LAST',
    URL: 'URL'
};

export const TROUBLESHOOTER = {
    DISPUTE: 'dispute',
    REQUEST_MY_DATA: 'request_data',
    RIGHT_TO_BE_FORGOTTEN: 'right_to_be_forgotten'
};

export const TROUBLESHOOTER_API = AppConfig.TROUBLESHOOTER_ENDPOINT;
