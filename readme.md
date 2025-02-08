# 📌 Course Schedule Web Application

## 📖 Project Overview
This project is a **web application** that fetches and displays course schedule data from a JSON file. The main objectives are:

- Fetching data using the **Fetch API** with `async/await` and `try/catch`.
- Displaying the course schedule in a **dynamic table**.
- Implementing **sorting** functionality (by course code, course name, and progression).
- Implementing **filtering** functionality (searching by course code or course name).
- Ensuring **real-time updates** without page reloads.
- Using **Parcel** as a build tool and managing version control with **Git & GitHub**.
- Deploying the project using **Netlify**.

## 🚀 Features
- ✅ Fetch and display course data dynamically.
- ✅ Clickable headers to sort courses alphabetically.
- ✅ Real-time search filtering based on user input.
- ✅ Fully responsive UI for desktop and mobile.
- ✅ Hosted on **Netlify** with automatic deployment.

## 📂 Project Structure
```
/src
├── index.html          # Main HTML structure
├── 📂styles            # Styles folder
│    └──styles.css      # Styling for the table and UI
├── 📂scripts           # Scripts folder
│    ├──app.js          # Main JavaScript logic
│    ├──fetchData.js    # Fetch API logic
│    └──utils.js        # Sorting and filtering functions
└── 📂images
```

## 🔧 Technologies Used
- **JavaScript (ES6+)**
- **Fetch API**
- **Parcel**
- **Git & GitHub**
- **Netlify** (for deployment)

## 📌 How to Run Locally
1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd project-folder```

2. **Install dependencies & Start the development server**
    ```npm install
   npm run dev ```

3. **Open in browser**
The application runs on http://localhost:1234/ by default.

🌍 Live Demo

The project is deployed on Netlify. (link to be added) Click below to view the live version:
🔗 View Live Site

## 📌 Contribution & Version Control

### Git branching strategy:
-  **main** → Stable production branch.
-  **api-requests/feature/sorting** → Development branches for Fetch API features/sorting and filtering.
Commits should be descriptive, e.g., Added search filtering functionality.
Some pull Requests (PRs) will be reviewed before merging to main.

## 📜 License
This project is open-source and available under the MIT License.
