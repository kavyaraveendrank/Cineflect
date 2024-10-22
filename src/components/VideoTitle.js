import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-20 absolute text-white bg-gradient-to-r from-black' >
      <h1 className='text-5xl font-sans'>{title}</h1>
      <p className='py-4 text-base leading-loose w-1/3 font-sans'>{overview}</p>
    </div>
   
  );
};

export default VideoTitle;
