const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models/init");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const itemRoutes = require("./routes/items");
const stockRoutes = require("./routes/openingStock");
const importRoutes = require("./routes/imports");
const saleRoutes = require("./routes/sales");
const stockBalanceRoutes = require("./routes/stockBalance");

app.use("/items", itemRoutes);
app.use("/opening-stock", stockRoutes);
app.use("/imports", importRoutes);
app.use("/sales", saleRoutes);
app.use("/stock", stockBalanceRoutes);

// Sync and start
const PORT = process.env.PORT || 10000;
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });
});
