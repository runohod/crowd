import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CatList = () => {
  const [cats, setCats] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchCats = async () => {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
      setCats(response.data);
    };

    fetchCats();
  }, []);

  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
  };

  return (
    <div>
      <h1>Котики</h1>
      <div className="cat-list">
        {cats.map((cat) => (
          <div key={cat.id} className="cat-card">
            <img src={cat.url} alt="Котик" />
            <button onClick={() => handleLike(cat.id)}>Лайк</button>
            <p>Лайков: {likes[cat.id] || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatList;