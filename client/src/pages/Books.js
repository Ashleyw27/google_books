import React, { useState, useEffect } from "react";
import SaveBtn from "../components/SaveBtn";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
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
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getApiBook()
      .then(res =>
        setBooks(res.data.items)
      )
      .catch(err => console.log(err));
  };

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
        setBooks(res.data.items)
      })
      .catch(err => console.log(err));
  };
  //  Use the API.saveBook method to save the book data
  //   Then reload books from the database
  function handleBookSave({id, title, author, synopsis, link, image}) {
    console.log(id, title, author, synopsis, link, image)

    API.saveBook({
      title: title,
      author: author,
      synopsis: synopsis,
      link: link,
      image: image
    })
      // .then(res => loadBooks())
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
                <ListItem key={book.id}>
                  <SaveBtn
                    onClick={() => handleBookSave({id: book.id, title: book.volumeInfo.title, author: book.volumeInfo.authors[0], synopsis: book.volumeInfo.description, link: book.volumeInfo.previewLink, image: book.volumeInfo.imageLinks.thumbnail})}
                  />
                  <br></br>
                  <Card
                    key={book.id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors}
                    synopsis={book.volumeInfo.description}
                    link={book.volumeInfo.previewLink}
                    image={book.volumeInfo.imageLinks.thumbnail}
                  />
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
