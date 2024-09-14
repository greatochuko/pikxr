# Pikxr

![Pikxr Logo](/images/homepage.png)

Pikxr is a social media web app designed to foster creativity and connections through visual storytelling. Built using the MERN stack, Pikxr allows users to share and interact with multimedia content in a seamless and engaging environment.

## Demo

Check out the live demo: [pikxr.onrender.com](https://pikxr.onrender.com)

## Features

- **User Authentication**: Secure login and registration with JWT.
- **Post Creation**: Users can create, edit, and delete multimedia posts.
- **Interactive Feed**: View and interact with posts through likes, comments, and shares.
- **Real-time Updates**: Instant updates using WebSocket for live interactions.
- **Responsive Design**: Optimized for both mobile and desktop devices.

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time**: WebSocket for live interactions
- **Deployment**: Render

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org) v14 or higher
- [Git](https://git-scm.com)

### Project Structure

```bash
.
├── client/              # Frontend React application
│   ├── src/             # React source code
│   └── public/          # Public static files
├── server/              # Backend Node.js application
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   └── controllers/     # Business logic
├── .env.example         # Example environment variables
└── README.md            # This file
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/greatochuko/pikxr-client.git
   cd pikxr-client
   ```

2. Install dependencies for both client and server:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables:

   Update `.env` with your MongoDB URI and JWT secrets.

   ```bash
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

4. Start the server:

   ```bash
   cd server
   npm run dev
   ```

5. Start the client:

   ```bash
   cd ../client
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the application in your browser.

## Deployment

Pikxr is deployed on [Render](https://render.com). To deploy your own version:

1. Push your code to a Git repository.
2. Create a new service on Render and connect it to your repository.
3. Set up environment variables in Render's settings.
4. Render will automatically build and deploy your app.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, open an issue first to discuss what you would like to change.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Great Ogheneochuko](https://github.com/greatochuko).