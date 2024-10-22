import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL } from '../utils/constants';


const Logins = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (


  <div>
  <Header />

  <div className="relative h-screen overflow-hidden">
    <img className="absolute inset-0 w-full h-full object-cover" src={BG_URL} alt="logo" />
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%)' }}></div>
  </div>

  <div className="absolute inset-0 flex items-center justify-center">
    <form 
      onSubmit={(e) => e.preventDefault()} 
      className='w-11/12 sm:w-4/12 p-6 md:p-12 bg-black text-white bg-opacity-90 z-10 rounded-lg'
    >
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
      
      {!isSignInForm && (
        <input 
          type="text" 
          placeholder='Full Name' 
          className='p-4 my-4 w-full rounded-lg bg-transparent border-2 border-white text-white focus:outline-none focus:ring-2 focus:ring-red-700 transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black' 
        />
      )}

      <input 
        ref={email}
        type="text" 
        placeholder='Email Address' 
        className='p-4 my-4 w-full rounded-lg bg-transparent border-2 border-white text-white focus:outline-none focus:ring-2 focus:ring-red-700 transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black' 
      />
      
      <input 
        ref={password} 
        type="password" 
        placeholder='Password' 
        className='p-4 my-4 w-full rounded-lg bg-transparent border-2 border-white text-white focus:outline-none focus:ring-2 focus:ring-red-700 transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black' 
      />
      
      <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
      
      <button
        className='p-4 my-6 w-full font-bold rounded-lg bg-transparent border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out'
        onClick={handleButtonClick}
      >
        {isSignInForm ? "Sign In" : "Sign Up"}
      </button>
      
      <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
        {isSignInForm ? "New to Cineflect? Sign Up Now" : "Already registered? Sign In Now"}
      </p>
    </form>
  </div>
</div>


  );
};

export default Logins;
