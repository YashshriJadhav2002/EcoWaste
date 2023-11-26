// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000"); // Change to your server URL

function App() {
  const [yourID, setYourID] = useState('987654');
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [otherUser, setOtherUser] = useState({});
  const userVideo = useRef();
  const partnerVideo = useRef();
  const myPeer = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        userVideo.current.srcObject = currentStream;
      });

    socket.on('yourID', (id) => {
      setYourID(id);
    });

    socket.on('callIncoming', ({ signalData, from }) => {
      setCallAccepted(true);
      setOtherUser({ id: from });
      myPeer.current = createPeer();
      myPeer.current.on('signal', (data) => {
        socket.emit('answerCall', { signalData: data, to: from });
      });
      myPeer.current.signal(signalData);
    });

    socket.on('callAnswered', ({ signalData, from }) => {
      setCallAccepted(true);
      setOtherUser({ id: from });
      myPeer.current.signal(signalData);
    });

  }, []);

  function createPeer() {
    const peer = new window.RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'fGV/QqxCvRTeeG5f',
          username: 'e9c1ef0d853c0ce128746c48',
        },
      ],
    });

    
      peer.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('callUser', { userToCall: otherUser.id, signalData: event.candidate, from: yourID });
        }
      };
    
      peer.ontrack = (event) => {
        partnerVideo.current.srcObject = event.streams[0];
      };
    
      // Handle the signaling data received from the other user
      socket.on('signalFromOtherUser', (signalData) => {
        // Apply the signal data to your RTCPeerConnection
        peer.signal(signalData);
      });
    
      stream.getTracks().forEach((track) => {
        peer.addTrack(track, stream);
      });
    
      return peer;
    }
    

  function callUser(id) {
    myPeer.current = createPeer();
    socket.emit('callUser', { userToCall: id, from: yourID });

  }

  function answerCall() {
    setCallAccepted(true);
    const peer = createPeer();
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signalData: data, to: otherUser.id });
    });
    peer.signal(otherUser.signalData);
  }

  function leaveCall() {
    setCallEnded(true);
    myPeer.current.destroy();
  }

  return (
    <div>
      <div>
        <video playsInline muted ref={userVideo} autoPlay style={{ width: '300px' }} />
        <video playsInline ref={partnerVideo} autoPlay style={{ width: '300px' }} />
      </div>
      <div>
        <h3>Your ID: {yourID}</h3>
        <h3>Other User's ID: {otherUser.id}</h3>

        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>End Call</button>
        ) : (
          <div>
            <input placeholder="Enter ID to call" value={otherUser.id} onChange={(e) => setOtherUser({ id: e.target.value })} />
            <button onClick={() => callUser(otherUser.id)}>Call</button>
          </div>
        )}

        {callAccepted && !callEnded && (
          <button onClick={answerCall}>Answer Call</button>
        )}
      </div>
    </div>
  );
}

export default App;
