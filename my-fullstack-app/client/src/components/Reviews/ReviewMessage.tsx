import { Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import userContext from '../../context/userContext';

function ReviewMessage(props: any) {
    const { userid, content, created_at } = props;
    const [_, __, loggedIn_userID, ___] = useContext(userContext)!;

    const isOwner = props.userid === loggedIn_userID; /***** */

    return (
      <Card
        className="m-3 p-3 shadow-sm rounded"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #dee2e6"
        }}
      >
        <p className="mb-1 text-secondary" style={{ fontSize: "0.9rem" }}>
          <strong>User:</strong> {userid}
        </p>
        <p className="mb-2" style={{ fontSize: "1rem", whiteSpace: "pre-line", color: "#333" }}>
          {content}
        </p>
        <p className="text-end text-muted" style={{ fontSize: "0.8rem" }}>
          {new Date(created_at).toLocaleString()}
        </p>
    
        {isOwner && (
          <div className="text-end mt-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => props.deleteComment(props.id)}
            >
              🗑 Delete
            </Button>
          </div>
        )}
      </Card>
    );
    
    
    
      
};

export default ReviewMessage;