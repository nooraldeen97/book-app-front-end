import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,CardColumns,Button,Modal,Form} from 'react-bootstrap/';


class BestBooks extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show:false 
    }
  }


  handleModal=()=>{
    this.setState({
      show:true
    })
  }

  handleClose=()=>{
    this.setState({
      show:false
    })
  }

  addBookHandler=(event)=>{
    event.preventDefault();
    let bookName=event.target.bookName.value;
    let description=event.target.bookDesc.value;
    let status=event.target.bookStatus.value;
    console.log(bookName,description,status)



  }
    render(){
        return(
          <>
    <CardColumns>
        {this.props.booksArr.map((element)=>{
          return(
            <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{element.name}</Card.Title>
          <Card.Text>
           {element.description}
          </Card.Text>  
          <Card.Text>
           {element.status}
          </Card.Text>
          <Button variant="primary">Delete</Button>
          </Card.Body>
        </Card>
          )
      })}
    </CardColumns>
    <Button variant="primary" onClick={this.handleModal}>Add Book</Button>

  <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <Form onSubmit={this.addBookHandler}>
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
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
   </Modal>
    </>

        )
    }
}


export default BestBooks;