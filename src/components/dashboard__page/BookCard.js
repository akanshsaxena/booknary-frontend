import React from "react";

export default function BookCard(props) {
  const { book } = props;
  return (
    <>
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
            {book.votes > 0 && `${book.votes} like(s)`}
          </p>
        </div>
      </div>
    </>
  );
}
