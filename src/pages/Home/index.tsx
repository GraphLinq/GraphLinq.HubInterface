import "./_home.scss"
import { SITE_NAME } from "@constants/index"
import { Helmet } from "react-helmet-async"

function HomePage() {
  return (
    <>
      <Helmet>
        <title>
          {SITE_NAME} — Home
        </title>
      </Helmet>
      <div className='home'>
        home
      </div>
    </>
  )
}

export default HomePage
