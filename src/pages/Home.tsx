import { Box, Divider, Flex, Grid, Heading } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import Course from "../components/Course"
import { useEffect, useState } from "react"

const Home = () => {
  const { loggedIn, user } = useSelector((state: any) => state.account)
  const courses = useSelector((state: any) => state?.courses)
  const enrolledCourses = useSelector((state: any) => state.account?.user?.courses)
  let [sortedCourses, setSortedCourses] = useState([]);

  useEffect (() => {
    setSortedCourses(courses?.coursesList)
  }, [courses?.coursesList])

  return (
    <Box bg="gray.50" color="teal">
    {!!loggedIn && <>
      <Flex backgroundImage={require('../assets/welcome.webp')} bgAttachment={"fixed"} bgRepeat={'no-repeat'} bgSize="cover"
    backgroundPosition="center" justifyContent="center" alignItems="center" height="40vh">
      <Heading color="white" size="xl">Welcome, {user.name}</Heading>
      </Flex>
      </> }
      <Flex justifyContent="center" w={"60%"} mx={"auto"} alignItems="flex-end" height="20vh" pb={3} borderBottom={"1px"} borderColor="gray.300">
        <Heading color="white" bgGradient={'linear(to-r, teal.400, teal.600)'} p={3} bgClip="text" fontWeight="bold" size="lg">Discover the course that fits your ambitions.</Heading>
      </Flex>
      <Heading ml={20} pt={24} color="teal" size="lg">Popular Courses</Heading>
      <Divider color="gray" w={"20%"} ml={16} mt={4} />
      <Grid gridTemplateColumns={"1fr 1fr"} gridTemplateRows={"1fr 1fr"} p={10} gap={16} color='teal'>
        {sortedCourses?.slice(0, 4).map((course: any, index: number) => (
          <Course key={index}
            {...course}
            progress={enrolledCourses?.find((c: any) => c.course._id === course._id)?.progress}
            id={course._id}
          />
        ))}
      </Grid>
      </Box>
  )
}

export default Home
