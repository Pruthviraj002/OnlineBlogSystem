import { Alert, Button, FloatingLabel, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

function SignIn() {
  const [formData, setFormData] = useState({})
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [loading, setLoading] = useState(false)

  const { loading, error: errorMessage } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      // return setErrorMessage('Please fill out all fields')
      return dispatch(signInFailure("Please fill out all fields"))
    }
    try {
      // setLoading(true)

      // setErrorMessage(null)
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        // return setErrorMessage(data.message)
        dispatch(signInFailure(data.message))
      }
      // setLoading(false)
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))

    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* leftside div */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-black text-4xl ' >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>sagar's</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>This is a demo project,You can sign in with your email and password with google</p>
        </div>
        {/* rightside div */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className=''>
              <Label htmlFor="text" color="gray">Your email</Label>
              {/* <FloatingLabel className='' variant="filled" label="your username" /> */}
              <TextInput type='email' color='info' placeholder='email' id='email' variant="standard" onChange={handleChange} />
            </div>
            <div className=''>
              <Label htmlFor="text" color="gray">Your password</Label>
              {/* <FloatingLabel className='' variant="filled" label="your username" /> */}
              <TextInput type='password' placeholder='***********' color='info' id='password' variant="standard" onChange={handleChange} />
            </div>
            <Button type='submit' className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : "Sign In"}
            </Button >
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span> Don't Have An Account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5 ' color='failure'>{errorMessage}</Alert>
          )}
        </div>
      </div >
    </div >
  )
}

export default SignIn