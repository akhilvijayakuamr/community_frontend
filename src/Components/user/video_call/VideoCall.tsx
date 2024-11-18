import {useEffect, useRef} from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { UserHeader } from '../home/UserHeader';
import { useLocation, useNavigate } from 'react-router-dom';
export const zego_appID = +import.meta.env.VITE_ZEGO_APPID
export const zego_serverSecret = import.meta.env.VITE_ZEGO_SECRET
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL
export const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL


// Create random id

function randomID(len:any) {
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

  const socketRef = useRef<WebSocket>()
  const location = useLocation();
  const data = location.state || {};
  const { id, fullName, userId } = data;
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const navigate = useNavigate()
  

  // Zegocloud config
  

  let myMeeting = async (element:any) => {
    const appID = zego_appID;
    const serverSecret = zego_serverSecret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      onLeaveRoom: () => {
        if (socketRef.current) {
          socketRef.current.close();
          socketRef.current = undefined;
        }
        navigate('/chat_list');
      },
    });


  };



  useEffect(() => {

    const URL = `${FRONTEND_URL}/video_call`+'?roomID=' +roomID

    const initializeWebSocket = () => {
      if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
        socketRef.current = new WebSocket(`${WEBSOCKET_URL}/ws/video_call/?call_user=${String(id)}&user=${userId}`);


        socketRef.current.onopen = () => {
          const data = {
            message: `${URL}`,
            full_name:fullName
           };
           
          if (socketRef.current !== null) {
            socketRef.current?.send(JSON.stringify(data));
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
