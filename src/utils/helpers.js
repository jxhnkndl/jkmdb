import dayjs from 'dayjs';

// search term formatter
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


// limit movie, cast, or recommendation results to display
export const limitResults = (data, limit) => {
  let results;

  if (limit) {
    results = data.slice(0, limit);
  } else {
    results = data;
  }

  return results;
};


// create date string
export const formatDate = (date) => {
  return dayjs(date).format('MMMM D, YYYY');
};


// format air dates for tv series details
export const formatAirDates = (debutYear, endYear) => {
  let startDate = debutYear.split('-')[0];
  let latestDate = endYear.split('-')[0];

  return `${startDate}-${latestDate}`;
};


// calculate rating percentage
export const setPercentRating = (voteAvg) => Math.floor(voteAvg * 10);


// create rating badge based on rating percentage
export const setBadgeColor = (rating, type) => {
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


// extract US content rating from ratings array
export const getContentRating = (ratingsArr) => {
  return ratingsArr.find((rating) => rating.iso_3166_1 === 'US').rating;
};

export const getMpaaRating = (ratingsArr) => {
  return ratingsArr.find((rating) => rating.iso_3166_1 === 'US')
    .release_dates[0].certification;
};

// set text or badge collor
export const setTextColor = (rating) => {
  if (rating === 'TV-G' || rating === 'G') {
    return 'text-success';
  } else if (rating === 'TV-PG' || rating === 'PG') {
    return 'text-info';
  } else if (rating === 'TV-14' || rating === 'PG-13') {
    return 'text-warning';
  } else if (rating === 'TV-MA' || rating === 'R') {
    return 'text-error';
  } else {
    return 'text-base-content';
  }
};


// format genre string
export const formatGenres = (genreArr) => {
  return genreArr.map((genre) => genre.name);
};

// create roles string
export const formatRoles = (roles) => {
  // movies return strings
  if (typeof roles === 'string') {
    return roles;
  }

  // tv shows return arrays
  let result = '';

  roles.forEach((role, index) => {
    if (index === roles.length - 1) {
      result += role.character;
    } else {
      result += `${role.character}, `;
    }
  });

  return result;
};

// create keywords string
export const formatKeywords = (keywords) => {
  let result = '';

  keywords.forEach((keyword, index) => {
    if (index === keywords.length - 1) {
      result += keyword.name;
    } else {
      result += `${keyword.name}, `;
    }
  });

  return result;
};
