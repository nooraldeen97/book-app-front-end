import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import './myFavoriteBooks.css';
import axios from 'axios';
import BestBooks from './BestBooks';

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
    let url =(`http://${process.env.REACT_APP_URL}/books?emailQuery=${this.props.auth0.user.email}`);
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
      
            <BestBooks 
            booksArr={this.state.booksArr}
            />
   
    )
  }
}

export default withAuth0(MyFavoriteBooks);
