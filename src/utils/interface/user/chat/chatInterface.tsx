// Opposite user Check online interface

export interface CheckOnlineData{
    online:boolean
  }
  
  
// Chat message data interface
  
export interface ChatMessageData{
    chat_room:number,
    content:string,
    id:number,
    read:boolean,
    timestamp:string,
    user:number
  }