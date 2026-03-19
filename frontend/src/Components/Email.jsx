import React from 'react'

const Email = () => {
  return (
    <div className='w-full flex justify-center'>
        <div className='inline-flex w-2/4 border rounded-sm'>
            <input  type="email" className='w-3/4 px-2 outline-0' placeholder='Enter your Email' />
            <button type='submit' className='bg-blue-500 outline-0 w-1/4 text-white rounded-sm ' >Subscribe</button>
        </div>
      
    </div>
  )
}

export default Email
