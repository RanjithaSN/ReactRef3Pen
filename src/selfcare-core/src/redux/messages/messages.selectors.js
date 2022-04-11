import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['messages'], subscriberApi);
});

const MessagesData = createSelector([
  Base
], (base) => pathOr(EMPTY_OBJECT, ['data'], base));

export const Messages = createSelector([
  MessagesData
], (data) => pathOr(EMPTY_ARRAY, ['messages'], data));

export const MessagesList = createSelector([
  Messages
], (messages) => {
  return messages.map((message) => {
    return {
      id: message.Notification.InAppNotificationId,
      ctaLabel: message.Notification.Actions[0] ? message.Notification.Actions[0].Action.ActionLabel : null,
      ctaLink: message.Notification.Actions[0] ? message.Notification.Actions[0].Action.ActionLink : null,
      ctaLabel1: message.Notification.Actions[1] ? message.Notification.Actions[1].Action.ActionLabel : null,
      ctaLink1: message.Notification.Actions[1] ? message.Notification.Actions[1].Action.ActionLink : null,
      description: message.Notification.MessageContent,
      title: message.Notification.NotificationType,
      priority: message.Notification.Priority
    };
  });
});
