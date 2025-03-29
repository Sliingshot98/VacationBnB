"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
  options.validate = true;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://content.presspage.com/uploads/1794/1920_aquariumexterior-3.jpg?45363",
          preview: "true",
        },
        {
          spotId: 2,
          url: "https://ssl.cdn-redfin.com/photo/166/bigphoto/319/2238319_2.jpg",
          preview: "true",
        },
        {
          spotId: 3,
          url: "https://cdn.britannica.com/43/93843-050-A1F1B668/White-House-Washington-DC.jpg",
          preview: "true",
        },
        {
          spotId: 4,
          url: "https://www.nps.gov/common/uploads/grid_builder/thje/crop16_9/A8A9235B-1DD8-B71B-0BC0B5BD83666D32.jpg?width=640&quality=90&mode=crop",
          preview: "true",
        },
        {
          spotId: 5,
          url: "https://washington.org/sites/default/files/pixels.sh_visitors-to-the-lincoln-memorial-at-night_mydccool-via-crowdriff.jpg",
          preview: "true",
        },
        {
          spotId: 6,
          url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQLamzmVXTi32UUIAd0gbgOOoEEEsMPqVbUNmQwtq_SNkzIELqR38nAVZeE8MXXAL60bj927sfYR6s7zoW7osRZ6KqJhxK_ZtRzxUAJ3-unIogGEW1sQppzavNrJjTK1_Esw7MY_ti11Ky/s1600/battleship+1.jpg",
          preview: "true",
        },
        {
          spotId: 7,
          url: "https://bluebonnet.coop/sites/default/files/styles/focal_point_inpage_images/public/images/inpage/20240610_lhs_WorldsLargestBuc-ees.drone_.png?h=8b17d3df&itok=jbg8shB6",
          preview: "true",
        },
        {
          spotId: 8,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrFolb08nliBZLgvjEuKmZD-nYogZVN1OWMw&s",
          preview: "true",
        },
        {
          spotId: 9,
          url: "https://facilitiesmanagementadvisor.blr.com/app/uploads/sites/8/2025/02/Caesars-Superdome-768x512.png",
          preview: "true",
        },
        {
          spotId: 10,
          url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/6f/a2/5b/photo2jpg.jpg?w=900&h=500&s=1",
          preview: "true",
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, {}, {});
  },
};
