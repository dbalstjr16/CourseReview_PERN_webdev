import { useContext, useState, useEffect } from 'react';
import userContext from '../context/userContext';

function AboutPage() {
    
    const [loginStatus, unused1, userID, unused2] = useContext(userContext)!;

    return <>
        {loginStatus ? 
        <p>You are logged in as {userID}. 😊</p> : 
        <p>You are not logged in yet. 😢</p>
        }
    </>;
}

export default AboutPage;