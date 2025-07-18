import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';



export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleGoogleClick = async () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json()
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')

            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button onClick={handleGoogleClick} type='submit' className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md border-2 border-white hover:from-pink-600 hover:to-orange-600 hover:border-orange-200 transition-all duration-300">
            <AiFillGoogleCircle className='w-6 h-6  mr-2' />
            Continue with Google
        </Button>
    )
}
