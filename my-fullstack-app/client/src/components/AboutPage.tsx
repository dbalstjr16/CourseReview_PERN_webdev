import { useContext, useState, useEffect } from 'react';
import userContext from '../context/userContext';

function AboutPage() {
    const [userID, setUserID] = useState<string | null>(null);
    const [loginStatus, _] = useContext(userContext)!;

    // ------- Fetch and Store userID -------
    useEffect(() => {
        fetch('http://localhost:3000/users/me', {
            method: "GET",
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) throw new Error ("Not logged in");
            return res.json();
        })
        .then(data => setUserID(data.userID.userID))
        .catch(error => {
            console.warn("You're not logged in:", error.message);
        })
    }, [])
    
    return <>
        {loginStatus ? 
        <p>You are logged in as {userID}. 😊</p> : 
        <p>You are not logged in yet. 😢</p>
        }
    </>;
}

export default AboutPage;