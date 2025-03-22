import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import ReviewMessage from './ReviewMessage';

function ReviewPage() {
    return <>
        <h3>Welcome to University of Wisconsin-Madison CS 537: Review Page!</h3>

        <Container>
            <Form.Label>Comment</Form.Label>
            <Form.Control></Form.Control>
            <Button style={{marginTop: 10}}>Post Comment!</Button>
        </Container>

        <Container fluid style={{marginTop: 25}}>
            <Row>
                <Col sm={12} md={6} lg={3}><ReviewMessage /></Col>
                <Col sm={12} md={6} lg={3}><ReviewMessage /></Col>
                <Col sm={12} md={6} lg={3}><ReviewMessage /></Col>
                <Col sm={12} md={6} lg={3}><ReviewMessage /></Col>
                <Col sm={12} md={6} lg={3}><ReviewMessage /></Col>
            </Row>
        </Container>
    </>;
}

export default ReviewPage;