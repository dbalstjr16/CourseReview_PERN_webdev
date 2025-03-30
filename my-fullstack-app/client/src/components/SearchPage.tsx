import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Container, Col, Pagination } from 'react-bootstrap';
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

    return <>
        <h3>Search For University and Coursename</h3>
        <Form.Label htmlFor="uniInput">University Name</Form.Label>
        <Form.Control id="uniInput" value={universityInput} onChange={(e) => setUniversity(e.target.value)}></Form.Control>
        <Form.Label htmlFor="courseInput">Course Name</Form.Label>
        <Form.Control id="courseInput" value={courseInput} onChange={(e) => setCourse(e.target.value)}></Form.Control>

        <h4 style={{ marginTop: 40, textAlign: 'center' }}>Search Result</h4>

        <SearchResult filterdUniCourseList={filterdUniCourseList} universityInput={universityInput} courseInput={courseInput} />
    </>;
}

export default SearchPage;