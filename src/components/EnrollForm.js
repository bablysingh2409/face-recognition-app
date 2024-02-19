import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

import { saveToDataBase } from '../services/api';
import { useNavigate } from 'react-router-dom';

const EnrollForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    })
    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);
    const navigate=useNavigate();


    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveToDataBase({
            name: userData.name,
            email: userData.email,
            image,
            // imgEle

        })
        setUserData({
            name:'',
            email:'',
            
        })
        navigate('/')
        //    console.log('userInfo',userData,image,imgEle);
    }

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    const handleCapture = async () => {
        try {
            const imageSrc = webcamRef.current.getScreenshot();
            const imageElement = new Image();
            imageElement.src = imageSrc;
            imageElement.crossOrigin = 'anonymous'

            // Detect the first face in the captured image
            // const face = await detectFace(imageElement);
            setImage(imageSrc);
        } catch (error) {
            console.error('Error during image capture:', error);
            // Handle the error or display an error message to the user
        }
    };


    return (
        <div className='w-full '>
            <div className='w-[90%] p-2 m-auto flex items-center
                border-2 border-black'>
                     <div className='w-[60%] p-5 flex flex-col items-center gap-5'>
            <h2 className='text-3xl font-bold'>Enrollment Form</h2>
            <Webcam
                audio={false}
                mirrored={true}
                height={400}
                width={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <button onClick={handleCapture} className='w-[40%] p-2 text-xl font-bold border-2 border-teal-500
           text-white bg-teal-500 hover:bg-white hover:text-teal-500'>Capture</button>
            </div>
            <form onSubmit={handleSubmit} className='w-[40%] bg-white p-2 flex flex-col items-center shadow-md 
            justify-between  gap-7 '>
                <h1 className='text-3xl font-bold'>Enter Your Details</h1>
                <div>
                <label htmlFor='email' className='text-2xl p-2'>Email:</label>
                <input type="email" value={userData.email} onChange={handleChange} name='email' id='email' 
                className='border-2 border-black p-2 rounded-md text-xl' placeholder='email'/>
                </div>
                
                <div>
                <label htmlFor='name' className='text-2xl p-2'>Name:</label>
                <input type="text" value={userData.name} name='name' id='name'
                    onChange={handleChange} placeholder='name' className='border-2 border-black p-2 rounded-md text-xl'/>
                </div>
                <button type='submit'  className='w-[40%] p-2 text-xl font-bold border-2 border-teal-500
           text-white bg-teal-500 hover:bg-white hover:text-teal-500'   >Submit Data</button>
            </form>

            {image && <img src={image} alt="Captured Face" />}


        </div>
        </div>
    );
};

export default EnrollForm;
