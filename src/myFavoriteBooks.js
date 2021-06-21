import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import './myFavoriteBooks.css';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  
  constructor(props){
    super(props)
    this.state={
      booksArr:[],
      // showbooks:false,
    }
  }

  componentDidMount(){
    this.renderBooks();
  }
  
  renderBooks=async()=>{

    //localhost:3001/books?emailQuery=<email>
    let url =(`http://${process.env.REACT_APP_URL}/books?emailQuery=${this.props.userEmail}`);
    try{
      const books = await axios.get(url);
      this.setState({
        booksArr:books.data,
        // showbooks:true
      })
      console.log(this.state.booksArr);


    }
    catch{
      console.log('error in response');
      console.log(url);

    }
  };
  
  
  render() {
    
  
    return(
      <Carousel>
        {this.state.booksArr.map((element)=>{
          return(
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={element.imgURL}
      alt={element.name}
    />
    <Carousel.Caption>
      <h3>{element.name}</h3>
      <p>{element.description}</p>
      <p>{element.status}</p>
    </Carousel.Caption>
  </Carousel.Item>
          )
        })}
 
</Carousel>
    )
  }
}

export default MyFavoriteBooks;
