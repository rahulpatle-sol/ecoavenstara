import React from 'react'
import ServicesGrid from './Services'

const Service_section = () => {
  return (
    <div>
      <div className=''>
        <div className='text-white text-3xl sm:text-5xl flex justify-center font-semibold pt-10 pb-10 sm:pb-20'>
          Our Services
        </div> 
      </div>
      <div className=''>
      <ServicesGrid/>
      </div>
    </div>
  )
}

export default Service_section
