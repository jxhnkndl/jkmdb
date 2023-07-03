import dayjs from "dayjs";

export const formatSearchTerm = (searchTerm) => {
  return searchTerm
    .split(' ')
    .map((term) => term.charAt(0).toUpperCase() + term.slice(1))
    .join(' ');
};

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
};

// calculate rating percentage
export const setPercentRating = (voteAvg) => Math.floor(voteAvg * 10);

// create rating badge based on rating percentage
export const setRatingColor = (rating, type) => {
  if (rating >= 90) {
    if (type === 'badge') return 'badge-error';
    else return 'text-error';

  } else if (rating < 90 && rating >= 80) {
    if (type === 'badge') return 'badge-accent';
    else return 'text-accent';

  } else if (rating < 80 && rating >= 60) {
    if (type === 'badge') return 'badge-warning';
    else return 'text-warning';

  } else if (rating < 60) {
    if (type === 'badge') return 'badge-info';
    else return 'text-info';
  }
};

// format air date string for movie details display
export const formatAirDates = (debutYear, endYear) => {
  let startDate = debutYear.split('-')[0];
  let latestDate = endYear.split('-')[0];

  return `${startDate}-${latestDate}`;
};

// format genre string
export const formatGenres = (genreArr) => {
  return genreArr.map(genre => genre.name);
};

// extract US content rating from ratings array
export const getContentRating = (ratingsArr) => {
  return ratingsArr.find((rating) => rating.iso_3166_1 === 'US').rating;
};

export const setContentColor = (rating) => {
  if (rating === 'TV-G') {
    return 'text-success';
  } else if (rating === 'TV-PG') {
    return 'text-info';
  } else if (rating === 'TV-14') {
    return 'text-warning';
  } else if (rating === 'TV-MA') {
    return 'text-error';
  } else {
    return 'text-base-content';
  }
}

// create date string
export const formatDate = (date) => {
  return dayjs(date).format('MMMM DD, YYYY');
}

// create roles string
export const formatRoles = (roles) => {
  let result = '';

  roles.forEach((role, index) => {
    if (index === roles.length - 1) {
      result += role.character;
    } else {
      result += `${role.character}, `;
    }
  });

  return result;
}

// create keywords string
export const formatKeywords = (keywords) => {
  let result = '';

  keywords.forEach((keyword, index) => {
    

    if (index === keywords.length - 1) {
      result += keyword.name;
    } else {
      result += `${keyword.name}, `;
    }
  })
  
  return result;
}