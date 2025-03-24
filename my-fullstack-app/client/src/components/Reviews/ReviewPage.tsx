import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import ReviewMessage from './ReviewMessage';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type CommentData = {
    id: number,
    name: string, // course name
    university_id: number,
    userid: string,
    courseid: number,
    content: string,
    created_at: Date
}

function ReviewPage() {
    const { uniName, courseName } = useParams();
    const [userID, setUserID] = useState<string>("");
    const [courseId, setCourseId] = useState<number | null>(null);
    const [commentData, setCommentData] = useState<CommentData[]>([]);

    const commentInput = useRef<HTMLInputElement>(null);

    // ----- Get UserID -----
    useEffect(() => {
        fetch('http://localhost:3000/users/me', {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setUserID(data.userID.userID))
        .catch(error => console.error(`Error fetching userID: ${error}`))
    }, [])

    // ----- Get CourseID -----
    useEffect(() => {
        fetch(`http://localhost:3000/search/getCourseID/${courseName}`, {
            method: "GET",
            credentials: "include"
        })
        .then(res => {
            if (res.ok) return res.json();
            else {return res.json().then((data) => {throw new Error(data.error)})};
        })
        .then(data => {setCourseId(data.id)})
        .catch(error => alert(error));
    }, []);

    // ----- Function to Retrieve List of Comments -----
    function fetchComments() {
        if (!uniName || !courseName) return;

        const decodedUni = decodeURIComponent(uniName);
        const decodedCourse = decodeURIComponent(courseName);

        fetch(`http://localhost:3000/comments/${decodedUni}/${decodedCourse}`, {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            setCommentData(data);
        });
    }

    // ----- Get List of Comments -----
    useEffect(() => {
        fetchComments();
    }, [uniName, courseName]);
    
    // ----- Post Comment on to Review Page, Update Review Page -----
    function postComment() {
        fetch("http://localhost:3000/comments/postcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: userID,
                courseid: courseId,
                content: commentInput.current!.value
            }),
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) return res.json();
            else return res.json().then(data => {throw new Error(data.error)} );
        })
        .then(data => {
            alert(data.message);
            commentInput.current!.value = "";
            fetchComments();
        })
        .catch(error => alert(error));
    };

    return <>
        <h3>Welcome to {uniName} {courseName}: Review Page!</h3>

        <Container>
            <Form.Label htmlFor='postcomment'>Post Comment!</Form.Label>
            <Form.Control id='postcomment' ref={commentInput}></Form.Control>
            <Button style={{marginTop: 10}} onClick={() => postComment()}>Post Comment!</Button>
        </Container>

        <Container fluid style={{marginTop: 25}}>
            <Row>
                {commentData?.map((comment: CommentData) => 
                <Col sm={12} md={6} lg={3} key={comment.id}>
                    <ReviewMessage {...comment}/> 
                    </Col>)}
            </Row>
        </Container>
    </>;
}

export default ReviewPage;