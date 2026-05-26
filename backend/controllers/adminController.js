const User = require("../models/User");

const Store = require("../models/Store");

const Rating = require("../models/Rating");

exports.getDashboardData =
async (req, res) => {

  try {

    const totalUsers =
    await User.count();

    const totalStores =
    await Store.count();

    const totalRatings =
    await Rating.count();

    res.status(200).json({

      totalUsers,

      totalStores,

      totalRatings,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};