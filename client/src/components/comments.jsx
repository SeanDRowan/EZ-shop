import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const CommentForm = ()  => {
    return (
      <Form>
    
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Leave us a comment about this product</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary">Submit</Button>
      </Form>
    );
  }
  
  export default CommentForm;