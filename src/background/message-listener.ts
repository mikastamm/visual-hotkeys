// Set up an event listener for messages from the page
self.addEventListener('message', function(event) {
    // Get the message from the page
    const message = event.data;

    // Send a reply to the page
    event.ports[0].postMessage('hello from the service worker');
});