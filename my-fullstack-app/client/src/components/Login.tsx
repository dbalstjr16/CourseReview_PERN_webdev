import { Form, Button } from 'react-bootstrap';
import { useRef, useState } from 'react';

function Login(props: any) {
    const userIDref = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    function handleLogIn() {
        const userID = userIDref.current?.value;
        const password = passwordRef.current?.value;

        if (!userID || !password) {
            alert('Neither userID nor password should be empty!');
            return;
        }

        // send API request to backend
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID: userID,
                password: password
            }),
            credentials: 'include'
        })
        .then(res => res.json()) // parse to JS object
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(`Failed to Log In! ${error}`);
        })
    }

    return <>
    <h3>Login Page</h3>
    <Form.Label htmlFor="userIDInput">userID</Form.Label>
    <Form.Control id="userIDInput" ref={userIDref}></Form.Control>
    <Form.Label htmlFor="passwordInput">Password</Form.Label>
    <Form.Control id="passwordInput" type="password" ref={passwordRef}></Form.Control>
    <Button style={{marginTop: 10}} onClick={() => handleLogIn()}>Log In</Button>
    </>;
}

export default Login;