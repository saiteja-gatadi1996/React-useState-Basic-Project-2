import React, { useEffect, useState } from 'react';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const fetchApiURL = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    setData(data);
  };

  const removeTour = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  useEffect(() => {
    fetchApiURL();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data.map((tour) => {
        const { id, image, info, name, price } = tour;
        console.log(info.length);
        return (
          <div key={id}>
            <h1>{name}</h1>
            <img src={image} alt={name} />
            <p>
              {showMore ? info : `${info.substring(0, 200)}...`}
              <button onClick={() => setShowMore(!showMore)}>
                {showMore ? 'show less' : 'show more'}
              </button>
            </p>
            <b>{price}</b>
            <button onClick={() => removeTour(id)} className='removeButton'>
              Remove Tour
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
