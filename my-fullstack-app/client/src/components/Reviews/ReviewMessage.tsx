import { Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import userContext from '../../context/userContext';

function ReviewMessage(props: any) {
    const { userid, content, created_at } = props;
    const [_, __, loggedIn_userID, ___] = useContext(userContext)!;

    const isOwner = props.userid === loggedIn_userID; /***** */

    return <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
        <p><strong>userID</strong>: {userid}</p>
        <p>{content}</p>
        <p>{created_at}</p>

        {isOwner ? 
        <Button variant="secondary" onClick={() => props.deleteComment(props.id)}>delete</Button>
        : 
        <></>
        }
    </Card>;
};

export default ReviewMessage;