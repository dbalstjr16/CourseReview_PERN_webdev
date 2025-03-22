import { Card, Button } from 'react-bootstrap';

function ReviewMessage() {
    return <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
        <p>id: 123</p>
        <p>This course was fun!</p>
        <Button variant="secondary">delete</Button>
    </Card>;
};

export default ReviewMessage;