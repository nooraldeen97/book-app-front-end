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
      showbooksAfterAdd:false,
    }
  }

  componentDidMount(){
    this.renderBooks();
  }
  
  renderBooks=async()=>{

    //localhost:3001/books?emailQuery=<email>
    let url =(`${process.env.REACT_APP_URL}/books?emailQuery=${this.props.auth0.user.email}`);
    try{
      const books = await axios.get(url);
      this.setState({
        booksArr:books.data,
      showbooksAfterAdd:true,

      })
      // console.log(this.state.booksArr);


    }
    catch{
      console.log('error in response');
      console.log(url);

    }
  };

  addBookHandler=async(event)=>{
    event.preventDefault();
    // let bookName=event.target.bookName.value;
    // let description=event.target.bookDesc.value;
    // let status=event.target.bookStatus.value;
    // let email = this.props.auth0.user.email;
    // console.log(bookName,description,status)

   const  addBook={
      bookName:event.target.bookName.value,
      description:event.target.bookDesc.value,
      status:event.target.bookStatus.value,
      email : this.props.auth0.user.email,
    }
  
      const addedBook = await axios.post(`${process.env.REACT_APP_URL}/books`,addBook)
  
      this.setState({
        booksArr:addedBook.data,
      })
  }


  deleteCardHandler= async (index)=>{
    const email= {email:this.props.auth0.user.email}
    let id = this.state.booksArr[index]._id;
    // console.log(email)
    try{
    let newBookArr= await axios.delete(`${process.env.REACT_APP_URL}/books/${id}`,{params:email})

    this.setState({
      booksArr:newBookArr.data 
    })
    }
    catch{
      console.log('error in delete books')
    }
  }

  
  render() {
    
  
    return(
      
            <BestBooks 
            deleteCardHandler={this.deleteCardHandler}
            booksArr={this.state.booksArr}
            addBookHandler={this.addBookHandler}
            showbooksAfterAdd={this.state.showbooksAfterAdd}
            />
   
    )
  }
}

export default withAuth0(MyFavoriteBooks);
