// Import necessary packages
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// Import database connection and routes
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app instance and add middleware
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

// Add routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Define root endpoint
app.get('/', async (req, res) => {
res.status(200).json({
message: 'Hello from DALL-E!',
});
});

// Start server and connect to database
const startServer = async () => {
try {
connectDB(process.env.MONGODB_URL);
app.listen(8080, () => console.log('Server started on port 8080'));
} catch (error) {
console.log(error);
}
};
startServer();
