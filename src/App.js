import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchData = async () => {
    try {
      const fetchedData = await fetch(url);
      const jsonData = await fetchedData.json();
      setData(jsonData);
      setTotalPages(Math.ceil(jsonData.length / 10));
    } catch (error) {
      console.log(error);
      alert("Failed to fetch data");
    }
  };

  const changePage = (action) => {
    if (action === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else if (action === "next" && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPageData = () => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="App">
      {data.length > 0 ? (
        <>
          <h1>Employee Data Table</h1>
          <table className="table">
            <thead>
              <tr className="header">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {getPageData().map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="controls">
            <button
              id="prev"
              className="button"
              onClick={() => changePage("prev")}
            >
              Previous
            </button>
            <div className="button">{page}</div>
            <button
              id="next"
              className="button"
              onClick={() => changePage("next")}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
