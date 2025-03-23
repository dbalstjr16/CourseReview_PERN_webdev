import { useEffect, useContext } from 'react';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    
    const [_, setLoginStatus] = useContext(userContext);
    const navigate = useNavigate();
    // ------ API request to LOGOUT ------
    useEffect(() => {
        fetch("http://localhost:3000/users/logout", {
            method: "POST",
            credentials: "include"
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                throw new Error('Failed to Logout');
            }
        })
        .then(data => {
            alert(data.message);
            setLoginStatus(false);
            navigate("/");
        })
        .catch((error) => {
            console.error(`Error Logging Out: ${error}`);
        })
    }, []);
    
    return <>Logout page! will be directed to home page after an alert!</>;
}

export default Logout;