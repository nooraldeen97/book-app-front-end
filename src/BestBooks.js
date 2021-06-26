import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,CardColumns,Button,Modal,Form} from 'react-bootstrap/';
import ModalForm from './AddModalForm';

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

 
 

  



    render(){
        return(
          <>
    <CardColumns>
        {this.props.showbooksAfterAdd && this.props.booksArr.map((element,idx)=>{
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
          <Button variant="primary" onClick={()=>{this.props.deleteCardHandler(idx)}}>Delete</Button>
          <Button variant="primary" onClick={()=>{this.props.showUpdateModal(idx)}}>Update</Button>
          </Card.Body>
        </Card>
          )
      })}
    </CardColumns>
    <Button variant="primary" onClick={this.handleModal}>Add Book</Button>

      <ModalForm
      show={this.state.show}
      handleClose={this.handleClose}
      addBookHandler={this.props.addBookHandler}
      />

<Modal show={this.props.showUpdate} onHide={this.props.handleCloseUpadate}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Book</Modal.Title>
  </Modal.Header>
  <Modal.Body>
<Form onSubmit={(e)=>{this.props.UpdateBookHandler(e)}}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Book Name</Form.Label>
    <Form.Control type="text" placeholder="Enter the book name" onChange={(e)=>this.props.updateName(e)} name="bookName" value={this.props.bookName}/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>description</Form.Label>
    <Form.Control type="text" placeholder="description" onChange={(e)=>this.props.updateDescription(e)} name="desc" value={this.props.description} />
  </Form.Group><Form.Group controlId="formBasicPassword">
    <Form.Label>status</Form.Label>
    <Form.Control type="text" placeholder="description" onChange={(e)=>this.props.updateStatus(e)} name="sta" value={this.props.status} />
  </Form.Group>
  <Button variant="primary" type="submit" onClick={this.props.handleCloseUpadate}>
    Update
  </Button> 
</Form>
  </Modal.Body>
  <Modal.Footer>
  </Modal.Footer>
</Modal>
    </>

        )
    }
}


export default BestBooks;