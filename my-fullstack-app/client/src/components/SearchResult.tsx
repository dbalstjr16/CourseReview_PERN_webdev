import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

type UniversityData = {
    id: number;
    uname: string;
    cname: string;
};

type SearchResultProps = {
    filterdUniCourseList: UniversityData[];
    universityInput: string;
    courseInput: string;
};

function SearchResult(props: SearchResultProps) {
    const { filterdUniCourseList, universityInput, courseInput } = props;

    useEffect(() => {
        setCurrentPage(1);
    }, [universityInput, courseInput]);

    const ITEMS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil((filterdUniCourseList?.length || 0) / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedList = filterdUniCourseList?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const PAGES_PER_CHUNK = 5;
    const currentChunk = Math.floor((currentPage - 1) / PAGES_PER_CHUNK);
    const startPage = currentChunk * PAGES_PER_CHUNK + 1;
    const endPage = Math.min(startPage + PAGES_PER_CHUNK - 1, totalPages);

    function renderChunkedPaginationItems() {
        const items = [];

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return items;
    }

    return (
        <>
          <Container fluid className="mt-4">
            <Row>
              {paginatedList?.map((uni: UniversityData) => {
                const encodedUni = encodeURIComponent(uni.uname);
                const encodedCourse = encodeURIComponent(uni.cname);
      
                return (
                  <Col key={uni.id} sm={12} md={6} lg={4} xl={3}>
                    <Link
                      to={`/comments/${encodedUni}/${encodedCourse}`}
                      className="text-decoration-none"
                      style={{ color: "inherit" }}
                    >
                      <Card className="hover-card m-2 p-3 text-center shadow-sm">
                        <Card.Body>
                          <Card.Title className="fs-6">{uni.uname}</Card.Title>
                          <Card.Text>{uni.cname}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Container>
      
          <Pagination className="justify-content-center my-4">
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
      
            {renderChunkedPaginationItems()}
      
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      );
      
}

export default SearchResult;