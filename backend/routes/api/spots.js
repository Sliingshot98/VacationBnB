const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  Review,
  SpotImage,
  Booking,
  User,
  ReviewImage,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const router = express.Router();

const validateReview = [
  check("review")
    .exists({ checkFalsey: true })
    .withMessage("Review text is required"),

  check("stars")
    .exists({ checkFalsey: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start date is required")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("startDate cannot be in the past");
      }
      return true;
    }),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("End date is required")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("endDate cannot be on or before startDate");
      }

      return true;
    }),
  handleValidationErrors,
];

// Middleware to check for booking conflicts

const checkBookingConflicts = async (req, res, next) => {
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;

  const conflictingBookings = await Booking.findAll({
    where: {
      spotId,
      [Op.or]: [
        { startDate: { [Op.between]: [startDate, endDate] } },
        { endDate: { [Op.between]: [startDate, endDate] } },
      ],
    },
  });

  if (conflictingBookings.length > 0) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  next();
};

//Add Query Filters to get all Spots + GET ALL SPOTS
router.get("/", async (req, res, next) => {
  const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  let { page, size } = req.query;
  const where = {};
  // Add filters based on query parameters
  if (page && page < 1) page = 1;
  if (page && page > 10) page = 10;
  if (size && size > 20) size = 20;
  if (size && size < 10) size = 10;
  if (minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
  if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
  if (minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
  if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
  if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
  if (maxPrice)
    where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

  try {
    const spots = await Spot.findAll({
      where,
      limit: size,
      offset: page && size ? (page - 1) * size : undefined,
    });
    return res.json({ Spots: spots });
  } catch (err) {
    next(err);
  }
});
// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;

  try {
    const spots = await Spot.findAll({
      where: { ownerId: user.id },
    });
    return res.json({ Spots: spots });
  } catch (err) {
    next(err);
  }
});

// Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);
  if (isNaN(spotId)) {
    next();
  }
  try {
    const spot = await Spot.findByPk(spotId, {
      include: [
        { model: Review, include: [User] },
        SpotImage,
        { model: User.scope("defaultScope", "owner"), as: "Owner" },
      ],
    });
    if (!spot) {
      res.status(404).json({ message: "Spot couldn't be found" });
    }
    res.json({ Spot: spot });
  } catch (err) {}
});

// Create a Spot
router.post("/", requireAuth, async (req, res, next) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
    user,
    imageData,
  } = req.body;

  // Validation Errors
  const errors = {};
  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Country is required";
  if (lat === undefined || lat < -90 || lat > 90)
    errors.lat = "Latitude must be within -90 and 90";
  if (lng === undefined || lng < -180 || lng > 180)
    errors.lng = "Longitude must be within -180 and 180";
  if (!name || name.length > 50)
    errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (price === undefined || price <= 0)
    errors.price = "Price per day must be a positive number";
  if (!previewImage) errors.previewImage = "Preview Image is required";

  // If any errors exist, return a 400 response
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors,
    });
  }
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  });
  let tempArry = [];
  for (let key in imageData) {
    imageData[key].preview = false;
    imageData[key].spotId = newSpot.id;
    tempArry.push(imageData[key]);
  }
  const createdImages = await SpotImage.bulkCreate(tempArry);
  return res.status(201).json({ newSpot, createdImages, User: user });
});

//EDIT A SPOT
router.put("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
    images,
  } = req.body;

  const spot = await Spot.findByPk(spotId, { include: [SpotImage] });
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Check if the current user is the owner of the spot
  if (spot.ownerId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // Validate input fields
  const errors = {};
  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Country is required";
  if (lat === undefined || lat < -90 || lat > 90)
    errors.lat = "Latitude must be within -90 and 90";
  if (lng === undefined || lng < -180 || lng > 180)
    errors.lng = "Longitude must be within -180 and 180";
  if (!name || name.length > 50)
    errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (price === undefined || price <= 0)
    errors.price = "Price per day must be a positive number";
  if (!previewImage) errors.previewImage = "Preview Image is required";
  // If any errors exist, return a 400 response
  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      message: "Bad Request",
      errors,
    });
  }

  const savedSpot = await Spot.update(
    {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    },
    { where: { id: spotId } }
  );
  for (let key in images) {
    images[key].spotId = spot.id;
    await SpotImage.update({ ...images[key] });
  }
  const updatedSpot = await Spot.findByPk(spotId, { include: [SpotImage] });
  res.status(200).json(updatedSpot);
});

// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check if the current user is the owner of the spot
    if (spot.ownerId !== user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await spot.destroy();
    return res.json({ message: "Successfully deleted", id: spot.id });
  } catch (err) {
    next(err);
  }
});

//creating a spot image
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);
  const { url, preview } = req.body;
  const theSpot = await Spot.findByPk(spotId);
  if (!theSpot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  if (theSpot.ownerId === req.user.id) {
    const newSpotImage = await SpotImage.create({
      url,
      preview,
      spotId,
    });

    res.status(201).json({
      id: newSpotImage.id,
      url: newSpotImage.url,
      preview: newSpotImage.preview,
    });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

//Get all reviews by a spots id
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = parseInt(req.params.spotId);

  const spot = await Spot.findByPk(spotId, {
    include: [SpotImage, { model: Review.scope("defaultScope") }],
  });
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }

  const reviews = await Review.findAll({
    where: { spotId },
    include: [{ model: User.scope("defaultScope", "owner") }, ReviewImage],
  });

  res.json({ Reviews: reviews });
});

// Get all Bookings for a spot based on the Spot's Id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);
  const { user } = req;

  const spot = await Spot.findByPk(spotId, { include: [Booking] });
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (user.id !== spot.ownerId) {
    const tempArry = [];
    for (let i = 0; i < spot.Bookings.length; i++) {
      const curr = spot.Bookings[i];
      const { spotId, startDate, endDate } = curr;
      tempArry.push({ spotId, startDate, endDate });
    }
    res.status(200).json({ Bookings: tempArry });
  } else {
    const tempArry = [];
    const { id, firstName, lastName } = user;
    for (let i = 0; i < spot.Bookings.length; i++) {
      const curr = spot.Bookings[i].toJSON();
      tempArry.push({ User: { id, firstName, lastName }, ...curr });
    }
    res.status(200).json({ Bookings: tempArry });
  }
});

// Create a new booking at a spot based on the spotId

router.post(
  "/:spotId/bookings",
  requireAuth,
  validateBooking,
  checkBookingConflicts,
  async (req, res) => {
    const { id } = req.user;
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const newBooking = await Booking.create({
      spotId,
      userId: id,
      startDate,
      endDate,
    });

    res.status(200).json(newBooking);
  }
);
//create a review for a spot based on the spots id
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res) => {
    const userId = req.user.id;
    const spotId = parseInt(req.params.spotId);
    const { review, stars } = req.body;

    const [theReview, created] = await Review.findOrCreate({
      where: { spotId, userId, review, stars },
      defaults: { spotId, userId, review, stars },
    });

    if (!created) {
      res
        .status(500)
        .json({ message: "User already has a review for this spot" });
    }
    res.status(201).json(theReview);
  }
);

module.exports = router;
