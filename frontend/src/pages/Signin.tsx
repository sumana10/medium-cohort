import {Auth, Quote} from "../components"

const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin"/>
        </div>
        <div className="hidden lg:block">
          <Quote/>
        </div>
      </div>
    </div>
  )
}

export default Signin