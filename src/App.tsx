import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Mention, MentionComponent } from './components/Mention';

function App() {
  const [mentionValue, setMentionValue] = useState('');
  const [options, setOptions] = useState<Mention[]>([]);

  const handleMentionChange = (value: string) => {
    setMentionValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Mentions</h1>
      <p className="read-the-docs">
        submitted by @ashwathbharadwaj
      </p>
      <MentionComponent
        value={mentionValue}
        onChange={handleMentionChange}
        options={options}
        setOptions={setOptions}
      />
    </>
  );
}

export default App;
