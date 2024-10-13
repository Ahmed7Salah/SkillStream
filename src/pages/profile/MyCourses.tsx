import ProfileLayout from '../../components/Profile/ProfileLayout'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import { useSelector } from 'react-redux'
import Course from '../../components/Course'
import { Grid, GridItem } from '@chakra-ui/react'

const MyCourses = () => {
  const courses = useSelector((state: any) => state?.account?.user?.courses)
  return (
    <ProfileLayout>
      <ProfileHeader title="My Courses" />
        <Grid as={GridItem} gap={16} colSpan={2}>
          {courses?.map((course: any, index: number) => (
            <Course key={index}
            {...course.course}
            progress={course.progress}
            id={course.course._id}
            />
          ))}
      
      </Grid>
    </ProfileLayout>
  )
}

export default MyCourses
