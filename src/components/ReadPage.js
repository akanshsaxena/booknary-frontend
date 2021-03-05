import React from "react";
import { useParams } from "react-router-dom";
import Main_Header from "./dashboard__page/Main_Header";
import Book from "./book__page/Book";

export default function ReadPage() {
  const { bookId } = useParams();
  return (
    <>
      <Main_Header />
      <Book bookId={bookId} />{" "}
    </>
  );
}
