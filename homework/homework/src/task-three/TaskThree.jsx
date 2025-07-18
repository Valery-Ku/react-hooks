/* import React, {useState} from 'react';
import './TaskThree.css';

// функция для получения данных с Mock API
const fetchData = async (search) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?search=${search}`);
    return await response.json();
}

export default function TaskThree() {
    const [search, setSearch] = useState();
    const [posts, setPosts] = useState([]);

    return (
        <div className="TaskThree">
            <input type="text" onChange={(event) => setSearch(event.target.value)} placeholder="Search posts"/>
            <h1>Posts</h1>
            <ul>
                {posts.map(item => <li key={item}>{item}</li>)}
            </ul>
        </div>
    )
} */

    import React, { useState, useEffect, useRef } from 'react';
import './TaskThree.css';

const fetchData = async (search, signal) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?search=${search}`, { signal });
  return await response.json();
}

function useDebouncedApiSearch(search, delay = 500) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (!search || !search.trim()) {
      setPosts([]);
      setLoading(false);
      setError(null);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    debounceTimeoutRef.current = setTimeout(() => {
      fetchData(search, controller.signal)
        .then(data => {
          setPosts(data);
          setLoading(false);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            setError(err);
            setLoading(false);
          }
        });
    }, delay);

    return () => {
      clearTimeout(debounceTimeoutRef.current);
      controller.abort();
    };
  }, [search, delay]);

  return { posts, loading, error };
}

export default function TaskThree() {
  const [search, setSearch] = useState('');
  const { posts, loading, error } = useDebouncedApiSearch(search);

  return (
    <div className="TaskThree">
      <input
        type="text"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search posts"
        value={search}
      />
      <h1>Posts</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка: {error.message}</p>}
      <ul>
        {posts.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
