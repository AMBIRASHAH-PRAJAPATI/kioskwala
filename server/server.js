require("dotenv").config()
const express = require('express');
const cors = require("cors")
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const banksRoute = require("./router/banks-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

// cors
const corsOptions = {
    origin: "https://kioskwala.vercel.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true, // Corrected property name
};

app.use(cors(corsOptions));

app.use(express.json());

// Mount the router: to use main express app, at specific url
app.use("/api/auth", authRoute );
app.use("/api/form", contactRoute );
app.use("/api/data", banksRoute);
// admin route
app.use("/api/admin", adminRoute);

// for error handling express
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
});


