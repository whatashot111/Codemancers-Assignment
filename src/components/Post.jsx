import { Avatar, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import "./../css/post.css";
import TheHeader from "./TheHeader";

export default function Post() {
  //States
  const [posts, setPosts] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [selectedGifUrl, setSelectedGifUrl] = useState(null);

  //Functions
  function submitMessage(event) {
    event.preventDefault();
    let enteredText = document.getElementById("postText").value;
    if (enteredText.trim() === "") {
      alert("Write something for your post..");
      return;
    }
    const addToPosts = posts.unshift({
      id: posts.length + 1,
      enteredText,
      selectedGifUrl,
    });
    setPosts([...posts], posts.unshift({ addToPosts }));
    document.getElementById("postText").value = "";
    document.getElementById("gif_search_container").style.display = "none";
    document.getElementById("search").value = "";
    setSelectedGifUrl(null);
  }

  function handleSearchGif(event) {
    event.preventDefault();
    let API_KEY = "VRvWGj1RWbrNcY1yxXML3gHrhIBqXRBZ";
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=25&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);

    fetch(url)
      .then((res) => res.json())
      .then((content) => setGifs(content.data));
  }

  function handleClickedGif(id) {
    const clickedGif = gifs.filter((gif) => gif.id === id);
    setSelectedGifUrl(clickedGif[0].images.downsized.url);
    document
      .getElementsByClassName("post_container")[0]
      .scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="wrapper">
      <TheHeader />
      <div className="post_container">
        <form onSubmit={submitMessage}>
          <div className="create_post">
            <Box sx={{ display: "flex", margin: "16px" }}>
              <Avatar src="/broken-image.jpg" style={{ marginRight: "16px" }} />
              <TextField
                fullWidth
                name="postText"
                id="postText"
                placeholder="What's in your mind.."
                multiline
                rows={4}
                variant="standard"
              />
            </Box>
            {selectedGifUrl ? (
              <div className="create_post_gif">
                <img
                  src={selectedGifUrl}
                  width="400"
                  height="400"
                  id="preview_gif"
                  alt="some_gif_1"
                />
              </div>
            ) : (
              ""
            )}
            <div className="post__buttons">
              <Button
                color="primary"
                variant="outlined"
                className="post__button"
                onClick={() =>
                  (document.getElementById(
                    "gif_search_container"
                  ).style.display = "flex")
                }
                type="button"
              >
                Insert GIF
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="post__button"
                type="submit"
              >
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div id="gif_search_container" style={{ display: "none" }}>
        <form onSubmit={handleSearchGif}>
          <div className="form_fields">
            <TextField
              id="search"
              label="Search GIFs..."
              variant="standard"
              helperText="Cannot be Empty"
              placeholder="Type Something.."
            />
            <div>
              <Button
                style={{ marginTop: "16px" }}
                color="secondary"
                variant="contained"
                type="submit"
              >
                Search GIF
              </Button>
            </div>
          </div>
        </form>
        <div className="gifs_container">
          {gifs.map((gif) => (
            <div onClick={() => handleClickedGif(gif.id)} key={gif.id}>
              <img
                style={{ cursor: "pointer" }}
                src={gif.images.downsized.url}
                alt={gif.title}
                width="100"
                height="100"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="show_posts">
        <h3 style={{ textAlign: "center" }}>
          {posts.length > 0
            ? "Previous Posts..."
            : "No Posts Available, Start Posting now"}
        </h3>
        {posts.map((el) => (
          <div className="post" key={el.id}>
            <div className="post__text">
              {JSON.parse(JSON.stringify(el.enteredText))}
            </div>

            {el.selectedGifUrl ? (
              <div className="post__gif">
                <img
                  src={el.selectedGifUrl}
                  width="200"
                  height="200"
                  alt="some_gif_2"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
