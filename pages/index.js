import styled from "styled-components";
import axios from "axios";
import Link from 'next/link'
import { useState } from "react";
import { Favorites } from '../Components/Favorites'

const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

const Header = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
  border-radius: 5px;
  box-shadow: 0 0 2px rgb(0, 0, 0, 0.4);
`;

// const Favorites = styled.div `

// `

const Label = styled.label`
  margin-right: 30px;
`;

const Search = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-right: 20px;
  padding: 0 10px;
  width: 500px;
  height: 30px;
  border-radius: 5px;
  border: none;
  outline: none;
  :focus {
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.8);
  }
`;

const Button = styled.button`
  outline: none;
  padding: 5px 10px;
  border: none;
  font: inherit;
  color: inherit;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 3px rgb(0, 0, 0, 0.5);
  cursor: pointer;
  :active {
    background-color: rgb(236 233 233);
  }
`;

const List = styled.ul`
  position: absolute;
  min-width: 500px;
  top: 27px;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 2px 1px rgb(0, 0, 0, 0.5);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 9999;
  background-color: white;
`;

const Item = styled.li`
  margin-bottom: 10px;
  cursor: pointer;

  :hover {
    background-color: #dad4d4;
  }
`;

const A = styled.a`
  display: block;
  margin: 0 10px;
  padding: 10px 0;
  text-decoration: none;
`;
const PreviewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Preview = styled.img`
  width: 250px;
  cursor: pointer;
`;

const Capture = styled.div`
  position: absolute;
  display: none;
  width: calc(100% - 20px);
  height: calc(100% - 23px);
  background-color: black;
  opacity: 0.7;
  top: 10px;
  left: 10px;
  cursor: pointer;
`;
const Title = styled.p`
  color: white;
  position: absolute;
  margin: 0;
  width: 80%;
  text-align: center;
  display: none;
  font-size: 16px;
  z-index: 1;
  top: 110px;
  left: 27px;
  cursor: pointer;
`;

const PreviewWrap = styled.div`
  position: relative;

  &:hover ${Capture} {
    display: inline;
  }

  &:hover ${Title} {
    display: block;
  }
`;

// 'w1m23bs3znxmhjb0xp3ddzihui3j62' 'id'
// 'gf17j36ureiaqmzuobg6qrzitps99b' 'secret code'

// 'jdlgsg2zo59t07pq4tylfc87uy34mp' 'access_token'

// curl --location --request GET 'https://api.twitch.tv/helix/search/channels?query=a_seagull' \
// --header 'client-id: w1m23bs3znxmhjb0xp3ddzihui3j62' \
// --header 'Authorization: Bearer jdlgsg2zo59t07pq4tylfc87uy34mp'

// broadcaster_language: "ru"
// broadcaster_login: "dota2ti_ru_2"
// display_name: "dota2ti_ru_2"
// game_id: "29595"
// id: "65504150"
// is_live: false
// started_at: ""
// tag_ids: []
// thumbnail_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/e38369df-ee6c-4cfc-9eb3-cefd8ab2dfe6-profile_image-300x300.png"
// title: "Повтор | The International 9 | Группов

function getUsersNyUsername(name) {
  return axios
    .get(`https://api.twitch.tv/helix/search/channels?query=${name}`, {
      headers: {
        "client-id": "w1m23bs3znxmhjb0xp3ddzihui3j62",
        Authorization: "Bearer jdlgsg2zo59t07pq4tylfc87uy34mp",
      },
    })
    .then((response) => response.data.data);
}

function getVideosByUserId(userId) {
  return axios
    .get("https://api.twitch.tv/helix/videos?user_id=" + userId, {
      headers: {
        "client-id": "w1m23bs3znxmhjb0xp3ddzihui3j62",
        Authorization: "Bearer jdlgsg2zo59t07pq4tylfc87uy34mp",
      },
    })
    .then(
      (response) => response.data,
      (_) => null
    );
}

// getVideosByUserId("23798553").then(console.log);
// getUsersNyUsername("MJRAMON").then(console.log);

// id: "438322552"

// curl -X GET 'https://api.twitch.tv/helix/videos?id=234482848' \
// -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
// -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'

export default function Home() {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const [inFocus, setInFocus] = useState(false);
  const [userId, setUserId] = useState("");
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  console.log(favorites);
  function addToFavorites(video) {
    if (!favorites.find((v) => v === video)) {
      setFavorites((prev) => [...prev, video]);
    }
  }

  function removeVideoFromFavorites(id) {
    const newFavorites = favorites.filter((video) => video.id !== id);
    setFavorites(newFavorites);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getVideosByUserId(userId).then((data) => setVideos(data?.data));
    setInFocus(false);
  }

  function handleChange(e) {
    setValue(e.target.value);
    if (value) {
      getUsersNyUsername(value).then((data) => setUsers(data));
    }
  }

  function handleClick(name, userId) {
    setValue(name);
    setInFocus(false);
    setUserId(userId);
    getVideosByUserId(userId).then((data) => setVideos(data?.data));
  }

  return (
    <main>
      <Container>
        <Header>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Label htmlFor="search">Введите название канала</Label>
            <Search>
              <Input
                type="text"
                id="search"
                value={value}
                onChange={(e) => handleChange(e)}
                onFocus={() => setInFocus(true)}
                autoComplete="off"
              />

              {users.length > 0 && inFocus && (
                <List>
                  {users.map((user) => (
                    <Item
                      onClick={() => handleClick(user.display_name, user.id)}
                      key={user.id}
                    >
                      <A>{user.display_name}</A>
                    </Item>
                  ))}
                </List>
              )}
            </Search>
            <Button type="submit">Найти</Button>
          </Form>
          <Link href='/favorites'>
          <div>Favorites</div>

          </Link>
          
        </Header>

        <PreviewsContainer>
          {videos.length > 0 &&
            videos.slice(1).map((video) => (
              <PreviewWrap key={video.id}>
                <A href={video.url} target="_blank">
                  <Preview
                    src={video.thumbnail_url.replace(
                      /(%{width})|(%{height})/gi,
                      "300"
                    )}
                  />
                </A>
                <a href={video.url} target="_blank">
                  <Capture />
                  <Title>{video.title}</Title>
                </a>
                <button
                  onClick={() => addToFavorites(video)}
                  type="button"
                  style={{ position: "absolute", top: 0, right: 0, cursor: 'pointer' }}
                >
                  Add to favorite
                </button>
              </PreviewWrap>
            ))}
        </PreviewsContainer>
      </Container>
    </main>
  );
}
