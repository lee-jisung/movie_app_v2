# Movie App

- ReactJS & Node JS (express)

---

## The MovieDB API

- https://www.themoviedb.org/
- login - settings - api - accept, developer api
- app 이름 외의 정보는 아무렇게나 입력해도 상관 없음

### How to use API URL

- https://developers.themoviedb.org/3/getting-started/introduction

- Get movie by latest

  > https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US

- Get movie detail

  > https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

- get movie reviews

  > https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

- get trending

  > https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US

- get image
  > https://image.tmdb.org/t/p/original/wweemzKWzjKYJFfCeiB57q3r4Bcm.svg
  - original => image size

---

## Feedback

- [❌] Like / Dislike 추가 movie detail page에
- [❌] comment 기능 추가 -> movie detail page에
- [❌] MainImage -> poster 크기 맞추기
- [✔] Login상태에서만 favorite 버튼 보이게 함 -> localstorage에 userId 지움(right menu에서 click handler에 추가함)
-
