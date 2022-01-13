import React from "react";
import StarRating from "react-star-ratings";
const Star = ({ starClick, numberOfStars }) => {
  return (
    <>
      <StarRating
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starEmptyColor="red"
        starHoverColor="red"
        starSpacing="2px"
      />
      <br />
    </>
  );
};

export default Star;
