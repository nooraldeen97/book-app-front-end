import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';


class BestBooks extends React.Component{
    render(){
        return(
            <Carousel>
        {this.props.booksArr.map((element)=>{
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


export default BestBooks;