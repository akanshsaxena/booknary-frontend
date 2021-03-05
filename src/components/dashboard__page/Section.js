import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swiper from "swiper";
import { NavLink } from "react-router-dom";
export default function Section(props) {
  const { authorId, bookId, searchText, heading } = props;
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("all");
  const [language, setLanguage] = useState("All");
  const [noBooks, setNoBooks] = useState(true);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  useEffect(() => {
    const getBooks = async () => {
      setNoBooks(false);
      const response = await axios.get(
        `https://booknary-backend.herokuapp.com/api/books/get?category=${category}&language=${language}&authorId=null&bookId=null&searchText=null`
      );
      const data = await response.data;
      setBooks(data);
      if (data.length == 0) {
        setNoBooks(true);
      }
    };
    getBooks();
  }, [category]);

  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  return (
    <div className="section">
      <div className="filter-container">
        <h4 style={{ padding: "5px" }}>Filter By</h4>
        <div class="filter-inner-container">
          <div id="category">
            <label class="label">
              Category <br />
              <select name="category" value={category} onChange={handleChange}>
                <option value="all"> All </option>
                <option value="Action and Adventure">
                  {" "}
                  Action and adventure{" "}
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
            <label class="label">
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
              <img className="item_img" src={book.thumbnailImg} />
              <div className="item_details_container">
                <h4 className="item_title"> {book.title} </h4>
                <div className="item_div1">
                  <p className="item_author"> {book.author} </p>
                  <p className="item_category category">{book.category}</p>
                </div>
                <div className="item_div2">
                  <p className="item_read_time">{book.readTime}</p>
                  <p className="item_read_votes">
                    {" "}
                    {book.votes > 0 && `${book.votes} vote(s)`}
                  </p>
                </div>
              </div>
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
