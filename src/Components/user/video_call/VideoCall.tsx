import React,{useEffect, useRef, useState} from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { UserHeader } from '../home/UserHeader';
import { useLocation } from 'react-router-dom';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCall() {

  const socketRef = useRef()
  const location = useLocation();
  const data = location.state || {};
  const { id, fullName, userId } = data;
  const roomID = getUrlParams().get('roomID') || randomID(5);

  let myMeeting = async (element) => {
    const appID = 1777095127;
    const serverSecret = "c91dc94f7e53ae03356fef076997140f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            'http://localhost:5173/video_call' +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });


  };



  useEffect(() => {

    const URL = 'http://localhost:5173/video_call'+'?roomID=' +roomID

    const initializeWebSocket = () => {
      if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
        socketRef.current = new WebSocket(`ws://localhost:8000/ws/video_call/?call_user=${String(id)}&user=${userId}`);


        socketRef.current.onopen = () => {
          console.log("WebSocket connected");
          const data = {
            message: `${URL}`,
            full_name:fullName
           };
           
          if (socketRef.current !== null) {
            socketRef.current.send(JSON.stringify(data));
          } else {
            console.error("Socket is null. Cannot send data.");
          }
        };
        socketRef.current.onerror = (error) => {
          console.log("websocket error:", error)
        }

        socketRef.current.onclose = (event) => {
          console.log("websocket connection closed: ", event)
          setTimeout(initializeWebSocket, 5000)
        }

      }


    }


    initializeWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    }

  }, [userId, id]);

  return (
    <div>
      <UserHeader />
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: '100vw', height: '100vh' }}
      ></div>
    </div>

  );
}
