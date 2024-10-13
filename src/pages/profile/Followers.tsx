import React from 'react'
import { useSelector } from 'react-redux'
import UsersOverlay from '../../components/Profile/UsersOverlay'

const Followers = () => {
    const followers = useSelector((state: any) => state.account.user.followers)
  return (
        <UsersOverlay users={followers} title="Followers" />
    )
}

export default Followers
