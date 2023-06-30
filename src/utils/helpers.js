// filter out titles without a poster path or vote average
export const filterResults = (resultsArr) => {
  return resultsArr.filter(
    (result) => result.poster_path && result.vote_average
  );
};

// limit results
export const limitResults = (data, limit) => {
  let results; 

  if (limit) {
    results = data.slice(0, limit);
  } else {
    results = data;
  }

  return results;
}

// calculate rating percentage
export const setPercentRating = (voteAvg) => Math.floor(voteAvg * 10);

// create rating badge based on rating percentage
export const setRatingBadge = (rating) => {
  if (rating >= 90) {
    return 'badge-error';
  } else if (rating < 90 && rating >= 80) {
    return 'badge-accent';
  } else if (rating < 80 && rating >= 60) {
    return 'badge-warning';
  } else if (rating < 60) {
    return 'badge-info';
  }
};
