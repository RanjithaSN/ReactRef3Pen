import eventBus from './event.bus';

const eventName = 'test';
const eventData = 'testData';
let eventHandled = false;
let dataReceived = null;

describe('Event Bus', () => {
  describe('Given I have subscribed to an event', () => {
    function eventHandler(data) {
      eventHandled = true;
      dataReceived = data;
    }

    beforeEach(() => {
      eventBus.subscribe(eventName, eventHandler);
    });

    afterEach(() => {
      eventBus.unsubscribe(eventName, eventHandler);
      eventHandled = false;
      dataReceived = null;
    });

    test('Events without data are handled', () => {
      eventBus.publish(eventName);
      expect(eventHandled).toEqual(true);
    });

    test('Events with data are handled', () => {
      eventBus.publish(eventName, eventData);
      expect(dataReceived).toEqual(eventData);
    });

    test('Unsubscribing prevents the event from being handled', () => {
      eventBus.unsubscribe(eventName, eventHandler);
      eventBus.publish(eventName, eventData);
      expect(eventHandled).toEqual(false);
    });
  });
});
