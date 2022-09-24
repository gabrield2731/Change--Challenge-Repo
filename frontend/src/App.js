import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.pullFromBackend();
    this.state = {
      lyric: "",
      track_title: "",
      score: 0,
    };
  }

  checkCorrect = (songName) => {
    var score = this.state.score;
    if (songName === this.state.track_title.toLowerCase()) {
      score += 1;
    }
    this.setState({
      track_title: "",
      score: score,
    });
  };

  pullFromBackend = () => {
    fetch("http://localhost:5000/")
      .then((response) => (response = response.json()))
      .then((data) =>
        this.setState({
          artist: data.artist,
          album: data.album,
          track_title: data.track_title.toLowerCase(),
          track_n: data.track_n,
          lyric: data.lyric,
          line: data.line,
          year: data.year,
        })
      )
      .catch((error) => console.log(error));
  };

  getSong = () => {
    var strSong = document.getElementById("songNameGet").value.toLowerCase();
    return strSong;
  };

  gameLoop = () => {
    this.checkCorrect(this.getSong());
    this.pullFromBackend();
  };

  render() {
    return (
      <html>
        <body>
          <nav>
            <div class="nav-links" id="navLinks">
              <ul>
                <li>
                  <a href="index.js">HOME</a>
                </li>
              </ul>
            </div>
            <i class="fa fa-bars" onclick="showMenu()"></i>
          </nav>
          <div class="header">
            <h1>Are you really a Taylor Swift Fan?</h1>
            <h2>Guess which song this lyric belongs to!</h2>
          </div>
          <div class="App">
            <h2>Album: {this.state.album}</h2>
            <h3>Lyric: {this.state.lyric}</h3>
            <form class="form">
              <h5>What song is this from?</h5>
              <input
                type="text"
                class="iptBox"
                id="songNameGet"
                placeholder="Song Name"></input>
              <button
                type="button"
                id="btnGet"
                onClick={() => {
                  //do stuff to check if correct
                  this.gameLoop();
                }}>
                Enter
              </button>
            </form>
          </div>
          <div class="info">
            <h4>Score: {this.state.score}</h4>
          </div>
        </body>
      </html>
    );
  }
}

export default App;
