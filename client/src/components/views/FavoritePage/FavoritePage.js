import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Popover, Button } from 'antd';
import './favoritepage.css';
import { IMAGE_BASE_URL } from '../../Config';
function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  //favorite page에서 remove버튼을 눌렀을 때, list들을 re render하기 위해서
  //function으로 만들어서 remove 후 다시 fetch를 call하기 위해 만든 함수
  const fetchFavoredMovie = () => {
    Axios.post('/api/favorite/getFovoriteMovie', {
      userFrom: localStorage.getItem('userId'),
    }).then(response => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
        console.log(response.data.favorites);
      } else {
        alert('Fail to get movie information from DB');
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    Axios.post('/api/favorite/removeFavorite', variables).then(response => {
      if (response.data.success) {
        fetchFavoredMovie();
      } else {
        alert('Fail to remove favorite from DB');
      }
    });
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          'No image'
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRuntime} mis</td>
        <td>
          {/* onClick을 할 때, params가 필요한 경우, ()=>로 앞에 붙여준다음 parameter를 넣어줘야 함 */}
          <Button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove from favorite</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
