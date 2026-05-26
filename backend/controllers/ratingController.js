const Rating = require("../models/Rating");

exports.submitRating = async (req, res) => {

  try {

    const { rating, storeId } = req.body;

    if (!storeId) {
      return res.status(400).json({ message: "storeId is required" });
    }

    if (req.user.role !== "USER" && req.user.role !== "STORE_OWNER") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const parsedRating = Number(rating);
    const parsedStoreId = Number(storeId);

    if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        message: "Rating must be an integer between 1 and 5",
      });
    }

    if (!Number.isInteger(parsedStoreId)) {
      return res.status(400).json({
        message: "Invalid storeId",
      });
    }

    const existingRating = await Rating.findOne({
      where: {
        userId: req.user.id,
        storeId: parsedStoreId,
      },
    });

    if (existingRating) {
      existingRating.rating = parsedRating;
      await existingRating.save();
      return res.status(200).json({
        message: "Rating Updated Successfully",
      });
    }

    await Rating.create({
      rating: parsedRating,
      userId: req.user.id,
      storeId: parsedStoreId,
    });

    return res.status(201).json({
      message: "Rating Submitted Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

};

