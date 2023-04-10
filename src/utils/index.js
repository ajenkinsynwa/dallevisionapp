import { surpriseMePrompts } from '../constants'; // Importing a list of prompts from a file located in a parent directory
import FileSaver from 'file-saver'; // Importing the FileSaver library

// This function takes a prompt as a parameter and returns a random prompt from the list of prompts, except for the one passed as an argument
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length); // Generating a random index within the range of the surpriseMePrompts array
  const randomPrompt = surpriseMePrompts[randomIndex]; // Retrieving a random prompt from the array using the random index

  if (randomPrompt === prompt) return getRandomPrompt(prompt); // If the retrieved prompt is the same as the one passed as an argument, recursively call the function until a different prompt is returned

  return randomPrompt; // Return the random prompt that was retrieved
}

// This function downloads an image file and saves it with a file name that includes an id in the format "download-<id>.jpg"
export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`); // Using the FileSaver library to save the file with the specified file name
}
