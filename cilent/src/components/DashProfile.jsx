import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
// import getStorage, { getDownloadURL,  } from 'firebase/storage'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function
  DashProfile() {
  const { currentUser } = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  console.log(imageFileUploadProgress, imageFileUploadError);

  const filePickerRef = useRef()
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    // setImageFile(e.target.files[0])
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }

  }
  // console.log(imageFile, imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])


  const uploadImage = () => {
    const storage = getStorage(app)
    const filename = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError("could not upload image(file must be less than 2MB)"

        )
        setImageFileUploadProgress(null)

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
        })
      }
    )
  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4 '>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='relative w-32  h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => { filePickerRef.current.click() }}>
          {/* {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={
                {
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  },
                  path: {
                    stroke: `rgba(62,152,190 ,${imageFileUploadProgress / 100})`
                  }
                }
              } />
          )} */}
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />

        </div>
        {imageFileUploadError && (
          <Alert color='failure'>
            {imageFileUploadError}
          </Alert>
        )}

        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90">Update</Button>
      </form>

      <div className='text-red-500  flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
