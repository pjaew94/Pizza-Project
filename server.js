const express = require('express');
const app = express();
// const path = require("path");
const aws = require('./routes/api/aws')

const connectDB = require('./config/db');

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/menu", require("./routes/api/menu"));
app.post('/api/aws', aws.uploadImageToS3)




const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));