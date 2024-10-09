import { Avatar, Td, Tr } from '@chakra-ui/react'

const Person = ({ name, followerCount, avatar, id } : { name: string, followerCount: number, avatar: string, id: string }) => {
  return (
    // TODO: make it clickable with Link router component so there isn't a full page refresh without messing up the ui
    <Tr onClick={() => window.location.href = `/profile/${id}`} _hover={{ cursor: 'pointer', bg: 'gray.100', transition: 'all 0.2s ease-in-out' }}>
      <Td><Avatar src={avatar} /></Td>
      <Td>{name}</Td>
      <Td isNumeric>{followerCount}</Td>
    </Tr>
  )
}

export default Person
