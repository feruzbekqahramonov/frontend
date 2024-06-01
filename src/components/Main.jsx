import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const endpoints = [
    "https://api.spotify.com/v1/browse/categories/toplists/playlists",
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists",
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists",
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists",
  ];

  useEffect(() => {
    if (!token) {
      setError(new Error("Token is missing"));
      return;
    }

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          endpoints.map((url) =>
            fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((res) => {
              if (!res.ok) {
                throw new Error("Network response was not ok");
              }
              return res.json();
            })
          )
        );
        const combinedData = responses.flatMap((res) =>
          res.playlists.items.slice(0, 6)
        );
        setData(combinedData);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [token]);

  const navigate = useNavigate();

  function handleRedirect(id) {
    navigate(`playlist/${id}`);
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (data.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="relative mb-[22px]">
      <div className="justify-center mx-auto relative gap-10 w-[765px] bg-[#121212] flex flex-wrap pt-[100px] px-[6px]">
        {data.map((el, index) => (
          <div
            key={index}
            className="gap-4 w-[224px] cursor-pointer"
            onClick={() => handleRedirect(el.id)}
          >
            <div className="w-[224px] p-5 rounded-lg h-[324px] bg-[#1B1B1B] text-[#B3B3B3]">
              <img
                src={el.images[0].url}
                alt={el.name}
                className="w-[182px] h-[182px] rounded-lg"
                style={{ objectFit: "cover" }}
              />
              <h1 className="text-[16px] text-white">{el.name}</h1>
              <span className="text-[12px]">{el.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
