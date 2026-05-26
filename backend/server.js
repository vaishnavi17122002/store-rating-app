const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

// Models
const User = require("./models/User");
const Store = require("./models/Store");
const Rating = require("./models/Rating");

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/stores", storeRoutes);

app.use("/api/ratings", ratingRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);

app.use("/api/owner", ownerRoutes);




// ==========================
// Relationships
// ==========================

// One User can give many Ratings
User.hasMany(Rating);

Rating.belongsTo(User);

// One Store can have many Ratings
Store.hasMany(Rating);

Rating.belongsTo(Store);


// ==========================
// Database Sync
// ==========================

sequelize
  .sync()
  .then(() => {

    console.log("Database Connected");

    app.listen(process.env.PORT, () => {

      console.log(
        `Server running on port ${process.env.PORT}`
      );

    });

  })
  .catch((err) => {

    console.log(err);

  });