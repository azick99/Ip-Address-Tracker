import { useState, useEffect, useCallback, useMemo } from 'react';
import MapComponent from './components/Map';
import IpInfoContainer from './components/IpInfoContainer';
import arrow from './images/icon-arrow.svg';
import './App.scss';

function App() {
  const [ipData, setIpData] = useState([]);
  const [inputState, setInputState] = useState({
    text: '',
    status: 'typing',
  });
  const { text, status } = inputState;

  const handleChange = (e) => {
    const result = e.target.value;
    setInputState({ ...inputState, text: result, status: 'typing' });
  };
  const API_URL = useMemo(() => {
    return `/map?ipAddress=${text}`;
  }, [text]);

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      const data = await response.json();
      setIpData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(status);
  async function handleSubmit(e) {
    e.preventDefault();
    const { text } = inputState;
    if (text.length) {
      try {
        setInputState({ ...inputState, status: 'submitting' });
        fetchData(API_URL);
      } catch (err) {
        setInputState({ ...inputState, status: 'typing' });
      }
    } else {
      alert('Ip field is empty');
    }
    setInputState({ ...inputState, status: 'success' });
  }

  useEffect(() => {
    if (inputState.status === 'success') {
      fetchData(API_URL);
    }
  }, []);

  const noData = Object.keys(ipData).length === 0;
  const errorCode = ipData.code === 422;
  return (
    <div className="App">
      <div className='ip-address-con'>
        <p>Ip Samples:</p>
        <p>
          <span>Uzbekistan, Fergana</span>: 94.141.76.130 <br />
          <span>Kazakhstan, Almaty</span>: 2.132.105.65 <br />
          <span>United States, New York</span>: 64.94.215.221
          <br />
          <span>Poland, Warsaw</span>: 83.24.213.173 <br />
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <h1 className="fs-700 text-white text-medium">IP Address Tracker</h1>
        <div className="input-con">
          <input
            onChange={handleChange}
            type="text"
            name="text"
            value={text}
            placeholder="Search for any IP address or domain"
            disabled={status === 'submitting'}
          />
          <button type="submit">
            {status === 'submitting' ? (
              'loading...'
            ) : (
              <img src={arrow} alt="arrow" />
            )}
          </button>
        </div>
        <div>
          <IpInfoContainer
            ipData={ipData}
            noData={noData}
            errorCode={errorCode}
          />
        </div>
      </form>

      {noData ? (
        <MapComponent lat={52.22977} lng={21.01178} />
      ) : errorCode ? (
        ''
      ) : (
        <MapComponent lat={ipData.location.lat} lng={ipData.location.lng} />
      )}
    </div>
  );
}

export default App;