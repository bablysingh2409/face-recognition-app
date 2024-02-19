import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { getUserData } from '../services/api';
import { recognizeSingleFace } from '../services/faceApi';
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const RecognizeForm = () => {
    // const [image, setImage] = useState(null);
    const webcamRef = useRef(null);
    const [userData, setUserData] = useState([]);
    const [matchUser,setMatchUser]=useState([]);
    const [isAuthorized, setIsAuthorized] = useState(true);


    const navigate=useNavigate();


    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    useEffect(() => {
        const callUser = async () => {
            try {
                const imageSrc = webcamRef.current.getScreenshot();
                const imageElement = new Image();
                imageElement.src = imageSrc;
                imageElement.crossOrigin = 'anonymous';

                // Create an array of promises for recognizing each user
                const matchDataPromises = userData.map(async (d) => {
                    const storeImageElement = new Image();
                    storeImageElement.src = d.image;
                    storeImageElement.crossOrigin = 'anonymous';
                    // console.log(storeImageElement);
                    
                    const recognitionResult = await recognizeSingleFace(imageElement, storeImageElement);
                    console.log('recognitionResult...',recognitionResult)
                    if (recognitionResult) {
                        
                        return d;
                    }
                });
               
                // Wait for all promises to resolve
                const matchData = await Promise.all(matchDataPromises);
                //   console.log('matchData',matchData)
                // Filter out undefined results (non-matches)
                const filteredMatchData = matchData.filter(match => match);

               

                // Update state with matching users
                setMatchUser([...filteredMatchData]);
                setIsAuthorized(filteredMatchData.length > 0);
            } catch (error) {
                console.error('Error recognizing faces:', error);
            }
        }

        userData.length && callUser();
    }, [userData])

    const handleCapture = async () => {
        try {
            const data = await getUserData();
            setUserData([...data]);
        } catch (error) {
            console.error('Error during image capture:', error);
        }
    };

    const handleUnauthorizedAccess = () => {
        // Redirect to the enroll or signup page
        navigate('enroll') // Replace '/enroll' with the actual path of your enroll/signup page
    };


    return (
        <div className='w-full '>
            {/* <h2>Recognition Form</h2> */}
            <div className='w-[90%] p-2 m-auto flex items-center
            border-2 border-black'>
             <div className='w-[60%] p-5 flex flex-col items-center gap-5'>
                <h1 className='text-3xl font-bold'>ATTENDANCE</h1>
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
            <div  className='w-[60%] '>
            {isAuthorized ? (
            matchUser.length > 0 ? (
              <div className='bg-white p-2 w-[60%] flex flex-col items-center shadow-md'>
                <TiTick className='size-[50%] text-green-500' />
                <img src={matchUser[0].image} alt='img' className='w-[50%] rounded-full shadow-lg' />
                <h1 className='text-xl font-bold '>{matchUser[0].name}</h1>
                <p className='text-3xl font-bold text-green-400'>Attendance marked</p>
              </div>
            ) : (
              null
            )
          ) : (
            <div className='bg-red-500 p-4 rounded-md'>
              <p className='text-white font-bold'>Unauthorized Access</p>
              <p className='text-white cursor-pointer hover:text-blue-800' onClick={handleUnauthorizedAccess}>Go and signup to enroll for attendance.</p>
            </div>
          )}
            </div>
          </div>  
        </div>
    );
};

export default RecognizeForm;






    // const handleCapture = async () => {
    //     try {
    //         // const imageSrc = webcamRef.current.getScreenshot();
    //         // const imageElement = new Image();
    //         // imageElement.src = imageSrc;
    //         // imageElement.crossOrigin = 'anonymous'


    //         // Load face-api.js models
    //         //   await loadFaceApiModels();

    //         // Detect faces in the Base64-encoded JPEG image
    //         // const faces = await detectFace(imageElement);
    //         //   console.log(faces);
    //         const data = await getUserData();
    //         setUserData([...data])
    //         //   const data=await getUserData().map(async(d)=>{
    //         //     const storeImageElement = new Image();
    //         //     storeImageElement.src =data.image;
    //         //     storeImageElement.crossOrigin='anonymous' ;
    //         //     console.log(d)
    //         //     const recognitionResult = await recognizeSingleFace(imageElement, storeImageElement); 
    //         //     if(recognitionResult){
    //         //         return true;
    //         //     }
    //         //   })
    //         // console.log('data...', data);

    //         // Get descriptors for stored faces
    //         // const storedDescriptors = await getStoredFaceDescriptors();

    //         // Recognize the single face against stored faces
    //         // const recognitionResult = await recognizeSingleFace(imageElement, storedDescriptors);

    //         // Process the recognition result (e.g., log or update UI)
    //         // console.log('Recognition Result:', recognitionResult);

    //         // Set the captured image for display or further processing
    //         // setImage(imageSrc);
    //     } catch (error) {
    //         console.error('Error during image capture:', error);
    //         // Handle the error or display an error message to the user
    //     }
    // };

