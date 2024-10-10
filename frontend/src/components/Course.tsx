import { Button, Card, CardBody, CardFooter, CardHeader, CircularProgress, CircularProgressLabel, Flex, Heading, Text } from '@chakra-ui/react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { VscDebugContinue, VscDebugStart } from 'react-icons/vsc'
import { useAddCourse, useLikeCourse, useUnlikeCourse } from '../hooks/Profile'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchCourses } from '../hooks/Courses'
import { Link } from 'react-router-dom'


interface Props {
  id: string
  header: string
  description: string
  image: string
  likes: number
  progress: number
}


const Course = ({ id, header, description, image, likes, progress } : Props) => {

  const user = useSelector((state: any) => state?.account?.user)

  const { likedCourses, courses } = useMemo(() => ({
    likedCourses: user?.likedCourses || [],
    courses: user?.courses || []
  }), [user]);
  
  // TODO: add user's like without fetching
  
  const fetchCourse = useFetchCourses();
  
  // should I use useState here?
  const [liked, setLiked] = useState(false)
  // TODO: move enrolled to a prop
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    if (likedCourses?.find((likedCourse: any) => likedCourse._id === id)) setLiked(true)
    else setLiked(false)
  if (courses?.find((course: any) => course.course._id === id)) setEnrolled(true)
    else setEnrolled(false)
  }, [likedCourses, id, courses])

  useEffect(() => {
    fetchCourse(id)
  }, [liked, enrolled])

  const likeCourse = useLikeCourse();
  const unlikeCourse = useUnlikeCourse();

  const addCourse = useAddCourse();


  return (
    <Card 
      bgImage={`url(${image})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      size={"lg"}
      textColor={"teal"}
      >
        <CardHeader>
            <Heading size='lg'>{header}</Heading>
        </CardHeader>
        <CardBody>
            <p>{description}</p>
        </CardBody>
        <CardFooter display={'block'} justifyContent='flex-end'>
            <Flex justifyContent='space-between' alignItems='center'>
                <Text>{likes} Likes</Text>
                <Flex gap={4} alignItems={'center'}>
                  <Button onClick={() => liked ? unlikeCourse(id) : likeCourse(id)} size={'md'} colorScheme='teal' variant='link' _hover={{color: 'teal.400'}}> {liked ? <FaHeart size={25}/> : <FaRegHeart size={25}/>} </Button>
                  {!enrolled ? <Button onClick={() => addCourse(id)} size={'lg'} colorScheme='teal' variant='outline' 
                  borderColor='teal' _hover={{bg: 'teal.600', color: 'white'}} rightIcon={<VscDebugStart size={20} />}>Enroll Now</Button>
                  : <><CircularProgress value={progress} color='teal'>
                  <CircularProgressLabel>{progress}%</CircularProgressLabel>
                </CircularProgress>
                <Button as={Link} to={`/learn/${id}`} size={'lg'} colorScheme='teal' variant='outline' 
                borderColor='teal' _hover={{bg: 'teal.600', color: 'white'}} rightIcon={<VscDebugContinue size={20} />}>Continue Learning</Button>
                </>}
                </Flex>
            </Flex>
        </CardFooter>
    </Card>
  )
}

export default Course
