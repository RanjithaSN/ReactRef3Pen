import AppConfig from 'AppConfig';

export const MESSAGE_PRIORITY = {
    CRITICAL: 1,
    OTHER: 2
};

export const IN_APP_NOTIFICATIONS_STATUS = {
    OPEN: 'Open',
    DISMISSED_BY_CUSTOMER: 'Dismissed by Customer',
    DISMISSED_BY_EVENT: 'Dismissed by Event'
};

export const InAppNotificationsUrl = () => AppConfig.IN_APP_NOTIFICATIONS_ENDPOINT;
export const DismissNotificationsUrl = () => AppConfig.DISMISS_NOTIFICATIONS_ENDPOINT;