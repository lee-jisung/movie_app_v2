import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { Row, Button } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../../commons/MainImage';
import GridCards from '../../commons/GridCards';

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    // movie api_url을 이용해서 data를 가져옴
    fetchMovies(endPoint);
  }, []);

  // movie url을 fetch하여 영화 정보 가져오는 함수
  const fetchMovies = endPoint => {
    fetch(endPoint)
      .then(response => response.json())
      .then(response => {
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      });
  };

  // load more handler
  const loadMoreItems = () => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endPoint);
  };

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {/* Main Image  w1280 => wide 1280 : image size*/}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by latest</h2>
        <hr />

        {/* Movie Grid Cards */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieNmae={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" onClick={loadMoreItems}>
          Load More
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
