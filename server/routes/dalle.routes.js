import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
   res.status(200).json({message: "Hello from DALL.E ROUTES"});
});

router.route('/').post(async (req, res) => {
   try {
      //Get the prompt from the request body
      const { prompt } = req.body;

      //Call the OpenAI API to create an image
      const response = await openai.createImage({
         prompt: prompt,
         n:1,
         size: '1024x1024',
         response_format: 'b64_json'
      });

     

      //Get the image from the response
      const image = response.data.data[0].b64_json;

      //Send the image back to the client if the image is not null
      if(image){
         res.status(200).json({photo:image});
      }
      else{
         res.status(500).json({message: "[Error] Image couldn't be fetched!"});
      }

   } catch (error) {
      if (error.response) {
         console.log(error.response.status);
         console.log(error.response.data);
       } else {
         console.log(error.message);
       }
      res.status(500).json({message: "[Error] Something went wrong!"});
   }   
});


export default router;