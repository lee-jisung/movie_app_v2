import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row, Button } from 'antd';

function MovieDetail(props) {
  // App.js에서 등록한 router의 props로 movieId를 가져옴
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endPointInfo)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setMovie(response);
      });

    // get actors information of the specific movie
    fetch(endPointCrew)
      .then(response => response.json())
      .then(response => {
        setCasts(response.cast);
      });
  }, []);

  const onToggleHandle = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header => 해당 영화의 poster (MovieImage component 사용) */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body => 영화의 상세 정보들 뿌려줌*/}

      {/* Favorite button */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* userFrom => login한 사람의 id */}
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem('userId')}
          />
        </div>

        {/* Movie Info */}
        <MovieInfo movie={Movie} />

        <br />

        {/* Actors Grid = 영화의 배우들 사진들 뿌려줌 */}
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
        >
          <Button type="primary" onClick={onToggleHandle}>
            Toggle Actor View
          </Button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    actorName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
