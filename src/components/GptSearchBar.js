import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.lang)

  const searchText = useRef(null)
  
  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+
      movie+
      '&include_adult=false&language=en-US&page=1',
    API_OPTIONS
  );
  const json = await data.json()
  return json.results;
  }
  const handleGptSearchClick = async() => {
 
    console.log(searchText.current.value);

    const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query:" + searchText.current.value + "only give me name of 8 movie, comma seperated like the example results given ahead. Example Result : Gadar,Sholay,Don,Golmal,Yeh Jawani Hai Diwani,Hello,Maayavi,Guru";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!gptResults.choices) {
     
    }

    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray); 
    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames: gptMovies , movieResults: tmdbResults}));
  };

  return (
    <div className='pt-[8%] flex ml-72 ' >
      <form className='bg-black w-1/2 grid grid-cols-12 h-14' onClick={(e)=> e.preventDefault()}>
        <input 
  ref={searchText} 
  type="text" 
  placeholder={lang[langKey].gptSearchPlaceholder} 
  className='p-4 m-2 h-8 col-span-9 bg-transparent border-2 border-gray-400 text-white rounded-lg focus:border-red-700 focus:ring-2 focus:ring-red-700 placeholder-gray-500 hover:border-red-700 hover:ring-2 hover:ring-red-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg'
/>
        <button onClick={handleGptSearchClick} className='px-2 py-0 h-8 m-2 col-span-3 rounded-lg bg-red-700 border-2 border-red-700 text-white font-bold mx-4  hover:bg-transparent hover:text-red-700 hover:border-red-700 transition duration-300 ease-in-out'>{lang[langKey].search}</button>
      </form>
    </div>




  )
}

export default GptSearchBar
