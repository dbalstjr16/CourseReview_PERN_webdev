import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type universityData = {
    id: number,
    uname: string,
    cname: string
};

function SearchPage(props: any) {
    
    // ----- Store Data -----
    const [universityCourseList, setUniversityCourseList] = useState<[universityData]>();

    //fetch data of university names and courses:
    useEffect(() => {
        fetch('http://localhost:3000/search/universityCourseName', {
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

    const filterdUniCourseList = universityCourseList?.filter(uData => 
        uData.uname.toLowerCase().includes(universityInput.toLowerCase()) && uData.cname.toLowerCase().includes(courseInput.toLowerCase()));

    return <>
        <h3>Search For University and Coursename</h3>
        <Form.Label htmlFor="uniInput">University Name</Form.Label>
        <Form.Control id="uniInput" value={universityInput} onChange={(e) => setUniversity(e.target.value)}></Form.Control>
        <Form.Label htmlFor="courseInput">Course Name</Form.Label>
        <Form.Control id="courseInput" value={courseInput} onChange={(e) => setCourse(e.target.value)}></Form.Control>
        
        <h4 style={{marginTop: 25}}>Search Result</h4>

        <ul>
            {filterdUniCourseList?.map((uni) => {

                const encodedUni = encodeURIComponent(uni.uname);
                const encodedCourse = encodeURIComponent(uni.cname);

                return (<li key={uni.id}>
                        <Link to={`/comments/${encodedUni}/${encodedCourse}`}>
                            {uni.uname} : {uni.cname}
                        </Link>
                    </li>);
            })}
        </ul>
    </>;
}

export default SearchPage;