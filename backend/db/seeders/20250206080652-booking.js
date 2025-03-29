"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
  options.validate = true;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date(),
          endDate: "2025-05-15T08:12:00.000Z",
        },
        {
          spotId: 2,
          userId: 1,
          startDate: "2025-05-14T08:12:00.000Z",
          endDate: "2025-05-20T08:12:00.000Z",
        },
        {
          spotId: 3,
          userId: 1,
          startDate: "2025-05-13T08:12:00.000Z",
          endDate: "2025-05-28T08:12:00.000Z",
        },
        {
          spotId: 4,
          userId: 4,
          startDate: "2025-05-15T08:12:00.000Z",
          endDate: "2025-05-17T08:12:00.000Z",
        },
        {
          spotId: 5,
          userId: 4,
          startDate: "2025-05-16T08:12:00.000Z",
          endDate: "2025-05-17T08:12:00.000Z",
        },
        {
          spotId: 6,
          userId: 8,
          startDate: "2025-05-18T08:12:00.000Z",
          endDate: "2025-05-19T08:12:00.000Z",
        },
        {
          spotId: 7,
          userId: 9,
          startDate: "2025-05-20T08:12:00.000Z",
          endDate: "2025-05-21T08:12:00.000Z",
        },
        {
          spotId: 8,
          userId: 9,
          startDate: "2025-05-23T08:12:00.000Z",
          endDate: "2025-05-25T08:12:00.000Z",
        },
        {
          spotId: 9,
          userId: 7,
          startDate: "2025-05-24T08:12:00.000Z",
          endDate: "2025-05-26T08:12:00.000Z",
        },
        {
          spotId: 10,
          userId: 10,
          startDate: "2025-05-25T08:12:00.000Z",
          endDate: "2025-05-27T08:12:00.000Z",
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, {}, {});
  },
};
