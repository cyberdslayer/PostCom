# Postcom 📱💬

Postcom is a modern social media platform built with Next.js, React, Node.js, and Express.js. It allows users to sign in, create posts, and comment on posts with rich text formatting options.

## 🌐 Live Demo

Check out the live application: [Postcom](https://post-com.vercel.app/)

## 🚀 Features

- 🔐 User authentication
- ✍️ Create and view posts
- 💬 Comment on posts
- 🖋️ Rich text editing for posts and comments (bold, italic, underline, links)
- 📱 Responsive design
- 🔥 Firebase integration
- 🗄️ MongoDB for data storage

## 🛠️ Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS

## 📁 Project Structure

```
post-com/
├── .next/
├── app/
│   ├── (dashboard)/
│   ├── api/
│   ├── auth/
│   ├── fonts/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── postcom-sidebar.tsx
│   └── skeleton-loader.tsx
├── context/
│   └── AuthContext.js
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── db/
│   └── firebase/
├── models/
├── public/
├── .env
├── .eslintrc.json
├── components.json
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB account
- Firebase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/post-com.git
   cd post-com
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/your-username/post-com/issues).

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

## 🙏 Acknowledgements

- Next.js team for the amazing framework
- shadcn/ui for beautiful UI components
- Firebase team for authentication solutions
- MongoDB team for the powerful database system
