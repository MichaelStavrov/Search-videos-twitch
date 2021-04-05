import styled from "styled-components";

const A = styled.a`
display: block;
margin: 0 10px;
padding: 10px 0;
text-decoration: none;
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

export function Favorites({favorites}) {
  console.log(favorites);
  return (
    <>
      <div>
        {favorites.map((video) => (
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
                  style={{ position: "absolute", top: 0 }}
                >
                  Favorite
                </button>
              </PreviewWrap>
            ))}
      </div>
    </>
  )
}