import React from 'react'

const NoChatSelected = () => {
  return (
    <>
      <div className='w-full flex flex-col flex-1 items-center justify-center p-16 bg-white/50'>
        <div className='max-w-md text-center space-y-6'>
          {/* Icon Display */}
          <div className='flex justify-center gap-4 mb-4'>
            <div className='relative'>
              <div className='w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center animate-bounce'>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoChatSelected