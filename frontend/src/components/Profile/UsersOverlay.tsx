import ProfileLayout from './ProfileLayout'
import ProfileHeader from './ProfileHeader'
import { GridItem, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import Person from './Person'

const UsersOverlay = ({ users, title }: { users: any, title: string }) => {

  return (
    <ProfileLayout>
      <ProfileHeader title={title} />
        <TableContainer as={GridItem} colSpan={2}>
          <Table variant='simple'>
            <TableCaption color='teal'>
              {title === "Following" ?
                `You're following ${users?.length === 0 ? 'no one' : users?.length === 1 ? '1 user' : `${users?.length} users`}`
                : `You have ${users?.length === 0 ? 'no followers' : users?.length === 1 ? '1 follower' : `${users?.length} followers`}`}
              {/* <Button colorScheme='teal' variant={'outline'} color='teal' borderColor={'teal'}  _hover={{bg: 'teal.600', color: 'white'}}>Show more</Button> */}
            </TableCaption>
            {!!users?.length && <Thead>
              <Tr>
                <Th>Profile</Th>
                <Th>Name</Th>
                <Th isNumeric>Followers</Th>
              </Tr>
            </Thead>}
            <Tbody>
              {users?.map((f: any) => (
                <Person key={f._id} name={f.name} followerCount={f.followers.length} avatar={f.avatar.url} id={f._id} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ProfileLayout>
  )
}

export default UsersOverlay
