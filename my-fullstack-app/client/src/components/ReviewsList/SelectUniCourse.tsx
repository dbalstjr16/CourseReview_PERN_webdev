import { Container, Row, Col } from 'react-bootstrap';

function SelectUniCourse() {

    // instead of href, i should probably use useNavigate to handle requests
    // or call <SelectCourse name={universityname} />  
    return <>
        <h4 style={{marginTop: 25}}>Search Result</h4>
        
        <ul>
            <li><a href="http://localhost:5173/reviews/reviewPage">University of Wisconsin-Madison: CS 537</a></li>
            <li>University of Wisconsin-Madison: CS 577</li>
            <li>University of Wisconsin-Madison: CS 540</li>
        </ul>
    </>;
}

// we will generate course list based on data so it won't be big problem
// pass down or send value of university name to search in database!!!!

export default SelectUniCourse;