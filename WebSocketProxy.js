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
        return originalSend(data);
      };

      const originalOnMessage = ws.onmessage;
      ws.onmessage = function (event) {
        console.log('Intercepted incoming message:', event.data);
        if (originalOnMessage) {
          return originalOnMessage(event);
        }
      };

      return ws;
    },
  });

  // Replace native WebSocket with the proxy
  window.WebSocket = WebSocketProxy;
})();
