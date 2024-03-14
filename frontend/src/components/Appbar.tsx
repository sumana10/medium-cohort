import React from 'react'
import { Avatar } from './BlogCard'
import { Link } from 'react-router-dom'

const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <Link className='flex flex-col justify-center cursor-pointer' to={'/blogs'}>
        Medium
      </Link>
      <div>
        <Link to={`/publish`}>
          <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
        </Link>
        <Avatar name="Sum" size={"big"} />
      </div>
    </div>
  )
}

export default Appbar