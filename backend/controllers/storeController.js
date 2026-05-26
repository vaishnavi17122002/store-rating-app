const Store = require("../models/Store");

const Rating = require("../models/Rating");

exports.addStore = async (req, res) => {

  try {

    const store =
      await Store.create(req.body);

    res.status(201).json({

      message:
        "Store Added Successfully",

      store,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

exports.getStores = async (req, res) => {

  try {

    const stores =
      await Store.findAll({

        include: Rating,

      });

    const updatedStores =
      stores.map((store) => {

        const ratings =
          store.Ratings;

        let avgRating = 0;

        if (ratings.length > 0) {

          const total =
            ratings.reduce(

              (sum, item) =>
                sum + item.rating,

              0
            );

          avgRating =
            total / ratings.length;

        }

        return {

          ...store.toJSON(),

          averageRating:
            avgRating.toFixed(1),

        };

      });

    res.status(200).json(
      updatedStores
    );

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};