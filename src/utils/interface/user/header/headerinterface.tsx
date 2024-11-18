// Notification data interface

export interface NotificationInterface {
    another_user: number,
    content: string,
    follower: number | null,
    full_name: string,
    id: number,
    post: number | null,
    read: boolean,
    timestamp: string,
    user_profile: string | null
  }



// Call notification interface


export interface callNotification {
    notification: string,
    full_name: string,
    service: string
  }



  