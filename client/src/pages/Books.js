import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  // const [formObject, setFormObject] = useState({})
  const [bookSearch, setBookSearch] = useState("");

  // Load all books and store them with setBooks
  useEffect(() => {
    // loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getApiBook()
      .then(res =>
        setBooks(res.data.items)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { value } = event.target;
    setBookSearch(value)
  };

  const handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getApiBook(bookSearch)
      .then(res => {
        console.log(res)
         setBooks(res.data.items)})
      .catch(err => console.log(err));
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
            <h3>Search for and Save Books of Interest</h3>
          </Jumbotron>
          <form>
            <Input
              value={bookSearch}
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <FormBtn
              // disabled={!(formObject.title)}
              onClick={handleFormSubmit}
            >
              Submit Book
              </FormBtn>
          </form>
          <br></br>
          <br></br>
          <br></br>

            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <DeleteBtn 
                    onClick={() => deleteBook(book._id)} 
                    
                    />
                    <a href={book.volumeInfo.previewLink}/>
                    <Card 
                    title={book.volumeInfo.title} 
                    author={book.volumeInfo.authors} 
                    synopsis={book.volumeInfo.description} 
                    image={book.volumeInfo.imageLinks.thumbnail}
                    />


                    {/* <Link to={"/books/" + book._id}>
                                        <strong>
                                            {book.title} by {book.author}
                                        </strong>
                                    </Link> */}

                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}

        </Col>
      </Row>
    </Container>
  );
}


export default Books;
