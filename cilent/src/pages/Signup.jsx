import { Button, FloatingLabel, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* leftside div */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-black text-4xl ' >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>sagar's</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>This is a demo project,You can sign up with your email and password with google</p>
        </div>

        {/* rightside div */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div className=''>
              <Label htmlFor="text" color="gray">Your username</Label>
              {/* <FloatingLabel className='' variant="filled" label="your username" /> */}
              <TextInput type='text' color='info' placeholder='username' id='username' variant="standard" />
            </div>

            <div className=''>
              <Label htmlFor="text" color="gray">Your email</Label>
              {/* <FloatingLabel className='' variant="filled" label="your username" /> */}
              <TextInput type='email' color='info' placeholder='email' id='username' variant="standard" />
            </div>

            <div className=''>
              <Label htmlFor="text" color="gray">Your password</Label>
              {/* <FloatingLabel className='' variant="filled" label="your username" /> */}
              <TextInput type='password' placeholder='password' color='info' id='username' variant="standard" />
            </div>
            <Button type='submit' className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90">Sign Up </Button >
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have An Account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Signup