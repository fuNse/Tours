import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Tours from "./components/Tours";
import LoadingSpinner from "./components/LoadingSpinner"
import "./style.css"

const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([])
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
      // console.log(tours); uncomment this line to see the JSON in the console
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>You have reached end of the list</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <div className="App">
      {Loading ? <LoadingSpinner /> : fetchTours}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button onClick={fetchTours} disabled={Loading}>
        Fetch Tours
      </button>
    </div>
 );
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
