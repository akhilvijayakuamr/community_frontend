// import React, { useEffect, useRef, useState } from "react";
// import { UserHeader } from "../home/UserHeader";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
// import { WEBSOCKET_URL } from "./VideoCall";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const WebRTC = () => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
//   const socketRef = useRef<WebSocket | null>(null);
//   const [mikeMute, setMikeMute] = useState<boolean>(false);
//   const [videoMute, setVideoMute] = useState<boolean>(false);
//   const localStreamRef = useRef<MediaStream | null>(null);
//   const location = useLocation();
//   const data = location.state || {};
//   const { id, fullName, userId, call } = data;
//   const navigate = useNavigate()

//   useEffect(() => {
//     const ws = new WebSocket(`${WEBSOCKET_URL}/ws/video_call/?call_user=${String(id)}&user=${userId}`);
//     socketRef.current = ws;


//     socketRef.current.onopen = () => {
//       if (call === "Yes") {
//         const data = {
//           user_id: id,
//           caller_id: userId,
//           full_name: fullName,
//           call: call,
//         };
//         if (socketRef.current !== null) {
//           socketRef.current?.send(JSON.stringify(data));
//         } else {
//           console.error("Socket is null. Cannot send data.");
//         }
//       }
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data)
//       if (data.call === "cut") {
//         const stream = localStreamRef.current;
//         if (stream) {
//           stream.getTracks().forEach((track) => {
//             track.stop();
//           });
//         }

//         const peerConnection = peerConnectionRef.current;
//         if (peerConnection) {
//           peerConnection.close();
//         }

//         const ws = socketRef.current;
//         if (ws) {
//           ws.close();
//         }

//         setMikeMute(false);
//         setVideoMute(false);
//         navigate("/call_review")
//       } else {
//         const data = JSON.parse(event.data);
//         handleSignalingData(data);

//       }

//     };

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localStreamRef.current = stream;
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }


//         const peerConnection = new RTCPeerConnection({
//           iceServers: [
//             { urls: 'stun:stun.l.google.com:19302' },
//             { urls: 'stun:global.stun.twilio.com:3478' }
//           ]
//         });

//         stream.getTracks().forEach((track) => {
//           peerConnection.addTrack(track, stream);
//         });

