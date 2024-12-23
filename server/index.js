const express = require('express');
const app = express();

const database = require('./config/database');

const userRoute = require('./routes/User')
const profileRoute = require('./routes/Profile');
const paymentRoutes = require('./routes/Payment')

require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const courseRoute = require('./routes/Course');


//connect database
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// file upload
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/profile' , profileRoute)
app.use('/api/v1/course' , courseRoute)
app.use("/api/v1/payment", paymentRoutes);


//default route
app.get("/", (req, res) => {
    return res.send("Server is up and running ")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})