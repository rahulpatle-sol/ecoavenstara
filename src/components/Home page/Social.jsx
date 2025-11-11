import React from 'react'
import instagram from "../../assets/instagram.png"
import facebook from "../../assets/facebook.png"
import linkedin from "../../assets/linkedIn.png"
import whatsapp from "../../assets/whatsapp.png"
import { Link } from "react-router-dom";

const Social = () => {
  return (
    <div className='aspect-square object-contain h-fit  flex md:flex-col flex-row md:pt-32  gap-4 px-3'>      <div className='size-8 object-contain hover:scale-110'>
        <img className='' src={instagram} alt="instagram" />
      </div>
      <Link to="https://www.facebook.com/Ecoavenstra/" target="_blank">
        <div className='size-8 object-contain hover:scale-110'>
          <img className='' src={facebook} alt="facebook" />
        </div>
      </Link>
      <Link to="https://www.linkedin.com/company/ecoavenstra-hr-infotech-pvt-ltd/" target="_blank">
        <div className='size-8 object-contain hover:scale-110'>
          <img className='' src={linkedin} alt="linkedin" />
        </div>
      </Link>
      <Link to="https://wa.me/+919752505639" target="_blank">
        <div className='size-8 object-contain hover:scale-110'>
          <img className='' src={whatsapp} alt="whatsapp" />
        </div>
      </Link>
    </div>
  )
}

export default Social
