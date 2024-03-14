import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { Appbar, SingleBlog, Spinner } from '../components';

const Blog = () => {
  const {id}  = useParams();

  const {loading, blog} = useBlog({
    id: id || ""
  });
  console.log(blog)
  if(loading || !blog){
    return<div>
      <Appbar/>
      <div className='h-screen flex flex-col justify-center'>
        <div className='flex justify-center'>
          <Spinner/>
        </div>
      </div>
    </div>
  }
  return (
    <div>
      <SingleBlog blog={blog}/>
    </div>
  )
}

export default Blog