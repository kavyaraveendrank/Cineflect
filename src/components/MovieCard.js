import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
 
  return (
    <div>
    <div className='w-48 pr-4'>
      <img className='transform transition-transform duration-700 ease-in-out hover:scale-125' alt='Movie Card' src={IMG_CDN_URL + posterPath}/>
    </div>
      </div>

    

    
  )
}

export default MovieCard

