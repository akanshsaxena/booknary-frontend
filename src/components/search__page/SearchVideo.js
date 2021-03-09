import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import BookCard from "../dashboard__page/BookCard";
import Section from "../dashboard__page/Section";
export default function Search() {
  const [bookData, setBookData] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get(
        `https://booknary-backend.herokuapp.com/api/books/get?category=null&language=null&authorId=null&bookId=null&searchText=${search}`
      );
      const data = await response.data;
      setBookData(data);
      console.log(data);
    };
    getVideos();
    console.log(bookData);
  }, []);
  return (
    <>
      <div className="section-container">
        <h3 style={{ color: "back" }}> Search results for "{search}" </h3>
        {bookData.length <= 0 ? (
          <p style={{ color: "red", marginTop: "20px" }}>
            {" "}
            Oops!No Result found for searched value{" "}
          </p>
        ) : (
          <div className="search-results">
            <div className="search-cards cards">
              {bookData.map((book) => (
                <NavLink className="book-card child" to={`/book/${book._id}`}>
                  <BookCard book={book} />
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
      <Section message="Try exploring other videos" />
    </>
  );
}
