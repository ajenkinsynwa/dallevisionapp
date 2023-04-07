// Import required modules
import express from 'express'; // Express.js for creating web server
import * as dotenv from 'dotenv'; // dotenv for managing environment variables
import { Configuration, OpenAIApi } from 'openai'; // openai package for connecting to OpenAI API

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express.js router
const router = express.Router();

// Configure OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store API key in environment variable
});

// Create an instance of the OpenAI API
const openai = new OpenAIApi(configuration);

// Define a route for handling GET requests
router.route('/').get((req, res) => {
  // Return a JSON response with a greeting message
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

// Define a route for handling POST requests
router.route('/').post(async (req, res) => {
  try {
    // Extract the prompt string from the request body
    const { prompt } = req.body;

    // Use the OpenAI API to create an image based on the prompt
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    // Extract the base64-encoded image data from the API response
    const image = aiResponse.data.data[0].b64_json;

    // Return a JSON response with the image data
    res.status(200).json({ photo: image });
  } catch (error) {
    // Log any errors to the console
    console.error(error);
    // Return an error message as the response
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

// Export the router for use in other modules
export default router;
