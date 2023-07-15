// ==UserScript==
// @name         Socket.IO/WebSocket Proxy Logger
// @version      1.0
// @description  Proxy Socket.IO and WebSocket events and log messages to the console
// @match        https://example.com/a/b
// @grant        none
// ==/UserScript==

(function () {
  // Create a proxy for the WebSocket constructor
  const NativeWebSocket = WebSocket;
  window.WebSocket = function (url, protocols) {
    const socket = new NativeWebSocket(url, protocols);

    // Log WebSocket events
    const events = ['open', 'message', 'error', 'close'];
    for (const event of events) {
      socket.addEventListener(event, (e) => {
        console.log(`WebSocket Event [${event}]:`, e);
      });
    }

    // Proxy send method to log messages
    const nativeSend = socket.send;
    socket.send = function (data) {
      console.log('WebSocket Message:', data);
      nativeSend.call(socket, data);
    };

    return socket;
  };

  // Create a proxy for the Socket.IO constructor
  const NativeIO = window.io;
  window.io = function (url, options) {
    const socket = NativeIO(url, options);

    // Log Socket.IO events
    const events = ['connect', 'disconnect', 'error'];
    for (const event of events) {
      socket.on(event, (data) => {
        console.log(`Socket.IO Event [${event}]:`, data);
      });
    }

    // Proxy emit method to log messages
    const nativeEmit = socket.emit;
    socket.emit = function (event, data) {
      console.log('Socket.IO Message:', event, data);
      nativeEmit.call(socket, event, data);
    };

    return socket;
  };
})();
