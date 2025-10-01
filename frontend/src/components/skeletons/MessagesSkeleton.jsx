import React from 'react'

const MessagesSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {skeletonMessages.map((_, index) => {
          return (
            <div key={index} className={`flex items-center gap-3 ${index % 2 === 0 ? "justify-start" : "justify-end flex-row-reverse"}`}>
              {/* Avatar */}
              <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse' />

              {/* Message Bubble */}
              <div className='h-4 w-16 bg-gray-300 rounded mb-2 animate-pulse' />
              <div className='w-[200px] h-16 bg-gry-30 rounded-lg animate-pulse'/>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MessagesSkeleton