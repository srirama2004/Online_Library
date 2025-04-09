import React from "react";
import BookInfo from "../Components/book_description/BookInfo";
import Menum from "./Menum";
const BookDescription = (props) => {
  return (
    <div>
       <Menum></Menum>
      <BookInfo></BookInfo>
    </div>
  );
};

export default BookDescription;
