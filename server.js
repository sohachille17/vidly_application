require("dotenv").config()
const morgan = require("morgan");

const express = require("express");
const app = express();
const homeRoutes = require('./routes/home.routes');
const customerRoutes = require("./routes/customer.routes");
const movieRoutes = require("./routes/movie.routes");
const genreRoutes = require("./routes/genre.routes");
const rentalRoutes = require("./routes/rental.routes");
const userRoutes = require("./routes/user.routes");
const {dbConnection} = require("./database/connection");
// use connection
dbConnection;
// build in middlewares
app.use(morgan('tiny'));
app.use(express.json());

// routes middlewares
app.use(homeRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/rental", rentalRoutes);
app.use("/api/v1/user", userRoutes);



//Listing to running server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}`);
})
