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

    return <>
        <h3>Register your account!</h3>

        <Form.Label htmlFor="userID">userID</Form.Label>
        <Form.Control id="userID" ref={userIDRef}></Form.Control>

        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control id="password" type="password" ref={passwordRef}></Form.Control>

        <Form.Label htmlFor="cPassword">Confirm Password</Form.Label>
        <Form.Control id="cPassword" type="password" ref={cPasswordRef}></Form.Control>

        <Button style={{ marginTop: 10 }} onClick={() => handleRegister()}>Register</Button>
    </>;
}

export default Register;