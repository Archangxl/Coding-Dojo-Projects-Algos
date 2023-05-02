const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
require('./config/mongoose.config');

app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const UserRoutes = require('./routes/userRoutes');

UserRoutes(app);

app.listen(8000, () => console.log('The server is all fired up on port 8000!'));