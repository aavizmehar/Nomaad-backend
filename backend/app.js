const express = require('express');
require('./config/db');
const cors = require('cors');
require('dotenv').config();
require('./models/Association.model');
var cookieParser = require('cookie-parser')

const app = express();
const allowedOrigins = [
    process.env.CORS_ORIGIN,
    "https://www.nomaadyaatra.com",
    "https://nomaad-frontend.vercel.app/"
];

// middlewares
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },

    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser());

// routes
const userRouter = require('./routes/user.routes.js');
const hostRouter = require('./routes/host.routes.js');
const volunteerRouter = require('./routes/volunteer.routes.js');
const programPublicRouter = require('./routes/program.public.routes.js');
const programHostRouter = require('./routes/program.host.routes.js');
const adminRouter = require('./routes/admin.routes.js');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/host', hostRouter);
app.use('/api/v1/volunteer', volunteerRouter);
app.use('/api/v1/programs', programPublicRouter);
app.use('/api/v1/host/programs', programHostRouter);
app.use('/api/v1/admin', adminRouter);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;