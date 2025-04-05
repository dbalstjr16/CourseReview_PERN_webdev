import { Form, Button } from 'react-bootstrap';
import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/userContext';

function Login() {
    const domain = import.meta.env.VITE_API_BASE_URL;

    const userIDref = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [_, setLoginStatus, __, setUserID] = useContext(userContext)!;
    
    const navigate = useNavigate();
    
    // ------------ Login User ------------
    function handleLogIn() {
        const userID = userIDref.current!.value;
        const password = passwordRef.current!.value;

        if (!userID || !password) {
            alert('Neither userID nor password should be empty!');
            return;
        }

        fetch(`${domain}/users/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID: userID,
                password: password
            }),
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                return res.json().then(data => { throw new Error(data.error) });
            }
        })
        .then(data => {
            alert(data.message);
            setLoginStatus(true);
            setUserID(userID);
            navigate("/");
        })
        .catch(error => {
            alert(`Failed to Log In! ${error}`);
        })
    }

    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h3 className="text-center mb-4">Login Page</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="userIDInput">
                    <Form.Label>userID</Form.Label>
                    <Form.Control ref={userIDref} placeholder="Enter your user ID" />
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="passwordInput">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Enter your password"
                    />
                  </Form.Group>
      
                  <div className="d-grid">
                    <Button variant="primary" onClick={() => handleLogIn()}>
                      Log In
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default Login;