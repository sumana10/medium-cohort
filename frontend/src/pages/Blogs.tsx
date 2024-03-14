import { useBlogs } from '../hooks'
import {Appbar, Shimmer, BlogCard} from '../components'

const Blogs = () => {

  const { loading, blogs } = useBlogs();
  console.log(blogs)
  if (loading) {
    return <div>
      <Appbar/>
      <div className='flex justify-center'>
        <div>
          <Shimmer/>
        </div>
      </div>
    </div>
  }
  return (
    <div>
<Appbar/>
    <div className='flex justify-center'>
      <div>
        {blogs.map(blog => 
        <BlogCard
           key={blog.id}
           id={blog.id}
           title={blog.title}
           content={blog.content}
           publishedDate={"2nd Feb 2024"} 
           authorName= {blog.author.name || "Anonymous"} 
          />)}
      </div>
    </div>
    </div>
    
  )
}

export default Blogs