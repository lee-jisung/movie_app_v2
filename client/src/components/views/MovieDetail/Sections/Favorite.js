import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRuntime: movieRuntime,
  };

  useEffect(() => {
    Axios.post('/api/favorite/favoriteNumber', variables).then(response => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert('Fail to get Favorite numbers');
      }
    });

    Axios.post('/api/favorite/favorited', variables).then(response => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert('Fail to get Favorite Information');
      }
    });
  }, []);

  const OnclickFavorite = () => {
    if (Favorited) {
      Axios.post('/api/favorite/removeFavorite', variables).then(response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert('Fail to remove Favorite info from DB');
        }
      });
    } else {
      Axios.post('/api/favorite/addFavorite', variables).then(response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('Fail to add Favorite info to DB');
        }
      });
    }
  };

  const userId = localStorage.getItem('userId');

  return (
    <div>
      {/* login을 했을 때 favorite button을 보이게 해놓음 */}
      {userId && (
        <Button onClick={OnclickFavorite}>
          {Favorited ? 'Favorited' : 'Add to Favorite'} {FavoriteNumber}
        </Button>
      )}
    </div>
  );
}

export default Favorite;
