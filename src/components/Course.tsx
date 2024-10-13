import { Box, Button, Card, CardBody, CardFooter, CardHeader, CircularProgress, CircularProgressLabel, Flex, Heading, Text } from '@chakra-ui/react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { VscDebugContinue, VscDebugStart } from 'react-icons/vsc'
import { useAddCourse, useLikeCourse, useUnlikeCourse } from '../hooks/Profile'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchCourses } from '../hooks/Courses'
import { Link } from 'react-router-dom'


interface Props {
  id: string
  name: string
  description: string
  image: { url: string, public_id: string}
  likes: number
  progress: number
}


const Course = ({ id, name, description, image, likes, progress } : Props) => {

  const user = useSelector((state: any) => state?.account?.user)

  const { likedCourses, courses } = useMemo(() => ({
    likedCourses: user?.likedCourses || [],
    courses: user?.courses || []
  }), [user]);
  
  // TODO: add user's like without fetching
  // TODO: when I like a course, all courses render. fixxx
  // should I use useState here?
  const [liked, setLiked] = useState(false)
  // TODO: move enrolled to a prop
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    setLiked(!!likedCourses.find((likedCourse: any) => likedCourse._id === id))
    setEnrolled(!!courses.find((course: any) => course.course._id === id))
  }, [likedCourses, id, courses]);

  
  const likeCourse = useLikeCourse();
  const unlikeCourse = useUnlikeCourse();

  const addCourse = useAddCourse();


  return (
    <Card 
      size={"lg"}
      textColor={"white"}
      position="relative" 
      overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={`url(${image?.url})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          filter="blur(4px)"
          zIndex={1}  // Ensures the blur stays behind the content
        />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.4)" // Dark transparent overlay
        zIndex={2}  // Ensure the overlay is above the background but below the text
      />
      <Box position="relative" zIndex={3} p={5}>
          <CardHeader>
              <Heading size='lg'>{name}</Heading>
          </CardHeader>
          <CardBody>
              <p>{description}</p>
          </CardBody>
          <CardFooter display={'block'} justifyContent='flex-end'>
              <Flex justifyContent='space-between' alignItems='center'>
                  <Text>{likes} Likes</Text>
                  <Flex gap={4} alignItems={'center'}>
                    <Button onClick={() => liked ? unlikeCourse(id) : likeCourse(id)} size={'md'} colorScheme='white' variant='link' _hover={{color: 'teal.400'}}> {liked ? <FaHeart size={25}/> : <FaRegHeart size={25}/>} </Button>
                    {!enrolled ? <Button onClick={() => addCourse(id)} size={'lg'} colorScheme='white' variant='outline' 
                    borderColor='white' _hover={{bg: 'teal.600', color: 'white', borderColor: 'teal.600'}} rightIcon={<VscDebugStart size={20} />}>Enroll Now</Button>
                    : <>
                    {/* <CircularProgress value={progress} color='teal'>
                    <CircularProgressLabel>{progress}%</CircularProgressLabel>
                    </CircularProgress> */}
                  <Button as={Link} to={`/learn/${id}`} size={'lg'} colorScheme='white' variant='outline' 
                  borderColor='white' _hover={{bg: 'teal.600', color: 'white', borderColor: 'teal.600'}} rightIcon={<VscDebugContinue size={20} />}>Continue Learning</Button>
                  </>}
                  </Flex>
              </Flex>
          </CardFooter>
        </Box>
    </Card>
  )
}

export default Course
