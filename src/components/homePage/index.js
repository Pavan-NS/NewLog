import React, { useEffect, useState } from "react";
import HomeNavbar from "../HomeNavbar";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import "./index.css";
const Home = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovieList = async () => {
    try {
      const response = await fetch("https://hoblist.com/api/movieList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "movies",
          language: "kannada",
          genre: "all",
          sort: "voting",
        }),
      });

      const data = await response.json();
      console.log(data);
      setMovies(data.result);
      if (!response.ok) {
        throw new Error("Failed to fetch movie list");
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <>
      <HomeNavbar />
      <div className="">
        <h1 className="text-center pt-2 text-dark">Movie List</h1>
        <ul className="movie-list">
          {movies &&
            movies.map((movie, i) => (
              <li key={i}>
                <div className="movie-container">
                  <div className="container">
                    <div className="vote-section">
                      <BiSolidUpvote />
                      <p className="text-center">{movie.voting}</p>
                      <BiSolidDownvote />
                      <p className="vote">Votes</p>
                    </div>
                    <div className="poster">
                      <img className="img" src={movie.poster} />
                    </div>
                    <div className="details">
                      <h6>{movie.title}</h6>
                      <p>Genre : {movie.genre}</p>
                      <p>Director: {movie.director} </p>
                      <p>Starrting: {movie.stars}</p>
                      <div className="mins">
                        <p>Mins |</p>
                        <p>{movie.language} |</p>
                        <p>{movie.releasedDate}</p>
                      </div>
                      <div className="mins">
                        <p>{movie.pageViews} Views | </p>

                        <p> Voted by {movie.totalVoted} People</p>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary w">Watch Trailer</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
