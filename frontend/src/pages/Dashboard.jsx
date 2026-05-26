import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "../styles/dashboard.css";

import Navbar from "../components/Navbar";

function Dashboard() {

  // =========================
  // States
  // =========================

  const [stores, setStores] =
  useState([]);

  const [ratings, setRatings] =
  useState({});

  const [search, setSearch] =
  useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  // =========================
  // Fetch Stores
  // =========================

  const fetchStores =
  async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/stores"
      );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchStores();

  }, []);

  // =========================
  // Submit Rating
  // =========================

  const submitRating =
  async (storeId) => {

    try {

      const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

      // Validation

      if (!ratings[storeId]) {

        alert(
          "Please Select Rating"
        );

        return;

      }

      await axios.post(
        "http://localhost:5000/api/ratings",

        {

          rating:
          ratings[storeId],

          storeId,

        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      alert(
        "Rating Submitted Successfully"
      );

      // Refresh Stores

      fetchStores();

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // Update Password
  // =========================

  const updatePassword =
  async () => {

    try {

      const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

      await axios.put(

        "http://localhost:5000/api/users/update-password",

        {

          password:
          newPassword,

        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }

      );


      alert(
        "Password Updated Successfully"
      );

      setNewPassword("");

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // Logout
  // =========================

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div className="dashboard">

      {/* Navbar */}

      <Navbar
        title="Store Dashboard"
      />

      {/* Search */}


        
      <input

        type="text"

        placeholder="Search Stores..."

        value={search}

        onChange={(e) =>
          setSearch(e.target.value)
        }

        className="search-box"
      />

      {/* Password Update */}

      <div className="store-card">

        <h2>
          Update Password
        </h2>

        <input

          type="password"

          placeholder="New Password"

          value={newPassword}

          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={
            updatePassword
          }
        >
          Update Password
        </button>

      </div>

      {/* Store Grid */}

      <div className="store-grid">

        {
          stores

          .filter((store) =>

            store.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

            ||

            store.address
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

          )

          .map((store) => {

            // Find User Rating

            const userRating =
            store.Ratings?.find(

              (r) =>

              r.userId ===

              JSON.parse(
                localStorage.getItem(
                  "user"
                )
              ).id

            );

            return (

              <div
                className="store-card"
                key={store.id}
              >

                <h2>
                  {store.name}
                </h2>

                <p>
                  📧 {store.email}
                </p>

                <p>
                  📍 {store.address}
                </p>

                <p>

                  ⭐ Average Rating:

                  {" "}

                  {store.averageRating}

                </p>

                {/* User Rating */}

                <p>

                  Your Rating:

                  {" "}

                  {

                    userRating

                    ?

                    `${userRating.rating} ⭐`

                    :

                    "Not Rated"

                  }

                </p>

                {/* Rating Select */}

                <select

                  value={
                    ratings[store.id]
                    || ""
                  }

                  onChange={(e) =>

                    setRatings({

                      ...ratings,

                      [store.id]:
                      e.target.value,

                    })

                  }
                >

                  <option value="">
                    Select Rating
                  </option>

                  <option value="1">
                    1 ⭐
                  </option>

                  <option value="2">
                    2 ⭐
                  </option>

                  <option value="3">
                    3 ⭐
                  </option>

                  <option value="4">
                    4 ⭐
                  </option>

                  <option value="5">
                    5 ⭐
                  </option>

                </select>

                {/* Submit Button */}

                <button

                  onClick={() =>
                    submitRating(
                      store.id
                    )
                  }

                >

                  {

                    userRating

                    ?

                    "Update Rating"

                    :

                    "Submit Rating"

                  }

                </button>

              </div>

            );

          })
        }

      </div>

    </div>

  );
}

export default Dashboard;