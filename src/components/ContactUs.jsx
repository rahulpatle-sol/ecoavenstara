import React from 'react'
import ContactForm from './ContactForm'

const contactInfo = [
  {
    id: 1,
    type: 'Phone Number',
    value: '(+91)9752505639',
    icon: (
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M2.003 5.884l3.999 9.33c.162.378.521.65.929.716.407.066.827-.05 1.12-.308l2.788-2.51 4.533 1.888a.917.917 0 00.677.012c.279-.094.518-.272.683-.508l3.553-5.044c.165-.234.232-.52.185-.8a.976.976 0 00-.296-.573l-9.106-8.558a.97.97 0 00-.797-.29.982.982 0 00-.616.428L2.003 5.884zm2.302-.819l1.853 4.33L3.75 8.126l.554-1.16zM11.3 9.292l-1.877 1.69-4.94-4.448 6.817 2.758zm5.576 2.834l-1.717 2.44-3.372-1.402 5.09-1.038z' />
      </svg>
    ),
    bgColor: 'bg-green-600'
  },
  {
    id: 2,
    type: 'Email',
    value: 'business@ecoavenstra.com' ,
    value2: 'hr@ecoavenstra.com',
    
    icon: (
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M2 3a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V3zm12 0H6a2 2 0 00-1.528.675L10 8.5l5.528-4.825A2 2 0 0014 3zm-1.857 9.012A5 5 0 0110 15a5 5 0 01-2.143-.988L4 13v3h12v-3l-3.857-1.988z' />
      </svg>
    ),
    bgColor: 'bg-green-600'
  },
  {
    id: 3,
    type: 'Address',
    value: 'Kesri Nagar, Barapatthar, Seoni (M.P) - India',
    icon: (
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M14.3 1.705A5 5 0 0116 2.083V4a1 1 0 01-2 0V2.832a3 3 0 00-1.32-.545L12 2h-.18c-.83 0-1.57.474-1.9 1.158L9.536 4H9a1 1 0 00-1 1v.582l-1.434 2.868a1 1 0 00.17 1.118l1.528 1.718a1 1 0 01-.015 1.427l-2.42 2.2a3 3 0 002.165 5.043h3.306a3 3 0 003.01-2.7l.194-1.544a1 1 0 01.992-.858h.18a1 1 0 001-1v-.818a1 1 0 011-1h2.17a1 1 0 01.694 1.743L15.36 19H14a1 1 0 110-2h.553l1.17-1.71a1 1 0 01.277-.263c.12-.092.25-.167.389-.224a3 3 0 00-.459-.284L15 13H14a1 1 0 01-1-1v-1.45a1 1 0 011-1h1a1 1 0 010 2h-.18l-.18.01L12 10h-1V8h1V7h-1l-.002-1H12V4h1V3h-1a1 1 0 110-2h.11a5 5 0 012.18-.295zM3 14H2a1 1 0 01-1-1V7a5 5 0 0110 0v6a1 1 0 01-1 1H7a1 1 0 01-1-1V8H5v5a1 1 0 01-1 1H3zm4 0V7a3 3 0 00-6 0v7h6zM2.5 7a.5.5 0 010-1H3a.5.5 0 010 1h-.5z' />
      </svg>
    ),
    bgColor: 'bg-green-600'
  }
]

const ContactUs = () => {
  return (
    <div className='h-full flex justify-center flex-col items-center px-4 sm:px-6 lg:px-8'>
      <div className='pt-16 sm:pt-24 lg:pt-32 flex justify-center items-center flex-col'>
        <button className='mb-4 hover:scale-110 transition-transform duration-300 bg-blue-300 py-1 px-4 rounded-full font-semibold text-lg'>
          Contact
        </button>
        <div className='text-white py-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-center'>
          Get in touch
        </div>
        <div className='text-gray-300 text-center text-base md:text-lg  px-4 sm:px-8 md:px-16 lg:px-36 py-6'>
          Ready to enhance your online presence and drive your business forward? Get in touch with Ecoavenstra today and experience the power of exceptional web design and development services. Our team of experts is dedicated to creating visually appealing, user-friendly websites that align with your brand and engage your target audience.
        </div>
      </div>
      <div className='py-10 px-2 w-full md:w-3/5'>
        <ContactForm />
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center gap-14 py-10'>
        {contactInfo.map(info => (
          <div key={info.id} className='bg-[#282828] w-60 h-52 hover:scale-110 transition-transform duration-300  justify-center text-white p-6 rounded-lg flex flex-col items-center'>
            <div className={`${info.bgColor} p-2 rounded-full`}>
              {info.icon}
            </div>
            <div className='mt-4'>
              <div className='font-semibold text-lg flex justify-center'>{info.type}</div>
              <div className='text-gray-400 flex justify-center text-center'>{info.value}</div>
              <div className='text-gray-400 flex justify-center'>{info.value2}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full h-80">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2014.9985803246818!2d79.55916112939234!3d22.09822582349846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2aaf6bebed0f19%3A0x4319154d4ae17ab2!2sVB%20LIBRARY!5e0!3m2!1sen!2sin!4v1722376038049!5m2!1sen!2sin"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      />
    </div>
      </div>
   
  )
}

export default ContactUs
