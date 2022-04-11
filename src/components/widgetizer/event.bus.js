/* eslint-disable @typescript-eslint/explicit-member-accessibility */
class EventBus {
  callbacks = {};

  subscribe(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(callback);
  }

  publish(event, data) {
    // return if the topic doesn't exist, or there are no listeners
    if (!this.callbacks[event] || this.callbacks[event].length < 1) {
      return;
    }

    // send the event to all listeners
    this.callbacks[event].forEach((callback) => {
      callback(data || {});
    });
  }

  unsubscribe(event, callback) {
    if (this.callbacks[event]) {
      for (let i = 0; i < this.callbacks[event].length; i += 1) {
        if (this.callbacks[event][i] === callback) {
          this.callbacks[event].splice(i, 1);
          break;
        }
      }
    }
  }
}

const Instance = new EventBus();
export default Instance;
