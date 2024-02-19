import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500'; 
export const saveToDataBase=async(userData)=>{
    try{
       const res=await axios.post(`${API_BASE_URL}/user-data`,userData)
    }catch(err){
     console.log('errrrr',err);
    }
}


export const getUserData=async ()=>{
    try{
       const res=await axios.get(`${API_BASE_URL}/user-data`);
       const data=await res.data;
    //    console.log('dddddd',data)
       return data
    }catch(err){
        console.log(err)
    }
}