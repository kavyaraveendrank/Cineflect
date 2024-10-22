
import React, { useEffect, useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-t from-transparent to-gray-900 z-10 flex flex-col md:flex-row justify-between'>
      <h1 className=' font-sans text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-red-600  to-blue-600 font-bold mt-1 ml-4'>Cineflect</h1>
      {user && (
        <div className='flex p-2'>
          {showGptSearch && (
            <select className='py-0 w-36 h-8 px-4 rounded-lg bg-indigo-600 border-2 border-indigo-600 text-white font-bold mx-4 m-2 hover:bg-transparent hover:text-indigo-600 hover:border-indigo-600 transition duration-300 ease-in-out' onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}
          <button onClick={handleGptSearchClick} className='py-0 w-32 h-8 px-4 rounded-lg bg-blue-600 border-2 border-blue-600 text-white font-bold mx-4 m-2 hover:bg-transparent hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out'>
            {showGptSearch ? "Home" : "Search"}
          </button>

     
          <div className='relative' ref={dropdownRef}>
            <button onClick={toggleDropdown} className=' py-0 w-32 h-8 px-4 rounded-lg bg-transparent border-2 border-red-600 text-white font-bold mx-4 m-2 hover:bg-red-700 hover:text-white hover:border-gray-500 transition duration-300 ease-in-out'>
            
              
              Profile
            </button>

            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20'>
                <ul className='py-1'>
                  <li className='px-4 py-2 text-black hover:bg-gray-200 cursor-pointer'>
                    <button onClick={handleSignOut} className='py-0 w-32 h-8 px-4 rounded-md bg-red-600 border-2 border-red-600 text-white font-semibold shadow-lg hover:bg-white hover:text-red-600 hover:border-red-600 transition duration-300 ease-in-out transform hover:scale-105'>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    
  );
};

export default Header;

