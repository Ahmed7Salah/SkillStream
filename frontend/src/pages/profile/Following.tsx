import ProfileLayout from '../../components/Profile/ProfileLayout'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import { useSelector } from 'react-redux'
import { GridItem, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import Person from '../../components/Profile/Person'

const Following = () => {
  const following = useSelector((state: any) => state.account.user.following)

  return (
    <ProfileLayout>
      <ProfileHeader title="Following" />
        <TableContainer as={GridItem} colSpan={2}>
          <Table variant='simple'>
            <TableCaption color='teal'>
              You're following {following?.length === 0 ? 'no one' : following?.length === 1 ? '1 user' : `${following?.length} users`}
              {/* <Button colorScheme='teal' variant={'outline'} color='teal' borderColor={'teal'}  _hover={{bg: 'teal.600', color: 'white'}}>Show more</Button> */}
            </TableCaption>
            {!!following?.length && <Thead>
              <Tr>
                <Th>Profile</Th>
                <Th>Name</Th>
                <Th isNumeric>Followers</Th>
              </Tr>
            </Thead>}
            <Tbody>
              {following?.map((f: any) => (
                <Person key={f._id} name={f.name} followerCount={f.followers.length} avatar={f.avatar.url} id={f._id} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ProfileLayout>
  )
}

export default Following
