import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, Flex, GridItem, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import UsersOverlay from '../components/Profile/UsersOverlay'
import Person from '../components/Profile/Person'

const UsersSearchResults = () => {

    const following = useSelector((state: any) => state?.account?.user?.following)

    const users = useSelector((state: any) => state?.users?.usersList)
    const [results, setResults] = React.useState(users)

    useEffect(() => {
        setResults(users)
    }, [users])

  return (
        <TableContainer minH={"66.2vh"} p={5} fontSize={'lg'}>
          <Table variant='simple'>
            <TableCaption color='teal' fontSize={'lg'}>
              {results?.length === 0 ? 'No users found' : `Found ${results?.length} users`}
            </TableCaption>
            {!!results?.length && <Thead>
              <Tr>
                <Th>Profile</Th>
                <Th>Name</Th>
                <Th>Followers</Th>
                <Th isNumeric>Follow User</Th>
              </Tr>
            </Thead>}
            <Tbody>
              {results?.map((f: any) => (
                <Person key={f?._id} name={f?.name} followerCount={f?.followers?.length} avatar={f?.avatar?.url} id={f?._id} 
                isFollowing={following?.find((u: any) => u?._id === f?._id)} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
  )
}

export default UsersSearchResults
