import { useEffect, useContext } from 'react';
import userContext from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const domain = import.meta.env.VITE_API_URL;

    const [_, setLoginStatus, __, setUserID] = useContext(userContext)!;
    
    const navigate = useNavigate();

    // ------------ Logout User ------------
    useEffect(() => {
        fetch(`${domain}/users/logout`, {
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
            setUserID(null);
            navigate("/");
        })
        .catch((error) => {
            console.error(`Error Logging Out: ${error}`);
        })
    }, []);
    
    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h4 className="text-center mb-3">Logout Page</h4>
                <p className="text-center">You will be redirected to the home page after an alert!</p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Logout;