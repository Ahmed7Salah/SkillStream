import { Grid } from '@chakra-ui/react'
import Course from '../components/Course'
import { useSelector } from 'react-redux'

const Courses = () => {
  const courses = useSelector((state: any) => state.courses)
  const enrolledCourses = useSelector((state: any) => state.account?.user?.courses)
  return (
    <Grid gridTemplateColumns={"1fr 1fr"} gridTemplateRows={"1fr 1fr"} p={10} gap={16} color='teal'>
      {courses?.coursesList?.map((course: any, index: number) => (
        <Course key={index}
          {...course}
          progress={enrolledCourses?.find((c: any) => c.course._id === course._id)?.progress}
          id={course._id}
        />
      ))}
    </Grid>
  )
}

export default Courses
