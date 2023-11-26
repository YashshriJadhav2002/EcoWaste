import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000"); // Change to your server URL

function MessageVendor()
{
    return (
        <div>
        <h1>Join A Chat</h1>
        <input type="text" placeholder='John...'></input>
        <input type="text" placeholder='John..'></input>
        </div>
    );
}

export default MessageVendor;