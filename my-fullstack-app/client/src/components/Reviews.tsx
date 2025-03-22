import { Form } from 'react-bootstrap';
import SelectUniCourse from './ReviewsList/SelectUniCourse';

function Reviews(props: any) {
    
    // guide the user to first search for university
    // https://github.com/Hipo/university-domains-list-api
    // pagination only so that only few appear
    return <>
        <h3>Search For University and Coursename</h3>
        <Form.Label>University Name</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label>Course Name</Form.Label>
        <Form.Control></Form.Control>
        
        <SelectUniCourse></SelectUniCourse>
    </>;
}

//based on search result, if user clicks on the link, go to that link and load that new component

export default Reviews;