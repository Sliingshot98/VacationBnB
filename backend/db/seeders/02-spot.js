"use strict";

const { Spot } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
  options.validate = true;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "1 Canal St",
          city: "New Orleans",
          state: "Louisiana",
          country: "Unites States of America",
          lat: 3.14152965,
          lng: 3.14152965,
          name: "Audubon Aquarium",
          description:
            "The Audubon Aquarium, located along the Mississippi River in New Orleans, offers an immersive journey into the underwater world, showcasing the diverse ecosystems of the Gulf of Mexico and beyond. This captivating attraction features a vast array of marine life, from playful sea otters and mesmerizing jellyfish to majestic sharks and vibrant coral reefs. Visitors can explore meticulously crafted habitats, including a walk-through tunnel that provides a breathtaking view of the Gulf's marine inhabitants. With a strong emphasis on education and conservation, the Audubon Aquarium strives to foster a deeper understanding of aquatic ecosystems and the importance of protecting our oceans, making it a memorable and enriching experience for visitors of all ages.",
          price: 1000,
          avgRating: 4,
          previewImage:
            "https://content.presspage.com/uploads/1794/1920_aquariumexterior-3.jpg?45363",
        },
        {
          ownerId: 2,
          address: "42273 Southern Pines blvd",
          city: "Ponchatoula",
          state: "Louisiana",
          country: "United States of America",
          lat: 72.248,
          lng: 125.245,
          name: "Home away from home",
          description:
            "42273 Southern Pines Blvd, Ponchatoula, LA 70454, is a residential address likely located within a suburban or semi-rural setting. Ponchatoula, known as the Strawberry Capital of the World, is a small city in Louisiana, suggesting this address is within a community that values a slower pace of life. The Southern Pines name implies the presence of pine trees in the surrounding environment, typical of the region's landscape. Given the boulevard designation, the street may be a wider, more prominent thoroughfare within the neighborhood. The address itself represents a single-family home or possibly a small development, situated within the quiet, community-oriented atmosphere characteristic of Ponchatoula.",
          price: 1500.0,
          avgRating: 5,
          previewImage:
            "https://ssl.cdn-redfin.com/photo/166/bigphoto/319/2238319_2.jpg",
        },
        {
          ownerId: 3,
          address: "1600 Pennsylvania Avenue NW",
          city: "Washington",
          state: "DC",
          country: "United States of America",
          lat: 38.8977,
          lng: -77.03656,
          name: "White House",
          description:
            "The White House, located at 1600 Pennsylvania Avenue in Washington, D.C., stands as the iconic residence and principal workplace of the President of the United States. Its neoclassical architecture and storied history have made it a symbol of American power and democracy. Beyond its function as a government building, the White House serves as a stage for significant national and international events, from state dinners and diplomatic meetings to presidential addresses and holiday celebrations. Within its walls, the President and First Family reside, navigating the complexities of leadership while maintaining a sense of home. The White House, with its meticulously manicured grounds and carefully preserved historic rooms, is a living museum, reflecting the changing tides of American history and the enduring spirit of the nation.",
          price: 10000.0,
          avgRating: 3,
          previewImage:
            "https://cdn.britannica.com/43/93843-050-A1F1B668/White-House-Washington-DC.jpg",
        },
        {
          ownerId: 4,
          address: "900 ohio drive",
          city: "Washington",
          state: "DC",
          country: "United States of America",
          lat: 38.8813,
          lng: -77.0365,
          name: "Jefferson Memorial",
          description:
            "The Jefferson Memorial, a graceful and dignified structure in Washington, D.C., honors the third President of the United States, Thomas Jefferson, and his enduring contributions to American ideals. 1  Its circular, domed design, reminiscent of the Roman Pantheon, reflects Jefferson's admiration for classical architecture. 2  Inside, a towering bronze statue of Jefferson gazes thoughtfully toward the Tidal Basin, while excerpts from the Declaration of Independence, which he primarily authored, are inscribed on the memorial's interior walls. 3  The memorial's location, surrounded by cherry blossom trees that bloom each spring, adds to its serene and contemplative atmosphere. 4  More than just a monument, the Jefferson Memorial serves as a reminder of the principles of liberty, equality, and democracy that Jefferson championed, inviting visitors to reflect on the enduring relevance of his vision for the nation",
          price: 500.0,
          avgRating: 4,
          previewImage:
            "https://www.nps.gov/common/uploads/grid_builder/thje/crop16_9/A8A9235B-1DD8-B71B-0BC0B5BD83666D32.jpg?width=640&quality=90&mode=crop",
        },
        {
          ownerId: 5,
          address: "2 lincoln Memorial Cir NW",
          city: "Washington",
          state: "DC",
          country: "United States of America",
          lat: 38.8893,
          lng: -77.0502,
          name: "lincoln Memorial",
          description:
            "The Lincoln Memorial, a neoclassical masterpiece in Washington D.C., stands as a solemn and majestic tribute to the 16th President of the United States, Abraham Lincoln. Its imposing white marble structure houses a colossal statue of Lincoln, his gaze fixed thoughtfully across the Reflecting Pool towards the Washington Monument. The memorial's interior walls are inscribed with Lincoln's second inaugural address and the Gettysburg Address, powerful reminders of his leadership during a pivotal time in American history. The Lincoln Memorial is not merely a monument; it's a symbol of unity, perseverance, and the enduring ideals of democracy. Its steps have been the backdrop for countless historic moments, from Martin Luther King Jr.'s I Have a Dream speech to gatherings of citizens seeking inspiration and solace. The memorial's serene atmosphere and profound symbolism continue to resonate with visitors from around the world, making it a powerful and enduring testament to Lincoln's legacy.",
          price: 750.25,
          avgRating: 5,
          previewImage:
            "https://washington.org/sites/default/files/pixels.sh_visitors-to-the-lincoln-memorial-at-night_mydccool-via-crowdriff.jpg",
        },
        {
          ownerId: 6,
          address: "2703 Battleship Pkwy",
          city: "Mobile",
          state: "Alabama",
          country: "United States of America",
          lat: 30.41,
          lng: -88.01,
          name: "USS Alabama",
          description:
            "The USS Alabama, a majestic battleship anchored in Mobile Bay, Alabama, stands as a powerful symbol of American naval history and the sacrifices of those who served during World War II. This massive vessel, affectionately known as the Mighty A, boasts an impressive array of weaponry and a storied service record, having participated in numerous campaigns in the Pacific theater. Today, the USS Alabama Battleship Memorial Park offers visitors a unique opportunity to step back in time and explore the ship's decks, turrets, and living quarters, gaining insight into the daily lives of the sailors who called it home. Beyond the battleship itself, the park also showcases other military artifacts, including the submarine USS Drum and a collection of aircraft, making it a compelling destination for history enthusiasts and a poignant reminder of the nation's wartime heritage.",
          price: 55.0,
          avgRating: 5,
          previewImage:
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQLamzmVXTi32UUIAd0gbgOOoEEEsMPqVbUNmQwtq_SNkzIELqR38nAVZeE8MXXAL60bj927sfYR6s7zoW7osRZ6KqJhxK_ZtRzxUAJ3-unIogGEW1sQppzavNrJjTK1_Esw7MY_ti11Ky/s1600/battleship+1.jpg",
        },
        {
          ownerId: 7,
          address: "20403 Co rd 68",
          city: "Robertsdale",
          state: "Alabama",
          country: "United States of America",
          lat: 30.14152965,
          lng: -83.14152965,
          name: "Buc-ee's",
          description:
            "Buc-ee's transcends the typical gas station experience, morphing into a sprawling travel destination. These mega-sized centers, often record-holders for sheer size, boast a dizzying array of offerings, from hundreds of fuel pumps and burgeoning EV charging stations to an overwhelming selection of food and merchandise. Foodies revel in fresh barbecue, signature Beaver Nuggets, homemade fudge, and vast bakery selections, while shoppers peruse souvenirs, apparel, and home goods. Beyond the sheer volume, Buc-ee's is legendary for its immaculate restrooms and a vibrant, almost carnival-like atmosphere, all anchored by the iconic beaver mascot. Originating in Texas, Buc-ee's continues its expansion, bringing its unique blend of convenience, variety, and roadside charm to travelers across the Southern United States.",
          price: 800.0,
          avgRating: 4.5,
          previewImage:
            "https://bluebonnet.coop/sites/default/files/styles/focal_point_inpage_images/public/images/inpage/20240610_lhs_WorldsLargestBuc-ees.drone_.png?h=8b17d3df&itok=jbg8shB6",
        },
        {
          ownerId: 8,
          address: "615 pere Antonie Alley",
          city: "New Orleans",
          state: "Louisiana",
          country: "United States of America",
          lat: 32.14152965,
          lng: -90.14152965,
          name: "St. Louis Cathedral",
          description:
            "The St. Louis Cathedral, standing proudly in the heart of New Orleans' French Quarter, is a breathtaking architectural and historical landmark. Its elegant white facade, flanked by three soaring spires, overlooks Jackson Square, creating an iconic image synonymous with the city. As one of the oldest continuously operating cathedrals in the United States, it has witnessed centuries of New Orleans history, from French and Spanish colonial rule to its present-day vibrancy. Inside, the cathedral's ornate interior, adorned with stained glass windows, intricate murals, and vaulted ceilings, evokes a sense of awe and reverence. Beyond its religious significance, the St. Louis Cathedral serves as a cultural beacon, attracting visitors from around the world who come to admire its beauty and experience a tangible connection to the city's rich past.",
          price: 1200.0,
          avgRating: 3.5,
          previewImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrFolb08nliBZLgvjEuKmZD-nYogZVN1OWMw&s",
        },
        {
          ownerId: 9,
          address: "1500 sugar Bowl Drive",
          city: "New Orleans",
          state: "Louisiana",
          country: "United States of America",
          lat: 35.14152965,
          lng: -90.14152965,
          name: "Caesars Superdome",
          description:
            "The Caesars Superdome, an iconic landmark in New Orleans, stands as a testament to architectural ingenuity and the city's passion for sports and entertainment. Originally known as the Louisiana Superdome, this massive domed stadium has hosted a multitude of historic events, from Super Bowls and NCAA Final Fours to legendary concerts and political conventions. Its distinctive silver exterior and vast interior have made it a symbol of New Orleans resilience, particularly after its use as a shelter during Hurricane Katrina. Today, the Superdome continues to be a vibrant hub, serving as the home of the New Orleans Saints and drawing millions of visitors annually to experience the excitement and spectacle within its walls.",
          price: 2800.0,
          avgRating: 2.8,
          previewImage:
            "https://facilitiesmanagementadvisor.blr.com/app/uploads/sites/8/2025/02/Caesars-Superdome-768x512.png",
        },
        {
          ownerId: 10,
          address: "6500 Magazine Street",
          city: "New Orleans",
          state: "Louisiana",
          country: "United States of America",
          lat: 38.14152965,
          lng: -80.14152965,
          name: "Audubon Zoo",
          description:
            "Nestled within the lush expanse of Audubon Park in Uptown New Orleans, the Audubon Zoo offers a captivating experience that blends natural beauty with wildlife conservation. This beloved institution is home to a diverse collection of animals from around the globe, presented in thoughtfully designed habitats that prioritize animal welfare. Beyond its role as a recreational destination, the Audubon Zoo is deeply committed to education and conservation, engaging visitors with immersive exhibits and programs that highlight the importance of protecting our planet's biodiversity. With its historic oak trees, picturesque landscapes, and a strong focus on both local and global wildlife, the Audubon Zoo provides a memorable and enriching experience for visitors of all ages.",
          price: 700.0,
          avgRating: 1.5,
          previewImage:
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/6f/a2/5b/photo2jpg.jpg?w=900&h=500&s=1",
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, {}, {});
  },
};
