import React from 'react';
import ResultCard from './ResultCard';

function SearchResults() {
  const testData = [
    {
      adult: false,
      backdrop_path: '/pQHg2NZpS5kvoENFMSt0ynzCFqd.jpg',
      id: 114472,
      name: 'Secret Invasion',
      original_language: 'en',
      original_name: 'Secret Invasion',
      overview:
        'Nick Fury and Talos discover a faction of shapeshifting Skrulls who have been infiltrating Earth for years.',
      poster_path: '/3rINdUPSy9AklJg74jWHOyUXuZd.jpg',
      media_type: 'tv',
      genre_ids: [10759, 18, 10765],
      popularity: 490.314,
      first_air_date: '2023-06-21',
      vote_average: 7.9,
      vote_count: 98,
      origin_country: ['US'],
    },
    {
      adult: false,
      backdrop_path: '/h8tlJHaWzrrHABnbQN32fVmZj3H.jpg',
      id: 117678,
      name: 'Skull Island',
      original_language: 'en',
      original_name: 'Skull Island',
      overview:
        'Shipwrecked in the South Pacific, a group of explorers encounter a menagerie of fearsome creatures — including the giant ape who rules the island: Kong.',
      poster_path: '/8XApFlqookjHKWuScJgUoWnpFt8.jpg',
      media_type: 'tv',
      genre_ids: [16, 10759, 10765, 10751],
      popularity: 69.252,
      first_air_date: '2023-06-22',
      vote_average: 8.7,
      vote_count: 10,
      origin_country: ['US'],
    },
    {
      adult: false,
      backdrop_path: '/4qqxCA31Bj4CqimMkZxfCiYnX6r.jpg',
      id: 105169,
      name: "I'm a Virgo",
      original_language: 'en',
      original_name: "I'm a Virgo",
      overview:
        'A coming-of-age joyride about Cootie, a 13ft tall young Black man in Oakland, CA. Having grown up hidden away, Cootie soon experiences the beauty and contradictions of the world for the first time. He forms friendships, finds love, navigates awkward situations, and encounters his idol, a real life superhero named The Hero.',
      poster_path: '/avyEl0afo2u5Q8305Eq27nL5LYu.jpg',
      media_type: 'tv',
      genre_ids: [35, 10759, 10765, 18],
      popularity: 61.691,
      first_air_date: '2023-06-22',
      vote_average: 7.8,
      vote_count: 6,
      origin_country: ['US'],
    },
    {
      adult: false,
      backdrop_path: '/q7XOgkp0NfjqVRYxzU0eGg7wSrm.jpg',
      id: 42009,
      name: 'Black Mirror',
      original_language: 'en',
      original_name: 'Black Mirror',
      overview:
        "A contemporary British re-working of The Twilight Zone with stories that tap into the collective unease about our modern world. \n\nOver the last ten years, technology has transformed almost every aspect of our lives before we've had time to stop and question it. In every home; on every desk; in every palm - a plasma screen; a monitor; a smartphone - a black mirror of our 21st Century existence.",
      poster_path: '/5UaYsGZOFhjFDwQh6GuLjjA1WlF.jpg',
      media_type: 'tv',
      genre_ids: [10765, 18, 9648],
      popularity: 698.657,
      first_air_date: '2011-12-04',
      vote_average: 8.313,
      vote_count: 4132,
      origin_country: ['GB'],
    },
    {
      adult: false,
      backdrop_path: '/1V4SPkV3bQvl85zK4FqwTzdfBs4.jpg',
      id: 125988,
      name: 'Silo',
      original_language: 'en',
      original_name: 'Silo',
      overview:
        'In a ruined and toxic future, a community exists in a giant underground silo that plunges hundreds of stories deep. There, men and women live in a society full of regulations they believe are meant to protect them.',
      poster_path: '/zBx1X06G1OlndbXTCZI13FECNz2.jpg',
      media_type: 'tv',
      genre_ids: [10765, 18],
      popularity: 981.732,
      first_air_date: '2023-05-04',
      vote_average: 8.181,
      vote_count: 196,
      origin_country: ['US', 'GB'],
    },
  ];

  return (
    <div className='grid grid-cols-2 lg:grid-cols-5'>
      {testData.map((result) => (
        <ResultCard key={result.id} data={result} />
      ))}
    </div>
  );
}

export default SearchResults;
