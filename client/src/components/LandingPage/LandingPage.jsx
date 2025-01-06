import './main.css'
import givePNG from '../../assets/give.png';
import Heart from '../../assets/heart.png';
import Heart2 from '../../assets/heart (1).png';
import SearchIcon from '../../assets/search-flight.png';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/user';
import { useLanding } from '../../context/landingpage';

export const LandingPage = ()=>{
    const {getUserName} = useUser();
    const {getPost, getPostData, handleLike} = useLanding();
    console.log(getPost)
  

    useEffect(()=>{
        getPostData();
    },[])
    return(
        <>
        
        <div class="container">
            <h5>Welcome {getUserName?.name}!</h5>
            <div className='btn-container'> 
                <div>
                    <a style={{textDecoration: 'none', color: "black"}} href='/give-kudo'>Give Kudo</a>
                </div>
            </div>
            <div className='parent-card-container'>
            {getPost?.map((data) => {
    // Extract isLike from the nested 'like' array
    const isLike = data.like?.find(like => like.user === getUserName?._id)?.isLike || false;

    return (
        <div className="card-container" key={data._id}>
            <div className="image-container">
                <img src={givePNG} alt="give" width="80" />
                <p className="kudo-text">
                    <span>{data.fromUser.name}</span> gave <span>"{data.kudo.kudos}"</span> Badge to <span>{data.toUser.name}</span>
                </p>
            </div>
            <p className="reason-text">{data.reason}</p>
            <div className="heart-container">
                {isLike ? (
                    <img src={Heart} alt="liked" width="30" onClick={() => handleLike(data._id)} />
                ) : (
                    <img src={Heart2} alt="unliked" width="30" onClick={() => handleLike(data._id)} />
                )}
            </div>
        </div>
    );
})}

           </div>
            <div className='search-container'>
                <a href='/dashboard'>
                <img src={SearchIcon} width="40"/>
                </a>
            </div>
        </div>
        </>
    )
}