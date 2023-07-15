// ==UserScript==
// @name         WebSocketProxy
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  // Proxy object to intercept WebSocket connections
  const WebSocketProxy = new Proxy(window.WebSocket, {
    construct(target, args) {
      const ws = new target(...args);

      // Wrap WebSocket instance methods to intercept events and messages
      const originalSend = ws.send.bind(ws);
      ws.send = function (data) {
        console.log('Intercepted outgoing message:', data);
        if (originalSend) {
          return originalSend(data);
        }
      };

      const originalOnMessage = ws.onmessage;
      ws.onmessage = function (event) {
        console.log('Intercepted incoming message:', event.data);
        if (originalOnMessage) {
          return originalOnMessage(event);
        }
      };

      const originalClose = ws.close.bind(ws);
      ws.close = function () {
        console.log('Intercepted close event');
        if (originalClose) {
          return originalClose();
        }
      };

      const originalAddEventListener = ws.addEventListener.bind(ws);
      ws.addEventListener = function (eventName, listener, options) {
        console.log('Intercepted addEventListener:', eventName);
        if (originalAddEventListener) {
          return originalAddEventListener(eventName, listener, options);
        }
      };

      const originalRemoveEventListener = ws.removeEventListener.bind(ws);
      ws.removeEventListener = function (eventName, listener, options) {
        console.log('Intercepted removeEventListener:', eventName);
        if (originalRemoveEventListener) {
          return originalRemoveEventListener(eventName, listener, options);
        }
      };

      const originalOnOpen = ws.onopen;
      ws.onopen = function (event) {
        console.log('Intercepted open event');
        if (originalOnOpen) {
          return originalOnOpen(event);
        }
      };

      const originalOnClose = ws.onclose;
      ws.onclose = function (event) {
        console.log('Intercepted close event');
        if (originalOnClose) {
          return originalOnClose(event);
        }
      };

      return ws;
    },
  });

  // Replace native WebSocket with the proxy
  window.WebSocket = WebSocketProxy;
})();
