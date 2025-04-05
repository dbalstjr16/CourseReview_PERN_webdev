import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import ReviewMessage from './ReviewMessage';
import { useRef, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import userContext from '../../context/userContext';

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
    const domain = `${import.meta.env.VITE_API_BASE_URL}`;

    const { uniName, courseName } = useParams();
    const [___, _, userID, __] = useContext(userContext)!;
    const [courseId, setCourseId] = useState<number | null>(null);
    const [commentData, setCommentData] = useState<CommentData[]>([]);

    const commentInput = useRef<HTMLTextAreaElement>(null);

    // ----- Get CourseID -----
    useEffect(() => {
        fetch(`${domain}/search/getCourseID/${courseName}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => {
                if (res.ok) return res.json();
                else { return res.json().then((data) => { throw new Error(data.error) }) };
            })
            .then(data => { setCourseId(data.id) })
            .catch(error => alert(error));
    }, []);

    // ----- Function to Retrieve List of Comments -----
    function fetchComments() {
        if (!uniName || !courseName) return;

        const decodedUni = decodeURIComponent(uniName);
        const decodedCourse = decodeURIComponent(courseName);

        fetch(`${domain}/comments/${decodedUni}/${decodedCourse}`, {
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
        if (commentInput.current?.value == "") {
            alert('Empty post is not allowed!');
            return;
        }
        fetch(`${domain}/comments/postcomment`, {
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
                else return res.json().then(data => { throw new Error(data.error) });
            })
            .then(data => {
                alert(data.message);
                commentInput.current!.value = "";
                fetchComments();
            })
            .catch(error => alert(error));
    };

    // ----- Delete Comment on to Review Page, Update Review Page -----
    function deleteComment(commentID: number) {
        fetch(`${domain}/comments/deletecomment`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: commentID
            }),
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed To Delete Post');
                else { return res.json() }
            })
            .then(data => {
                alert(data.message);
                fetchComments();
            })
            .catch(error => alert(error.message));
    }

    return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">
            Welcome to {uniName} {courseName}: Review Page!
          </h3>

          <Form>
            <Form.Group controlId="postcomment" className="mb-3">
              <Form.Label>Post a Comment</Form.Label>
              <Form.Control
                ref={commentInput}
                as="textarea"
                rows={3}
                placeholder="Share your thoughts about the course..."
              />
            </Form.Group>
            <div className="d-grid d-md-flex justify-content-md-end">
              <Button onClick={() => postComment()}>Post Comment</Button>
            </div>
          </Form>

          <hr className="my-4" />

          {commentData.length > 0 ? (
            <Container fluid>
              <Row>
                {commentData.map((comment: CommentData) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={comment.id}>
                    <ReviewMessage {...comment} deleteComment={deleteComment} />
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            <p className="text-center mt-4 text-muted">
              No comments have been added to this course yet. Be the first to share your thoughts! 😊
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default ReviewPage;