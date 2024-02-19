
import { useEffect } from 'react';
import './App.css';
import RecognizeForm from './components/RecognizeForm';
import { loadFaceApiModels } from './services/faceApi';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import EnrollForm from './components/EnrollForm';


function App() {

  useEffect(() => {
    async function a() {
      await loadFaceApiModels();
    }
    a();
  }, [])

  const router = createBrowserRouter([
    {
      path:'/',
      element:<RecognizeForm/>

    },
    {
      path: '/enroll',
      element: <EnrollForm />
    }
  ])

  return (

    <div className=''>
      <RouterProvider router={router}>
         
    </RouterProvider>
    </div >
   
  );
}

export default App;
