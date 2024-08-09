// upon signin, this page reloads? check that

import React, {useEffect, useRef, useState} from 'react';
import './Signin.css';
import {firestore, auth, provider} from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import {signInWithPopup} from 'firebase/auth';


const SignIn = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const ref = collection(firestore, "emailpassword");
  const handleSave = async(e) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) {
      console.error("Email and password, both are required.")
      alert("Email and password, both are required.");
    }
    else {
      try {
        await addDoc(ref, {email, password});
        console.log("Data added successfully.");
        emailRef.current.value = '';
        passwordRef.current.value = '';
      } catch(error) {
        console.log("Error adding document.", error);
      }
    }
  };

  const [value, setValue] = useState('');
  const handleGoogleSignIn = async () => {
    try {
      signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          console.log('Sign-in canceled by user.');
        } else {
          console.error('Error signing in with Google :(', error);
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  return (
    <div>
        <h2>Sign In</h2>
        <section className='signin'>
            <div className="container-sign-in">
                <input type="text" placeholder='Email' ref={emailRef}/>
                <input type="password" placeholder='Password' ref={passwordRef}/>
                <button type="submit" onClick={handleSave}>SIGN IN</button>
                <a href="\SignIn"><br/>OR<br/></a>
                <button onClick={handleGoogleSignIn}>SIGN IN WITH GOOGLE</button>
                <button>LOG OUT</button>
            </div>
        </section>
    </div>
  );
};

export default SignIn;