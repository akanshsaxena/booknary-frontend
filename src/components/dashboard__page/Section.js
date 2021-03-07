import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import BookCard from "./BookCard";

export default function Section(props) {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");
  const [noBooks, setNoBooks] = useState(true);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setCategory(e.target.value);
    } else {
      setLanguage(e.target.value);
    }
  };
  useEffect(() => {
    const getBooks = async () => {
      setNoBooks(false);
      const response = await axios.get(
        `https://booknary.herokuapp.com/api/books/get?category=${category}&language=${language}&authorId=&bookId=&searchText=`
      );
      const data = await response.data;
      setBooks(data);
      if (data.length == 0) {
        setNoBooks(true);
      }
    };
    getBooks();
  }, [category, language]);

  return (
    <div className="section">
      <div className="filter-container">
        <h4 style={{ padding: "5px" }}>Filter By</h4>
        <div className="filter-inner-container">
          <div id="category">
            <label className="label">
              Category <br />
              <select name="category" value={category} onChange={handleChange}>
                <option value="All"> All </option>
                <option value="Action and Adventure">
                  Action and adventure
                </option>
                <option value="Chick lit"> Chick lit </option>
                <option value="Business/economics"> Business/economics </option>
                <option value="Children's"> Children's </option>
                <option value="Cookbook"> Cookbook </option>
                <option value="Comic book"> Comic book </option>
                <option value="Diary"> Diary </option>
                <option value="Coming-of-age"> Coming-of-age </option>
                <option value="Crime"> Crime </option>
                <option value="Encyclopedia"> Encyclopedia </option>
                <option value="Drama"> Drama </option>
                <option value="Guide"> Guide </option>
                <option value="Fairytale"> Fairytale </option>
                <option value="Health/fitness"> Health / fitness </option>
                <option value="Fantasy"> Fantasy </option>
                <option value="History"> History </option>
                <option value="Humor"> Humor </option>
                <option value="Horror"> Horror </option>
                <option value="Mystery"> Mystery </option>
                <option value="Poetry"> Poetry </option>
                <option value="Romance"> Romance </option>
                <option value="Sports"> Sports </option>
                <option value="Others"> Others </option>
              </select>
            </label>
          </div>
          <div id="language">
            <label className="label">
              Language <br />
              <select name="language" value={language} onChange={handleChange}>
                <option value="All"> All </option>
                <option value="Hindi"> Hindi </option>
                <option value="English"> English </option>
                <option value="Others"> Others </option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="section_container">
        <h3> {category} </h3>
        <div className="cards">
          {books.map((book) => (
            <NavLink className="book-card child" to={`/book/${book._id}`}>
              <BookCard book={book} />
            </NavLink>
          ))}
        </div>
        {noBooks && (
          <h3 style={{ color: "red" }}>
            No results found. Try exploring other filters.
          </h3>
        )}
      </div>
    </div>
  );
}
