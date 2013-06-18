// Initialize API key, session, and token...
// Think of a session as a room, and a token as the key to get in to the room
// Sessions and tokens are generated on your server and passed down to the client
var apiKey = "1127";
var sessionId = "1_MX4xMTI3fn5UdWUgSnVuIDE4IDE0OjQyOjA5IFBEVCAyMDEzfjAuMjk3MDcwOTh-";
var token = "T1==cGFydG5lcl9pZD0xMTI3JnNpZz1lZTU4MzQ4MDI0YWQxMThhZDg0MzVkNDM2NTQ2NWQ3YmY4ZmYxZjE5OnNlc3Npb25faWQ9MV9NWDR4TVRJM2ZuNVVkV1VnU25WdUlERTRJREUwT2pReU9qQTVJRkJFVkNBeU1ERXpmakF1TWprM01EY3dPVGgtJmNyZWF0ZV90aW1lPTEzNzE1OTE3Mjkmbm9uY2U9MTczOTA0JnJvbGU9cHVibGlzaGVy";  
var session = TB.initSession(sessionId);  

  var initSession = function(apiKey, sessionId, token) {
    // Enable console logs for debugging
    TB.setLogLevel(TB.DEBUG);

    // Initialize session, set up event listeners, and connect
    session.addEventListener('sessionConnected', sessionConnectedHandler);
    session.addEventListener('streamCreated', streamCreatedHandler);
    session.connect(apiKey, token);     
  }

  function sessionConnectedHandler(event) {
    var publisher = TB.initPublisher(apiKey, 'myPublisherDiv');
    session.publish(publisher);

    // Subscribe to streams that were in the session when we connected
    subscribeToStreams(event.streams);
  }

  function streamCreatedHandler(event) {
    // Subscribe to any new streams that are created
    subscribeToStreams(event.streams);
  }

  function subscribeToStreams(streams) {
    for (var i = 0; i < streams.length; i++) {
      // Make sure we don't subscribe to ourself
      if (streams[i].connection.connectionId == session.connection.connectionId) {
        return;
      }

      // Create the div to put the subscriber element in to
      var div = document.createElement('div');
      div.setAttribute('id', 'stream' + streams[i].streamId);
      $("#streams").append(div);

      // Subscribe to the stream
      session.subscribe(streams[i], div.id);
    }
  }

  Meteor.startup(function(){
    initSession(apiKey, sessionId, token);   
  });
