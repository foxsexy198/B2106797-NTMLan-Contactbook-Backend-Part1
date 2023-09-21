const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Welcome to contact book application."});
});

app.use("/api/contacts", contactsRouter);

app.use("/api/contacts", contactsRouter);

// Handle 404 response
app.use((req, res, next) => {
    // Code se chay khi khong co route nao duoc dinh nghia khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, "Resource not found"));
});

// Dinh nghia error-handling middleware, sau khi goi app.use() va routes
app.use((ApiError, req, res, next) => {
    // Middleware xu ly loi tap trung. Trong cac doan code xu ly o cac route, goi next(error) se chuyen ve middleware xu ly loi nay
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});



module.exports = app;
