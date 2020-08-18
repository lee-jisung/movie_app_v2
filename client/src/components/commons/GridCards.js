import React from 'react';
import { Col } from 'antd';

function GridCards(props) {
  if (props.landingPage) {
    // landing page에서 gridcard를 뿌릴 때
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: '100%', height: '450px' }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    // 영화를 하나 눌러서 배우들 사진 뿌릴 때
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <img
            style={{ width: '100%', height: '450px' }}
            src={props.image}
            alt={props.actorNmae}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;
