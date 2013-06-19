# mode = 'flash'
mode = 'webrtc'

apiKey = "1127"


if mode is 'webrtc'
  TBWebrtc()
  sessionId = "1_MX4xMTI3fn5UdWUgSnVuIDE4IDIxOjMzOjUyIFBEVCAyMDEzfjAuNjkzNTY4MDV-"
  token = "T1==cGFydG5lcl9pZD0xMTI3JnNpZz1hYTMxMWQzYjhmYWM5MWZmNDk2ZDc5OWRmMmIzNmFiYmZlZmRjZmQwOnNlc3Npb25faWQ9MV9NWDR4TVRJM2ZuNVVkV1VnU25WdUlERTRJREl4T2pNek9qVXlJRkJFVkNBeU1ERXpmakF1Tmprek5UWTRNRFYtJmNyZWF0ZV90aW1lPTEzNzE2MTY0MzImbm9uY2U9NDU0ODg1JnJvbGU9cHVibGlzaGVy"
  
if mode is 'flash'
  TBFlash()
  sessionId = "2_MX4xMTI3fn5UdWUgSnVuIDE4IDIzOjI5OjM0IFBEVCAyMDEzfjAuMDMwOTQ0MTA5fg"
  token = "T1==cGFydG5lcl9pZD0xMTI3JnNpZz05NjA4NDU4YmVjNGQwZTdjMTdlNjkxY2JiZjU2NTFjM2M3Y2UxMjQwOnNlc3Npb25faWQ9Ml9NWDR4TVRJM2ZuNVVkV1VnU25WdUlERTRJREl6T2pJNU9qTTBJRkJFVkNBeU1ERXpmakF1TURNd09UUTBNVEE1ZmcmY3JlYXRlX3RpbWU9MTM3MTYyMzM3NSZub25jZT02MTU5MSZyb2xlPXB1Ymxpc2hlcg=="


session = TB.initSession(sessionId)

initSession = (apiKey, sessionId, token) ->
  TB.setLogLevel TB.DEBUG
  session.addEventListener "sessionConnected", sessionConnectedHandler
  session.addEventListener "streamCreated", streamCreatedHandler
  session.connect apiKey, token

sessionConnectedHandler = (event) ->
  publisher = TB.initPublisher(apiKey, "myPublisherDiv")
  session.publish publisher
  subscribeToStreams event.streams
  
streamCreatedHandler = (event) ->
  subscribeToStreams event.streams
  
subscribeToStreams = (streams) ->
  for s in streams
    return if s.connection.connectionId is session.connection.connectionId
    div = document.createElement "div"
    div.setAttribute "id", "stream#{s.streamId}"
    $('#streams').append div
    session.subscribe s, div.id
  
    
Meteor.startup ->
  initSession apiKey, sessionId, token
  