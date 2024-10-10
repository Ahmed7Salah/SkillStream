import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetContent } from '../hooks/Courses'

const CourseContent = () => {

    const courseId = useParams().courseId
    const course = useSelector((state: any) => state?.courses?.coursesList.find((c: any) => c._id === courseId))

    const getContent = useGetContent()
    const [content, setContent] = useState([])
    useEffect(() => {
        (async() => setContent(await getContent(courseId)))();
    }, [])
    console.log(content)

  return (
    <div>
        {content}
    </div>
  )
}

export default CourseContent
