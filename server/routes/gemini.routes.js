import express from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const router = express.Router();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.route('/').get((req, res) => {
   res.status(200).json({message: "Hello from Gemini Image Generation ROUTES"});
});

router.route('/').post(async (req, res) => {
   try {
      // Get the prompt from the request body
      const { prompt } = req.body;

      // Initialize the Gemini model for image generation
      const model = genAI.getGenerativeModel({
         model: "gemini-3.1-flash-image-preview",
      });

      // Generate image with Gemini API
      const result = await model.generateContent(prompt);

      const response = await result.response;

      // Extract base64 image data from response
      let imageBase64 = null;

      if (response.candidates && response.candidates[0]) {
         const parts = response.candidates[0].content.parts;
         for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
               imageBase64 = part.inlineData.data;
               break;
            }
         }
      }

      // Send the image back to the client if the image is not null
      if (imageBase64) {
         res.status(200).json({ photo: imageBase64 });
      } else {
         res.status(500).json({ message: "[Error] Image couldn't be generated!" });
      }

   } catch (error) {
      console.error('Gemini API Error:', error);
      if (error.message) {
         console.log(error.message);
      }
      if (error.response) {
         console.log('Response status:', error.response.status);
         console.log('Response data:', error.response.data);
      }
      res.status(500).json({ message: "[Error] Something went wrong with image generation!" });
   }
});


export default router;