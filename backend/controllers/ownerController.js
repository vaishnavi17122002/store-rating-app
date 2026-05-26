const Store = require("../models/Store");

const Rating = require("../models/Rating");

const User = require("../models/User");

exports.getOwnerDashboard =
  async (req, res) => {

    try {

      const store = await Store.findOne({
        where: {
          email: req.user.email,
        },
        include: [
          {
            model: Rating,
            include: [User],
          },
        ],
      });

      if (!store) {
        return res.status(404).json({
          message: "Store not found",
        });
      }

      // Average Rating
      let avgRating = 0;
      if (store.Ratings.length > 0) {
        const total = store.Ratings.reduce(
          (sum, item) => sum + item.rating,
          0
        );
        avgRating = total / store.Ratings.length;
      }

      return res.status(200).json({
        store,
        averageRating: avgRating.toFixed(1),
      });

    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

  };
