import React from 'react'

const Review = (props) => {
  return (
    <div className='bg-[var(--white)] font-serif py-2 w-full rounded-2xl h-auto px-4 flex flex-col gap-1'>
        <div>

            <div className=''>{props.name}</div>
            <div>{props.city}</div>
        </div>
        <div>* * * * *</div>
        <div className='text-gray-500 text-sm mb-4'>
           {props.text}
        </div>
      
    </div>
  )
}

export default Review
