const express = require("express");
const morgan = require("morgan");
const { User, Post, Page } = require("./db");

const server = express();
server.use(express.json());
server.use(morgan("dev"));

//******************************** */ GET ////

server.get("/users", async (req, res) => {
  try {
    const { name, last_name } = req.query;

    if (!name) {
      const users = await User.findAll({
        attributes: ["id", "name", "last_name"],
        include: [
          {
            model: Page,
            attributes: ["page_name"],
          },
        ],
        // attributes: { exclude: ["birth"] },
      });
      return res.status(200).send(users);
    } else {
      const users = await User.findAll({
        where: { name, last_name },
      });
      return res.status(200).send(users);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.get("/users/findOrCreate", async (req, res) => {
  try {
    const { name, last_name, birth } = req.body;

    const user = await User.findOrCreate({
      where: { name },
      defaults: {
        last_name,
        birth,
      },
    });

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) throw new Error("user does not exist");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// *//////////////////POST

server.post("/users", async (req, res) => {
  // crear un usuario en la base de datos
  try {
    const { name, last_name, birth, pages } = req.body;
    const newUser = await User.create({ name, last_name, birth });
    await newUser.addPages(pages);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.post("/users/bulk", async (req, res) => {
  try {
    const data = req.body;
    const newUsers = await User.bulkCreate(data);
    res.status(201).send(newUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.delete("/users", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({
      where: { id },
    });
    await user.destroy();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.post("/posts", async (req, res) => {
  try {
    const { title, userId, contents } = req.body;

    const newPost = await Post.create({ title, contents });

    await newPost.setUser(userId);

    res.status(200).send(newPost);

    // const user = await User.findByPk(userId)
    // user.addPosts([4,5,6])
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.post("/pages", async (req, res) => {
  const data = req.body;
  const newPages = await Page.bulkCreate(data);
  res.send(newPages);
});

module.exports = server;
