Task Tracker CRUD Application
A full-stack task management application built with React, Node.js, Express, and Supabase. Create, read, update, and delete tasks with a clean and intuitive interface.
🚀 Live Demo
Deployed Application: https://alena-task-tracker.netlify.app

✨ Features
✅ Create new tasks with title and description
✅ Mark tasks as complete/incomplete
✅ Delete tasks
✅ Persistent storage with Supabase PostgreSQL database
✅ Responsive design
✅ Real-time updates
✅ RESTful API architecture

🛠️ Tech Stack
Frontend:

React.js
CSS3
Fetch API

Backend:

Node.js
Express.js
CORS

Database:

Supabase (PostgreSQL)

Deployment:

Frontend: Netlify
Backend: Render

📚 What I Learned
Building this project taught me:

Full-stack application architecture
RESTful API design and implementation
React state management with hooks (useState, useEffect)
Asynchronous JavaScript and Promises
Database integration with Supabase
Environment variable management
Git version control workflow
Deployment with Render and Netlify
CORS configuration for cross-origin requests
Error handling in both frontend and backend

🔮 Future Enhancements
Potential features to add:

 User authentication and authorization
 Task categories and tags
 Due dates and reminders
 Task search and filtering
 Edit task functionality
 Drag-and-drop task reordering
 Dark mode toggle
 Task statistics dashboard

📋 Prerequisites
Before running this project locally, make sure you have:

Node.js (v14 or higher)
npm (comes with Node.js)
A Supabase account (free tier available)

🔧 Local Setup Instructions
1. Clone the Repository
bashgit clone https://github.com/yourusername/task-tracker.git
cd task-tracker
2. Backend Setup
Install backend dependencies:
bashnpm install
Create a .env file in the root directory:
bashtouch .env
Add your Supabase credentials to .env:
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
To get your Supabase credentials:

Go to supabase.com and create a free account
Create a new project
Go to Settings → API
Copy your Project URL and anon/public key

3. Database Setup
In your Supabase project dashboard:

Go to the SQL Editor
Run this SQL command to create the tasks table:

sqlCREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

Go to Authentication → Policies
Disable Row Level Security (RLS) for the tasks table (or set up custom policies)

4. Frontend Setup
Navigate to the frontend directory and install dependencies:
bashcd frontend
npm install
Create a .env.local file in the frontend directory:
bashtouch .env.local
Add your backend URL:
REACT_APP_API_URL=http://localhost:3000
5. Run the Application
Terminal 1 - Start the backend server:
bash# From the root directory
npm run dev
The backend will run on http://localhost:3000
Terminal 2 - Start the frontend:
bash# From the root directory
cd frontend
npm start
The frontend will run on http://localhost:3001
6. Open in Browser
Visit http://localhost:3001 to see your app running locally!
📁 Project Structure
task-tracker/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── db.js               # Supabase client setup
│   └── routes/
│       └── tasks.js        # Task CRUD endpoints
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styles
│   │   └── index.js        # React entry point
│   ├── package.json
│   └── .env.local          # Frontend environment variables
├── package.json            # Backend dependencies
├── .env                    # Backend environment variables
├── .gitignore
└── README.md
🔌 API Endpoints
MethodEndpointDescriptionGET/tasksGet all tasksPOST/tasksCreate a new taskPATCH/tasks/:idToggle task completion statusDELETE/tasks/:idDelete a task
Example API Requests
Get all tasks:
bashGET http://localhost:3000/tasks
Create a task:
bashPOST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
Toggle completion:
bashPATCH http://localhost:3000/tasks/1
Delete a task:
bashDELETE http://localhost:3000/tasks/1
🎨 Features in Detail
Task Creation

Enter task title (required) and optional description
Submit via button or Enter key
Form clears automatically after submission

Task Management

Click checkbox to toggle completion status
Completed tasks show strikethrough styling
Delete button removes tasks permanently

Data Persistence

All tasks stored in Supabase PostgreSQL database
Automatic timestamps for task creation
Data persists across browser sessions

🚀 Deployment
Deploy Backend to Render

Create a new Web Service on Render
Connect your GitHub repository
Set build command: npm install
Set start command: node src/server.js
Add environment variables:

SUPABASE_URL
SUPABASE_ANON_KEY
PORT=3000



Deploy Frontend to Netlify

Update frontend/src/App.js to use deployed backend URL
Create .env.production in frontend directory:

   REACT_APP_API_URL=https://your-backend-url.onrender.com

Build the frontend: cd frontend && npm run build
Connect your GitHub repo to Netlify
Set build command: cd frontend && npm run build
Set publish directory: frontend/build

🐛 Troubleshooting
Backend won't start:

Check that .env file exists with correct Supabase credentials
Verify Port 3000 isn't already in use
Run npm install to ensure dependencies are installed

Frontend can't connect to backend:

Verify backend is running on port 3000
Check REACT_APP_API_URL in .env.local
Check browser console for CORS errors

Database errors:

Verify Supabase credentials are correct
Check that tasks table exists in Supabase
Ensure RLS is disabled or properly configured

Deployment issues:

Hard refresh browser with Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
Check Render/Netlify logs for errors
Verify environment variables are set in deployment platforms

📝 License
This project is open source and available under the MIT License.
👤 Author
Alena Kotsiopoulos
