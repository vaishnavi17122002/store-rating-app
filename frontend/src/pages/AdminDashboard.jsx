import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/dashboard.css";

function AdminDashboard() {

  // =========================
  // States
  // =========================

  const [stats, setStats] =
  useState({});

  const [users, setUsers] =
  useState([]);

  const [stores, setStores] =
  useState([]);

  const [search, setSearch] =
  useState("");

  const [roleFilter,
    setRoleFilter] =
    useState("");

  const [sortOrder,
    setSortOrder] =
    useState("asc");

  // =========================
  // Store Form
  // =========================

  const [storeData,
    setStoreData] =
    useState({

      name: "",

      email: "",

      address: "",

    });

  // =========================
  // User Form
  // =========================

  const [userData,
    setUserData] =
    useState({

      name: "",

      email: "",

      password: "",

      address: "",

      role: "USER",

    });

  // =========================
  // Fetch Dashboard
  // =========================

  const fetchDashboard =
  async () => {

    try {

      const res =
      await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // Fetch Users
  // =========================

  const fetchUsers =
  async () => {

    try {

      const res =
      await axios.get(
        "http://localhost:5000/api/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // Fetch Stores
  // =========================

  const fetchStores =
  async () => {

    try {

      const res =
      await axios.get(
        "http://localhost:5000/api/stores"
      );


      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // useEffect
  // =========================

  useEffect(() => {

    fetchDashboard();

    fetchUsers();

    fetchStores();

  }, []);

  // =========================
  // Handle Store Input
  // =========================

  const handleStoreChange =
  (e) => {

    setStoreData({

      ...storeData,

      [e.target.name]:
      e.target.value,

    });

  };

  // =========================
  // Handle User Input
  // =========================

  const handleUserChange =
  (e) => {

    setUserData({

      ...userData,

      [e.target.name]:
      e.target.value,

    });

  };

  // =========================
  // Add Store
  // =========================

  const addStore =
  async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "http://localhost:5000/api/stores",

        storeData,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }

      );


      alert(
        "Store Added Successfully"
      );

      fetchStores();

      setStoreData({

        name: "",

        email: "",

        address: "",

      });

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  // =========================
  // Add User
  // =========================

  const addUser =
  async (e) => {

    e.preventDefault();

    console.log(userData);

    try {

      await axios.post(

        "http://localhost:5000/api/auth/register",

        userData,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }

      );


      alert(
        "User Added Successfully"
      );

      fetchUsers();

      setUserData({

        name: "",

        email: "",

        password: "",

        address: "",

        role: "USER",

      });

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message

        ||

        "Something went wrong"

      );

    }

  };

  return (

    <div className="admin-dashboard">

      {/* Navbar */}

      <Navbar
        title="Admin Dashboard"
      />

      {/* Stats */}

      <div className="stats-grid">

        <div className="stat-card">

          <h2>
            Total Users
          </h2>

          <h1>
            {stats.totalUsers}
          </h1>

        </div>

        <div className="stat-card">

          <h2>
            Total Stores
          </h2>

          <h1>
            {stats.totalStores}
          </h1>

        </div>

        <div className="stat-card">

          <h2>
            Total Ratings
          </h2>

          <h1>
            {stats.totalRatings}
          </h1>

        </div>

      </div>

      {/* Add Store */}

      <div className="form-card">

        <h2>
          Add Store
        </h2>

        <form onSubmit={addStore}>

          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={storeData.name}
            onChange={
              handleStoreChange
            }
          />

          <input
            type="email"
            name="email"
            placeholder="Store Email"
            value={storeData.email}
            onChange={
              handleStoreChange
            }
          />

          <textarea
            name="address"
            placeholder="Store Address"
            value={storeData.address}
            onChange={
              handleStoreChange
            }
          />

          <button type="submit">

            Add Store

          </button>

        </form>

      </div>

      {/* Add User */}

      <div className="form-card">

        <h2>
          Add User
        </h2>

        <form onSubmit={addUser}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={
              handleUserChange
            }
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={
              handleUserChange
            }
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={
              handleUserChange
            }
          />

          <textarea
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={
              handleUserChange
            }
          />

          <select
            name="role"
            value={userData.role}
            onChange={
              handleUserChange
            }
          >

            <option value="USER">
              USER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="STORE_OWNER">
              STORE OWNER
            </option>

          </select>

          <button type="submit">

            Add User

          </button>

        </form>

      </div>

      {/* Users Table */}

      <div className="table-card">

        <h2>
          All Users
        </h2>

        <div className="filters">

          <input

            type="text"

            placeholder="Search Users..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select

            value={roleFilter}

            onChange={(e) =>
              setRoleFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Roles
            </option>

            <option value="USER">
              USER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="STORE_OWNER">
              STORE OWNER
            </option>

          </select>

          <select

            value={sortOrder}

            onChange={(e) =>
              setSortOrder(
                e.target.value
              )
            }
          >

            <option value="asc">
              Sort A-Z
            </option>

            <option value="desc">
              Sort Z-A
            </option>

          </select>

        </div>

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Address</th>

              <th>Role</th>

            </tr>

          </thead>

          <tbody>

            {
              users

              .filter((user) =>

                user.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )

                ||

                user.email
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )

                ||

                user.address
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )

              )

              .filter((user) =>

                roleFilter === ""

                ? true

                : user.role ===
                  roleFilter

              )

              .sort((a, b) =>

                sortOrder === "asc"

                ? a.name.localeCompare(
                    b.name
                  )

                : b.name.localeCompare(
                    a.name
                  )

              )

              .map((user) => (

                <tr key={user.id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.address}</td>

                  <td>{user.role}</td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

      {/* Stores Table */}

      <div className="table-card">

        <h2>
          All Stores
        </h2>

        <table>

          <thead>

            <tr>

              <th>Store Name</th>

              <th>Email</th>

              <th>Address</th>

              <th>Average Rating</th>

            </tr>

          </thead>

          <tbody>

            {
              stores.map((store) => (

                <tr key={store.id}>

                  <td>{store.name}</td>

                  <td>{store.email}</td>

                  <td>{store.address}</td>

                  <td>
                    ⭐ {store.averageRating}
                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default AdminDashboard;