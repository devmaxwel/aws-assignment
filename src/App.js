import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const url = `https://aws-server-uk80.onrender.com/api/v1/products`;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url);
      console.log("Axios data", response.data);
      setData(response.data);
      setId(response.data[0]?.item_id);
    }
    fetchData();
  }, [url]);

  console.log("data", id);

  let object = data.find((dt) => {
    return dt.item_id === id;
  });
  console.log("object", object);

  return (
    <div className="App">
      <header>
        <nav className="nav">
          <div className="log0">
            {/* Logo */}
            Ak_Rosh_Sree
          </div>
          <div className="items">
            {/* Links */}
            <ul className="">
              {data?.map((item) => {
                return (
                  <li onClick={() => setId(item.item_id)} key={item.item_id}>
                    {item.item_name}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>
      <div>
        {/* Body */}
        {object && (
          <table className="table">
            {Object.keys(object)?.map((key) => {
              return (
                <tr className="table_details">
                  <td className="item_name">{key}</td>
                  <td className="item_details">{object[key]}</td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
