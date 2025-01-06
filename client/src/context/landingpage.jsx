import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { base_url } from "./baseuser";
import { useNavigate } from "react-router-dom";

const landingContext = createContext();

export const useLanding = ()=>{
    const value = useContext(landingContext);
    return value;
}

export const LandingProvider = ({children})=>{
    const navigate = useNavigate();
    const [getPost, setGetPost] = useState([]);
    const [getKudos, setGetKudos] = useState([]);
    const [setKudos, setSetKudos] = useState({reason:'', toUser:'', kudoId:''}); 

    const getPostData = async()=>{
        const token = localStorage.getItem('token')
        try {
            const res = await axios.get(`${base_url}/postkudo/getallkudos`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                setGetPost(res.data.data);
                return;
            }
        } catch (error) {
            console.error("Error fetching kudos:",error)
        }
    }

    const getKudosData = async ()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${base_url}/kudos/getallkudos`);
            if(res.status==200){
                setGetKudos(res.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handlePostKudos = async ()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${base_url}/postkudo/create`, setKudos,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            if(res.status === 201){
                alert(res.data.message);
                setSetKudos({reason: '', toUser:'', kudoId: ''});
                navigate('/landing-page');
                return;
            }
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }

    const handleLike = async (postId)=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${base_url}/postkudo/toggleLike/${postId}`,{}, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            if(res.status === 200){
                alert(res.data.message);
                getPostData();
                return;
            }
        } catch (error) {
            alert(error.response.data.message);
            console.error(error)
            return;
        }
    }

    return(
        <landingContext.Provider value={{getPost, getPostData, getKudosData, getKudos,
            handlePostKudos, setKudos, setSetKudos, handleLike
        }}>
            {children}
        </landingContext.Provider>
    )
}