# WebSocket Proxy Userscript

This userscript intercepts WebSocket connections and allows you to monitor and modify incoming and outgoing messages. It can be loaded via Tampermonkey or Greasemonkey.

## Usage

1. Install Tampermonkey or Greasemonkey browser extension.
2. Create a new userscript and paste the code from the WebSocketProxy.js file into the userscript editor.
3. Add the following line at the top of the userscript file:
```
// @match https://example.com/a/b
```
   *This line ensures that the userscript only runs when the URL matches "https://example.com/a/b". Modify the URL as needed to match your desired website.*
   
5. Save the userscript.
6. The userscript will be automatically applied when visiting the specified URL.

## Features

- Intercepts WebSocket connections.
- Logs outgoing messages to the console.
- Logs incoming messages to the console.
- Allows you to modify the intercepted messages.

## How it Works

The userscript uses a Proxy object to intercept the creation of WebSocket instances. It wraps the WebSocket instance methods to intercept events and messages. The intercepted messages are logged to the console, and you can modify the messages before sending them.

## Configuration

No further configuration is required for this userscript. It is designed to work automatically once installed and applied.

## Compatibility

This userscript is compatible with most modern browsers that support Tampermonkey or Greasemonkey extensions.

## Disclaimer

Please note that intercepting WebSocket connections and modifying messages can have security implications. Use this userscript responsibly and only on websites where you have the necessary permissions. The author of this userscript takes no responsibility for any misuse or damages caused by its usage.
