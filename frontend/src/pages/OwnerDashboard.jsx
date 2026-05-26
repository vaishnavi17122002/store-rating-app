import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from
  "../components/Navbar";

import "../styles/dashboard.css";

function OwnerDashboard() {

  const [data, setData] =
    useState({});

  const [ratings, setRatings] =
    useState([]);

  const fetchDashboard =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const res =
          await axios.get(

            `http://localhost:5000/api/owner/`,

            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }

          );



        setData(res.data);

        setRatings(
          res.data.store.Ratings
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchDashboard();

  }, []);

  return (

    <div className="dashboard">

      <Navbar
        title="Store Owner Dashboard"
      />

      {/* Average Rating */}

      <div
        className="stats-container"
      >

        <div className="stats-card">

          <h2>
            Average Rating
          </h2>

          <h1>
            ⭐ {data.averageRating}
          </h1>

        </div>

      </div>

      {/* Ratings Table */}

      <h2
        style={{
          marginTop: "30px",
        }}
      >
        Users Who Rated Store
      </h2>

      <table>

        <thead>

          <tr>

            <th>User Name</th>

            <th>Email</th>

            <th>Rating</th>

          </tr>

        </thead>

        <tbody>

          {
            ratings.map((item) => (

              <tr key={item.id}>

                <td>
                  {item.User?.name}
                </td>

                <td>
                  {item.User?.email}
                </td>

                <td>
                  ⭐ {item.rating}
                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );
}

export default OwnerDashboard;