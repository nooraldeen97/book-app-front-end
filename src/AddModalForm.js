import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap/';


class ModalForm extends React.Component{
    render(){
        return(

            
  <Modal show={this.props.show} onHide={this.props.ButtonhandleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Book</Modal.Title>
  </Modal.Header>
  <Modal.Body>
<Form onSubmit={(e)=>{this.props.addBookHandler(e)}}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Book Name</Form.Label>
    <Form.Control type="text" placeholder="Enter the book name" name="bookName" />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>description</Form.Label>
    <Form.Control type="text" placeholder="description" name="bookDesc" />
  </Form.Group>
  <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>Status</Form.Label>
    <Form.Control as="select" custom  name="bookStatus">
      <option>Life is life</option>
      <option>smile big even you fake it</option>
      <option>deep breath , be confident</option>
    </Form.Control>
  </Form.Group>
  <Button variant="primary" type="submit">
    Add
  </Button>
</Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={this.props.handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
        )
    }
}

export default ModalForm;