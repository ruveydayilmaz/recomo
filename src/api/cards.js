import axios from 'axios';

/**
 * Uploads a card image file to Cloudinary.
 *
 * @param {File} file - The card image file to upload.
 * @returns {Promise<Object>} A promise that resolves to the response object from Cloudinary.
 */
export const uploadCard = async (file) => {
  // Cloudinary API endpoint and configuration
  const cloudinaryURL = `https://api.cloudinary.com/v1_1/dotmfr2tn/image/upload`;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const preset = import.meta.env.VITE_CLOUDINARY_PRESET;

  // Generate a unique identifier for the uploaded file
  const currentDate = new Date();
  const dateString = currentDate.toISOString().replace(/[-:.TZ]/g, '');

  // Prepare form data for the file upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('public_id', dateString);
  formData.append('upload_preset', preset);
  formData.append('folder', 'recomo');

  // Perform the file upload using Axios
  const response = await axios.post(cloudinaryURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
