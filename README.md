# RecoMo
![284shots_so (1)](https://github.com/ruveydayilmaz/recomo/assets/74985368/547603d8-3862-42e2-b868-8271d5d812d3)

RecoMo is a web application that allows you to select your favorite movies, create a card, and share it with your friends! With RecoMo, you can showcase your movie recommendations in a visually appealing and interactive way.

## Features

- Select and add your favorite movies to your RecoMo collection.
- Customize the card layout and design to make it uniquely yours.
- Share your RecoMo card with friends through social media or direct links.

## Installation

To run RecoMo locally on your machine, follow these steps:

1. Clone the repository: `git clone https://github.com/ruveydayilmaz/recomo.git`
2. Navigate to the project directory: `cd recomo`
3. Create a .env file and add the following parameters: <br/>
  `VITE_DB_API_KEY` `VITE_CLOUDINARY_API_KEY` `VITE_CLOUDINARY_PRESET` `VITE_CLOUDINARY_URL`
5. Update the `cloudinaryURL` inside the api/cards.js file
6. Install the dependencies: `npm install`
7. Start the development server: `npm run dev`
8. Open your browser and visit: `http://localhost:5173`

## Technologies Used

RecoMo is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- HTML/CSS: Markup and styling for the web application.
- JavaScript: Programming language for client-side functionality.
- Vercel: Deployment platform for hosting the RecoMo application.

## Contributing

Contributions to RecoMo are welcome! If you have any improvements, or bug fixes, feel free to submit a pull request. Please ensure that your code adheres to the project's coding guidelines and conventions.

Happy movie recommending with RecoMo! 🎥🍿
