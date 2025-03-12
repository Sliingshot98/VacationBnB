'use strict';
let options = {}
options.tableName = 'Reviews';
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
 
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(options, "numReviews",{
      type: Sequelize.FLOAT,
      allowNull:true,
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, "numReviews", {}
    );
  }
};

