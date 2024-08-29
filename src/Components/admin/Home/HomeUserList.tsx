import React from 'react'
import { Header } from './Header'
import { UserList } from '../User/UserList'


export const  HomeUserList: React.FC =()=> {
  return (
    <div>
      <Header/>
      <UserList/>
    </div>
  )
}


