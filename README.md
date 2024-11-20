# Postcom 📱💬

Postcom is a modern social media platform that allows users to share posts and engage in discussions through comments. Built with Next.js, Firebase, and MongoDB, it offers a responsive and interactive user experience.

## Features 🚀

- 🔐 User authentication (sign up, login, logout)
- ✍️ Create and view posts
- 💬 Comment on posts
- 🖋️ Rich text editing for posts and comments
- 📱 Responsive design
- ⚡ Real-time updates
- 🗄️ Data persistence with MongoDB
- 🔥 Firebase integration for authentication and real-time features

## Tech Stack 💻

- **Frontend**: Next.js, React
- **Backend**: Node.js, Express
- **Authentication**: Firebase Authentication
- **Database**: MongoDB
- **Real-time Features**: Firebase Realtime Database
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Getting Started 🏁

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account
- MongoDB account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/postcom.git
   cd postcom
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up your Firebase project and obtain the configuration details.

4. Set up your MongoDB database and obtain the connection string.

5. Create a `.env.local` file in the root directory and add your configurations:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   MONGODB_URI=your_mongodb_connection_string
   ```

6. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment 🚀

The project is set up for easy deployment on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your main branch.

For other platforms, build the project using:

```
npm run build
# or
yarn build
```

And then deploy the `.next` folder according to your hosting provider's instructions.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.


## Acknowledgements 🙏

- Next.js team for the amazing framework
- Firebase team for authentication and real-time database solutions
- MongoDB team for the powerful database system
- shadcn/ui for beautiful UI components
- All contributors and supporters of the project
