import { Form, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { useNavigate  } from 'react-router-dom';

function Register() {
    const domain = import.meta.env.VITE_API_BASE_URL;

    const userIDRef = useRef<HTMLInputElement>(null)!;
    const passwordRef = useRef<HTMLInputElement>(null);
    const cPasswordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // -------------- Register User --------------
    function handleRegister() {
        const userID = userIDRef.current!.value;
        const password = passwordRef.current!.value;
        const cPassword = cPasswordRef.current!.value;

        if (!userID || !password || !cPassword) {
            alert('All Fields should not be empty!');
            return;
        }
        if (password !== cPassword) {
            alert('Password and confirm password do not match, please try again.');
            return;
        }

        fetch(`${domain}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                userID: userID,
                password: password
            }),
            credentials: "include"
        })
        .then(res => {
            if (res.ok) { return res.json(); }
            else { return res.json().then(data => { throw new Error(data.error) }); }
        })
        .then(data => {
            alert(data.message);
            navigate("/");
        })
        .catch(error => {
            alert(error);
        })
    }

    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h3 className="text-center mb-4">Register your account!</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="userID">
                    <Form.Label>userID</Form.Label>
                    <Form.Control ref={userIDRef} placeholder="Choose a user ID" />
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Enter a password"
                    />
                  </Form.Group>
      
                  <Form.Group className="mb-4" controlId="cPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={cPasswordRef}
                      placeholder="Re-enter your password"
                    />
                  </Form.Group>
      
                  <div className="d-grid">
                    <Button variant="success" onClick={() => handleRegister()}>
                      Register
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default Register;