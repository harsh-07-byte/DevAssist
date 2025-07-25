import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className=' mx-auto w-11/12 max-w-[1000px] py-10'>
    <div className='flex w-full items-start gap-x-6'>
        <div className='flex flex-1 flex-col'>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Add Course</h1>
            <RenderSteps/>
        </div>
        <div className='sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block'>
            <p className='mb-8 text-lg text-richblack-5'>⚡ Some suggestions which you can use while uploading course</p>
            <ul className='ml-5 list-item list-disc space-y-4 text-xs text-richblack-5'>
                <li>You can either make the course paid or free for everyone</li>
                <li>General Recommended size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>You can use the course builder to create and organize the course</li>
                <li>You can create lessons, assignments by adding titles in the course builder</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>To notify your students for any imporatant news you can notify them</li>
            </ul>
        </div>
    </div>
</div>
  )
}

export default AddCourse