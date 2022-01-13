import React from "react";
import StarRating from "react-star-ratings";

export const ShowAverage = (p) => {
  if (p && p.ratings) {
    let ratingArray = p && p.ratings;
    let total = [];
    let ratingLength = ratingArray.length;

    ratingArray.map((r) => total.push(r.star));
    let totalReduce = total.reduce((p, n) => p + n, 0);

    let highest = ratingLength * 5;

    let result = (totalReduce * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="30px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
          />
          {p.ratings.length}
        </span>
      </div>
    );
  }
};
