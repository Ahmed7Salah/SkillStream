import { Avatar, Button, Td, Tr } from '@chakra-ui/react'
import { useFollowUser, useUnfollowUser } from '../../hooks/Profile'

const Person = ({ name, followerCount, avatar, id, isFollowing } : { name: string, isFollowing: boolean, followerCount: number, avatar: string, id: string }) => {

  const followUser = useFollowUser()
  const unfollowUser = useUnfollowUser()

  // add another route to find users with id instead of searching by name for fetching

  return (
    // TODO: make it clickable with Link router component so there isn't a full page refresh without messing up the ui
    // TODO: add onClick={() => window.location.href = `/profile/${id}`} to Tr without messing up Buttons
    <Tr _hover={{ cursor: 'pointer', bg: 'gray.100', transition: 'all 0.2s ease-in-out' }}>
      <Td><Avatar src={avatar} /></Td>
      <Td>{name}</Td>
      <Td pl={12}>{followerCount}</Td>
      {isFollowing ? <Td isNumeric><Button colorScheme='teal' onClick={() => unfollowUser(id, name)}>Unfollow</Button></Td> : <Td isNumeric><Button onClick={() => followUser(id, name)} colorScheme='teal'>Follow</Button></Td>}
    </Tr>
  )
}

export default Person
