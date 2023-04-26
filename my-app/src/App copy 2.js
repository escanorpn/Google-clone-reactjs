import React, { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest`;
        const response = await fetch(url);
        const data = await response.json();
        setResults(data.items);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
  };

  const handleSort = (event) => {
    event.preventDefault();
    const field = event.target.elements.sort.value;
    const sortedResults = [...results].sort((a, b) => {
      if (a.volumeInfo[field] < b.volumeInfo[field]) {
        return -1;
      } else if (a.volumeInfo[field] > b.volumeInfo[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    setResults(sortedResults);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search books" />
        <button type="submit">Search</button>
      </form>

      <form onSubmit={handleSort}>
        <label>
          Sort by:
          <select name="sort">
            <option value="publishedDate">Publication date</option>
            <option value="averageRating">Average rating</option>
          </select>
        </label>
        <button type="submit">Sort</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      <ul>
        {results.map((item) => (
          <li key={item.id}>
            <h2>{item.volumeInfo.title}</h2>
            <p>Author: {item.volumeInfo.authors?.[0]}</p>
            <p>Published date: {item.volumeInfo.publishedDate}</p>
            <p>Average rating: {item.volumeInfo.averageRating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
