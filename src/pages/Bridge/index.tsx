import "./_bridge.scss"
import { SITE_NAME } from "@constants/index"
import { Helmet } from "react-helmet-async"

function BridgePage() {
  return (
    <>
      <Helmet>
        <title>
          {SITE_NAME} — Bridge
        </title>
      </Helmet>
      <div className='bridge'>
        bridge
      </div>
    </>
  )
}

export default BridgePage
