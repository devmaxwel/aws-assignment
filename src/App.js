import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  console.log("id", id);

  useEffect(() => {
    async function fetchData() {
      const url = `https://aws-server-uk80.onrender.com/api/v1/products`;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setId(data[0]?.item_id);
          return data;
        })
        .catch((error) => console.log(error));
    }

    fetchData();
  }, []);

  console.log(data);

  let object = data?.find((dt) => {
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
              {data.map((item) => {
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
        <table className="table">
          {Object.keys(object).map((key) => {
            return (
              <tr className="table_details">
                <td className="item_name">{key}</td>
                <td className="item_details">{object[key]}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
