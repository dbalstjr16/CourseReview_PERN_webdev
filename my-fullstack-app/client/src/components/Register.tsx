import { Form, Button } from 'react-bootstrap';

function Register(props: any) {
    
    return <>
        <h3>Register your account!</h3>
        <Form.Label>userID</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label>Password</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control></Form.Control>
        <Button style={{ marginTop: 10 }}>Register</Button>
    </>;
}

export default Register;