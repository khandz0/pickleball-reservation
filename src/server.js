require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(cors());
const authRoutes = require('../routes/auth'); // Ensure correct path
app.use('/auth', authRoutes);
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Pickleball Court Reservation API is running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
