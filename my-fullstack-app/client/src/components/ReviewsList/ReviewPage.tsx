import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import ReviewMessage from './ReviewMessage';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ReviewPage() {

    const { uniName, courseName } = useParams();
    const [commentData, setCommentData] = useState<any>([]);

    useEffect(() => {
        if (!uniName || !courseName) return;

        const decodedUni = decodeURIComponent(uniName);
        const decodedCourse = decodeURIComponent(courseName);

        // Now you can fetch course info and comments
        fetch(`http://localhost:3000/comments/${decodedUni}/${decodedCourse}`, {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            setCommentData(data);
        });
    }, [uniName, courseName]);
    
    const commentInput = useRef<any>(null);

    // also post comment to database
    function postComment() {
        fetch("http://localhost:3000/comments/postcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: commentInput.current.value
            }),
            credentials: 'include'
        });
    }

    //fetch data of userID, courseID?, content, and pass it on to ReviewMessage
    return <>
        <h3>Welcome to {uniName} {courseName}: Review Page!</h3>

        <Container>
            <Form.Label htmlFor='postcomment'>Post Comment!</Form.Label>
            <Form.Control id='postcomment' ref={commentInput}></Form.Control>
            <Button style={{marginTop: 10}} onClick={() => postComment()}>Post Comment!</Button>
        </Container>

        <Container fluid style={{marginTop: 25}}>
            <Row>
                {commentData?.map((comment: any) => <Col sm={12} md={6} lg={3}><ReviewMessage {...comment}/></Col>)}
            </Row>
        </Container>
    </>;
}

export default ReviewPage;