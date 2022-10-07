const server = require("./src/app");
const { database } = require("./src/db");

server.listen("3001", async () => {
  //   await database.sync();
  await database.sync({ force: true }); // eliminar todas las tablas y volverlas a crear com estén definidas en el modelo
  //   await database.sync({alter:true}); // modificar las tablas ya existentes en base a como estén definidas en el modelo
  console.log("listening on port 3001");
});
