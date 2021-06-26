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
      showUpdate:false,
      index:0,
      bookName: '',
      description:'',
      status: ''
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
    try{
    let newBookArr= await axios.delete(`${process.env.REACT_APP_URL}/books/${id}`,{params:email})

    this.setState({
      booksArr:newBookArr.data 
    })
    }
    catch{
      // console.log(newBookArr)
      console.log('error in delete books')
    }
  }

  handleCloseUpadate=()=>{
    this.setState({
      showUpdate:false
    })
  }

  //this fuction will change the showupdate to show us the update modal and we passed the index to pass a data for input field which is (book name , description , status)
  showUpdateModal=(idx)=>{
    this.setState({
      showUpdate:true,
      index:idx,
      bookName: this.state.booksArr[idx].name,
      description:this.state.booksArr[idx].description,
      status: this.state.booksArr[idx].status
    })
  }

  UpdateBookHandler=async(event)=>{
    event.preventDefault();
    const id = this.state.booksArr[this.state.index]._id
    const booksData={
      index:this.state.index,
      bookName:event.target.bookName.value,
      description:event.target.desc.value,
      status:event.target.sta.value,
      email:this.props.auth0.user.email
    }
    const newArr = await axios.put(`${process.env.REACT_APP_URL}/books/${id}`,booksData);
    //dont miss that you have to write (data) after the newArr that come from the server 
    this.setState({
      booksArr:newArr.data
    })

  }

  updateName=(e)=>{
    this.setState({
      bookName:e.target.value
    })
  };

  updateDescription=(e)=>{
    this.setState({
      description:e.target.value
    })
  }

  updateStatus=(e)=>{
    this.setState({
      status:e.target.value
    })
  }
  
  render() {
    
  
    return(
      
            <BestBooks 
            deleteCardHandler={this.deleteCardHandler}
            booksArr={this.state.booksArr}
            addBookHandler={this.addBookHandler}
            showbooksAfterAdd={this.state.showbooksAfterAdd}
            showUpdate={this.state.showUpdate}
            handleCloseUpadate={this.handleCloseUpadate}
            showUpdateModal={this.showUpdateModal}
            bookName={this.state.bookName}
            description={this.state.description}
            status={this.state.status}
            updateName={this.updateName}
            updateDescription={this.updateDescription}
            updateStatus={this.updateStatus}
            UpdateBookHandler={this.UpdateBookHandler}
            />
   
    )
  }
}

export default withAuth0(MyFavoriteBooks);