//         peerConnection.ontrack = (event) => {
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         peerConnection.onicecandidate = (event) => {
//           if (event.candidate && socketRef.current) {
//             ws.send(
//               JSON.stringify({ type: "candidate", candidate: event.candidate, call: "No" })
//             );
//           }
//         };

//         peerConnectionRef.current = peerConnection;
//       });

//     return () => {
//       ws.close();
//       if (peerConnectionRef.current) {
//         peerConnectionRef.current.close();
//       }
//     };
//   }, [userId, id]);

//   const handleSignalingData = (data: any) => {
//     const connection = peerConnectionRef.current;
//     if (!connection) {
//       console.error("PeerConnection is not initialized.");
//       return;
//     }

//     switch (data.type) {
//       case "offer":
//         if (connection.signalingState === "stable") {
//           connection
//             .setRemoteDescription(new RTCSessionDescription(data.offer))
//             .then(() => {
//               createAnswer();
//             })
//             .catch((error) => {
//               console.error("Error setting remote offer:", error);
//             });
//         } else {
//           console.warn(
//             "Cannot set remote offer: Invalid signaling state:",
//             connection.signalingState
//           );
//         }
//         break;

//       case "answer":
//         if (connection.signalingState === "have-local-offer") {
//           connection
//             .setRemoteDescription(new RTCSessionDescription(data.answer))
//             .catch((error) => {
//               console.error("Error setting remote answer:", error);
//             });
//         } else {
//           console.warn(
//             "Cannot set remote answer: Invalid signaling state:",
//             connection.signalingState
//           );
//         }
//         break;

//       case "candidate":
//         if (connection.remoteDescription) {
//           connection
//             .addIceCandidate(new RTCIceCandidate(data.candidate))
//             .catch((error) => {
//               console.error("Error adding ICE candidate:", error);
//             });
//         } else {
//           connection.onnegotiationneeded = () => {
//             connection
//               .addIceCandidate(new RTCIceCandidate(data.candidate))
//               .catch((error) => {
//                 console.error("Error adding ICE candidate after negotiation:", error);
//               });
//           };
//         }
//         break;

//       default:
//         break;
//     }
//   };

//   const createAnswer = () => {
//     const connection = peerConnectionRef.current;
//     if (connection) {
//       connection.createAnswer().then((answer) => {
//         connection.setLocalDescription(answer);
//         if (socketRef.current) {
//           socketRef.current.send(
//             JSON.stringify({ type: "answer", answer: answer, call: "No" })
//           );
//         }
//       });
//     }
//   };

//   const createOffer = () => {
//     const connection = peerConnectionRef.current;
//     if (connection) {
//       connection.createOffer().then((offer) => {
//         connection.setLocalDescription(offer);
//         if (socketRef.current) {
//           socketRef.current.send(JSON.stringify({ type: "offer", offer, call: "No" }));
//         }
//       });
//     }
//   };

//   const toggleMic = () => {
//     const stream = localStreamRef.current;
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => {
//         track.enabled = !track.enabled;
//         setMikeMute(!track.enabled); // Update the mic mute state
//       });
//     }
//   };


//   const endCallNotification = () => {
//     if (socketRef.current) {
//       socketRef.current.send(JSON.stringify({ call: "cut" }))
//     }
//   }

//   const toggleVideo = () => {
//     const stream = localStreamRef.current;
//     if (stream) {
//       stream.getVideoTracks().forEach((track) => {
//         track.enabled = !track.enabled;
//         setVideoMute(!track.enabled); // Update the mic mute state
//       });
//     }
//   };

//   const endCall = () => {
//     endCallNotification()
//     const stream = localStreamRef.current;
//     if (stream) {
//       stream.getTracks().forEach((track) => {
//         track.stop();
//       });
//     }

//     const peerConnection = peerConnectionRef.current;
//     if (peerConnection) {
//       peerConnection.close();
//     }

//     const ws = socketRef.current;
//     if (ws) {
//       ws.close();
//     }

//     setMikeMute(false);
//     setVideoMute(false);
//     navigate("/call_review")

//   };

//   const handleCall = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     createOffer();
//   };

//   const handleEndCall = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     endCall();
//   };

//   return (
//     <div className="bg-gray-700">
//       <UserHeader />
//       <div className="flex flex-col h-screen">
//         <div className="relative flex-1 flex items-center justify-center bg-black max-h-[80vh] overflow-hidden">
//           <div className="w-full h-full relative">
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               className="w-full h-full max-w-full max-h-full object-cover rounded-lg border-4 border-blue-500 shadow-lg"
//               style={{
//                 aspectRatio: "15/9",
//               }}
//             />
//             <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-xs sm:text-sm md:text-base px-2 sm:px-4 py-1 sm:py-2 rounded">
//               Remote Stream
//             </div>
//           </div>
//           <div className="absolute top-4 right-4 w-24 sm:w-32 md:w-48">
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               className="w-full h-auto max-w-full max-h-full rounded-lg border-4 border-green-500 shadow-lg"
//               style={{ aspectRatio: "16/9" }}
//             />
//             <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
//               Local Stream
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-4 py-4 bg-gray-700 shadow-inner">
//           <button
//             onClick={handleCall}
//             className="px-4 py-2 text-sm sm:text-base md:px-6 md:py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
//           >
//             Call
//           </button>
//           <button
//             onClick={toggleMic}
//             className="px-4 py-2 text-sm sm:text-base md:px-6 md:py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
//           >
//             {mikeMute ? (
//               <FontAwesomeIcon icon={faMicrophoneSlash} />
//             ) : (
//               <FontAwesomeIcon icon={faMicrophone} />
//             )}
//           </button>
//           <button
//             onClick={toggleVideo}
//             className="px-4 py-2 text-sm sm:text-base md:px-6 md:py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
//           >
//             {videoMute ? (
//               <FontAwesomeIcon icon={faVideoSlash} />
//             ) : (
//               <FontAwesomeIcon icon={faVideo} />
//             )}
//           </button>
//           <button
//             onClick={handleEndCall}
//             className="px-4 py-2 text-sm sm:text-base md:px-6 md:py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
//           >
//             End Call
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebRTC;
