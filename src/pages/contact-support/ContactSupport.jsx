import React from 'react'

const ContactSupport = () => {
  return (
    <div className='flex flex-col items-start justify-start min-h-screen  bg-gray-100 pt-10 pl-40 pr-40'>
      <h1 className='text-2xl font-bold mb-5'>Contact Support</h1>
      <p className='mb-5'>If you have any questions or issues, please fill out the form below. Our support team will get back to you as soon as possible</p>
      
      <form className='flex flex-col w-full'>
        <label className='mb-2 font-semibold' htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="input-field slim-input w-full max-w-110"
          placeholder='Enter subject'
           />
        <label className='mb-2 font-semibold' htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="input-field slim-input w-full max-w-110"
          placeholder='Enter your message'
          rows="4"/>
          <button className='ml-auto py-2 px-3 rounded-3xl font-bold bg-[#DCE8F6]'>Send Message</button>
      </form>
    </div>
  )
}

export default ContactSupport