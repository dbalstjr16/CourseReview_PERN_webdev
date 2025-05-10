import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SearchResult from './SearchResult';

type universityData = {
    id: number,
    uname: string,
    cname: string
};

function SearchPage() {
    const domain = import.meta.env.VITE_API_URL;

    // ----- Store Data -----
    const [universityCourseList, setUniversityCourseList] = useState<universityData[]>([]);

    // ----- Fetch and Store List of University and Course Names -----
    useEffect(() => {
        fetch(`${domain}/search/universityCourseName`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setUniversityCourseList(data);
            })
    }, []);

    // ----- Search Inputs -----
    const [universityInput, setUniversity] = useState<string>("");
    const [courseInput, setCourse] = useState<string>("");

    // ----- Filter UniversityCourseList Based on Search Inputs -----
    const filterdUniCourseList = universityCourseList?.filter(uData =>
        uData.uname.toLowerCase().includes(universityInput.toLowerCase()) && uData.cname.toLowerCase().includes(courseInput.toLowerCase()));

        return (
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card shadow p-4">
                    <h3 className="text-center mb-4">Search for University and Course</h3>
                    <Form>
                      <Form.Group className="mb-3" controlId="uniInput">
                        <Form.Label>University Name</Form.Label>
                        <Form.Control
                          value={universityInput}
                          onChange={(e) => setUniversity(e.target.value)}
                          placeholder="e.g. KAIST"
                        />
                      </Form.Group>
          
                      <Form.Group className="mb-3" controlId="courseInput">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                          value={courseInput}
                          onChange={(e) => setCourse(e.target.value)}
                          placeholder="e.g. CS537"
                        />
                      </Form.Group>
                    </Form>
          
                    <h4 className="text-center mt-5">Search Result</h4>
                    <SearchResult
                      filterdUniCourseList={filterdUniCourseList}
                      universityInput={universityInput}
                      courseInput={courseInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
          
}

export default SearchPage;