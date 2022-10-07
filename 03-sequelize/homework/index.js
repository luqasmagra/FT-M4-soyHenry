const app = require("./server");
const { db } = require("./db/index");
const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await db.sync({ force: true });
});
