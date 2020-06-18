import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialInfo = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = props => {
  const { push } = useHistory();
  const { id } = useParams();
  const [info, setInfo] = useState(initialInfo);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setInfo(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const changeHandler = e => {
    let value = e.target.value;

    setInfo({
      ...info,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, info)
      .then(res => {
        setInfo(res.data);
        push(`/movies/${id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={info.title}
        />

        <br />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          value={info.director}
        />

        <br />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          value={info.metascore}
        />

        <br />
        
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          value={info.stars}
        />
        
        <br />

        <button >Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
