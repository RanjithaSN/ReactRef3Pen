import { Messages, MessagesList } from './messages.selectors';

describe('Messages', () => {
  describe('Messages', () => {
    test('returns the Messages list in the data state', () => {
      const messages = [{
        Id: '1'
      }];
      expect(Messages.resultFunc({
        messages
      })).toEqual(messages);
    });

    test('returns an empty list when Messages is not present', () => {
      expect(Messages.resultFunc(undefined)).toEqual([]);
    });
  });

  describe('MessagesList', () => {
    test('returns an empty array when the message array is empty', () => {
      expect(MessagesList.resultFunc([])).toEqual([]);
    });
    test('returns formatted message data when the array is not empty', () => {
      const messages = [
        {
          Notification: {
            NotificationType: 'PORT_IN',
            Priority: 1,
            Message: 'Critical Message 1',
            Actions: [
              {
                Action: {
                  ActionLabel: 'TEST2',
                  ActionLink: 'www.test2.com'
                }
              }
            ],
            InAppNotificationId: '123',
            MessageContent: 'Critical Message 1'
          }
        }
      ];
      expect(MessagesList.resultFunc(messages)).toEqual([{
        id: messages[0].Notification.InAppNotificationId,
        ctaLabel: messages[0].Notification.Actions[0] ? messages[0].Notification.Actions[0].Action.ActionLabel : null,
        ctaLink: messages[0].Notification.Actions[0] ? messages[0].Notification.Actions[0].Action.ActionLink : null,
        ctaLabel1: messages[0].Notification.Actions[1] ? messages[0].Notification.Actions[1].Action.ActionLabel : null,
        ctaLink1: messages[0].Notification.Actions[1] ? messages[0].Notification.Actions[1].Action.ActionLink : null,
        description: messages[0].Notification.MessageContent,
        title: messages[0].Notification.NotificationType,
        priority: messages[0].Notification.Priority
      }]);
    });
  });
});
