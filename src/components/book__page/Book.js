import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFObject } from "react-pdfobject";
import "font-awesome/css/font-awesome.min.css";
import ViewBook from "./ViewBook";

import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Book(props) {
  const { bookId } = props;
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [bookInfo, setBookInfo] = useState({
    author: "",
    authorId: "",
    category: "",
    description: "",
    language: "",
    pdfLink: "",
    readTime: "",
    thumbnailImg: "",
    title: "",
    votes: "",
    __v: 0,
    _id: "",
  });
  useEffect(() => {
    const getBookInfo = async () => {
      const response = await axios.get(
        `https://booknary-backend.herokuapp.com/api/books/get?category=null&language=null&authorId=null&bookId=${bookId}&searchText=null`
      );
      const data = await response.data;
      setBookInfo({
        author: data[0].author,
        authorId: data[0].authorId,
        category: data[0].category,
        description: data[0].description,
        language: data[0].language,
        pdfLink: data[0].pdfLink,
        readTime: data[0].readTime,
        thumbnailImg: data[0].thumbnailImg,
        title: data[0].title,
        votes: data[0].votes,
        __v: data[0].__v,
        _id: data[0]._id,
      });

      const liked = parseInt(data[0].votes);
      setLikes(liked);
    };

    const data = getBookInfo();
  }, []);

  const increaseLike = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://booknary-backend.herokuapp.com/api/books/votes",
        {
          bookId: bookInfo._id,
        }
      );
      const data = await response.data;
      setLikes((like) => like + 1);
      console.log(bookInfo.votes);
    } catch (err) {
      console.log(err);
    }
  };
  const BookDesc = () => {
    return (
      <div className="book_page_desc_container">
        <div className="book__details__container">
          <img src={bookInfo.thumbnailImg} />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsClicked(true);
            }}
            className="book_page_show_book btn"
          >
            Start Reading
          </button>
        </div>
        <div className="book_page_container1">
          <h2 style={{ fontSize: "2rem" }}>{bookInfo.title}</h2>
          <h5 style={{ fontSize: "1.5rem", color: "grey" }}>
            By: {bookInfo.author}
          </h5>
          <button className="btn_like" onClick={increaseLike}>
            {likes === 0 && "Be the first one to "}Like
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <p>{likes} like(s)</p>

            <p>{bookInfo.readTime}</p>
          </div>

          <h3>Description</h3>
          <h4 style={{ fontWeight: "normal", margin: "5px 0" }}>
            {bookInfo.description}
          </h4>
        </div>
      </div>
    );
  };
  return (
    <div className="book_page_container">
      {!isClicked ? (
        <>
          <BookDesc />
        </>
      ) : (
        <>
          <div
            className="read_book"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              style={{ alignSelf: "flex-start", marginLeft: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                setIsClicked(false);
              }}
              className="btn_like"
            >
              {`  < Go Back`}
            </button>

            <ViewBook pdfLink={bookInfo.pdfLink} />
          </div>
        </>
      )}
    </div>
  );
}

/*
// <PDFObject
          //   url={bookInfo.pdfLink}
          //   width="800px"
          //   height="80vh"
          //   page="1"
          // />
          
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl={bookInfo.pdfLink} />
          </Worker>*/
