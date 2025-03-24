import { useContext, useState, useEffect } from 'react';
import userContext from '../context/userContext';

const AboutPage = () => {
    const [userID, setUserID] = useState<string>("");
    const [loginStatus, _] = useContext(userContext);

    useEffect(() => {
        fetch('http://localhost:3000/users/me', {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setUserID(data.userID.userID))
        .catch(error => console.error(`Error fetching userID: ${error}`))
    }, [])

    return <>
        {loginStatus ? 
        <p>You are logged in as {userID}. 😊</p> : 
        <p>You are not logged in yet. 😢</p>
        }
    </>;
}

export default AboutPage;