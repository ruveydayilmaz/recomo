import axios from 'axios';

export const uploadCard = async (file) => {
  const cloudinaryURL = `https://api.cloudinary.com/v1_1/dotmfr2tn/image/upload`;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const preset = import.meta.env.VITE_CLOUDINARY_PRESET;

  const currentDate = new Date();
  const dateString = currentDate.toISOString().replace(/[-:.TZ]/g, '');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('public_id', dateString);
  formData.append('upload_preset', preset);
  formData.append('folder', 'recomo');

  const response = await axios.post(cloudinaryURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};