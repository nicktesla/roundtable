// Initialize API key, session, and token...
var apiKey = "1127";
var sessionId = "1_MX4xMTI3fn5XZWQgSnVuIDE5IDE0OjQ4OjQ4IFBEVCAyMDEzfjAuMjE2MDAyODJ-";
var token = "T1==cGFydG5lcl9pZD0xMTI3JnNpZz1jZTQ0MGY0MTZmZDhhYWY1YjEyNWM3YjY0ZDNhZGZjMzg1ODQxZTJhOnNlc3Npb25faWQ9MV9NWDR4TVRJM2ZuNVhaV1FnU25WdUlERTVJREUwT2pRNE9qUTRJRkJFVkNBeU1ERXpmakF1TWpFMk1EQXlPREotJmNyZWF0ZV90aW1lPTEzNzE2Nzg1Mjgmbm9uY2U9OTU0Njc1JnJvbGU9cHVibGlzaGVy";
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
    Deps.autorun(function(){
      if(Session.equals('canPublish', true)) {
        var publisher = TB.initPublisher(apiKey, 'myPublisherDiv');
        session.publish(publisher);
      }
    });
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
    Session.set('canPublish', false);
    initSession(apiKey, sessionId, token);   
  });
