import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import userContext from '../context/userContext';

function AboutPage() {
  const [loginStatus, _, userID, __] = useContext(userContext)!;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h2 className="mb-3 text-center">About This Platform</h2>
              <p>
              This web application enables university students to explore and review academic courses. Users can search by university and course title, read insights shared by fellow students, and contribute their own feedback based on personal experience.
              </p>

              <p>
                It was built using <strong>React + TypeScript</strong> for the frontend and
                <strong> Express.js</strong> for the backend, with PostgreSQL as the database.
              </p>

              <hr />

              {loginStatus ? (
                <p className="text-success">
                  ✅ You are logged in as <strong>{userID}</strong>. 😊
                </p>
              ) : (
                <p className="text-danger">❌ You are not logged in yet. 😢</p>
              )}

              <hr />

              <p className="text-muted text-center" style={{ fontSize: "0.9rem" }}>
                Built by Minsuk You. Contact: dbalstjr16@gmail.com
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
