var title = 'You have a message.';  
var body = 'WARNING in bundle.js from UglifyJs. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
var icon = '/img/icon-192x192.png';  
var tag = 'sbz_notification';
var accountId = -1;
 
function getEndpoint() {
    return self.registration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription.endpoint;
            }
            throw new Error('User not subscribed');
        });
}
 
function showNotification(title, body, icon, tag, link) {
    var options = {
        body: body,
        icon: icon,
        tag: tag,
        requireInteraction: true,
        data: {link: link}
    };
    return self.registration.showNotification(title, options);
}
 
self.addEventListener('push', function(event) {
    console.log('Notification');
    event.waitUntil(
        showNotification(title, body, icon, tag + accountId, 'https://subiz.com')
    );
});
self.addEventListener('notificationclick', function(event) {
    console.log('On notification click');
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}) //eslint-disable-line
            .then(function(clientList){
                for (var i = clientList.length - 1; i >= 0; i--) {
                    var client = clientList[i];
                    if(client.url == '/' && 'focus' in client){
                        return client.focus();
                    }
                }
                if(clients.openWindow){ //eslint-disable-line
                    clients.openWindow(event.notification.data.link); //eslint-disable-line
                }
            })
    );
});