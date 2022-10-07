const { Sequelize } = require("sequelize");
const UserFunc = require("./models/User");
const PostFunc = require("./models/Post");
const PageFunc = require("./models/Page");
//
const user = "postgres";
const pass = "admin";
const dbname = "lecture";

const database = new Sequelize(
  `postgres://${user}:${pass}@localhost:5432/${dbname}`,
  { logging: false }
);

UserFunc(database);
PostFunc(database);
PageFunc(database);

console.log(database.models);
const { User, Post, Page } = database.models;

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Page, { through: "UserPage" });
Page.belongsToMany(User, { through: "UserPage" });

module.exports = { database, ...database.models };
