import { Card, Button } from 'react-bootstrap';

function ReviewMessage(props: any) {
    const { userid, content, created_at } = props;

    return <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
        <p><strong>userID</strong>: {userid}</p>
        <p>{content}</p>
        <p>{created_at}</p>
        <Button variant="secondary">delete</Button>
    </Card>;
};

export default ReviewMessage;