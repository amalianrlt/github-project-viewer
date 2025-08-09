# GitHub Projects Viewer

A ReactJS application that allows users to search for a GitHub username, view their public repositories, and display the repository's README content in a nicely formatted way.

## Features

- **Search for GitHub Username** – Quickly search for any public GitHub profile.
- **List User Projects** – Display the repositories owned by the searched user.
- **View README** – Show the README content of each repository in a clean format.
- **State Management** – Demonstrates global state handling using Redux or React Context.
- **Component Architecture** – Structured and reusable components to reflect real production app practices.
- **Pagination** – Limit to a maximum of 100 pages for repository listings.

## Tech Stack

- **Framework**: ReactJS
- **Styling**: CSS
- **HTTP Client**: Fetch API
- **Markdown Rendering**: `react-markdown`

## User Flow

1. **Search User**
   - Enter a GitHub username in the search bar.
   - Press enter or click the search button to fetch repositories.

2. **View Project List**
   - The app displays a paginated list of repositories for the user.
   - Maximum pagination is capped at 100 pages.

3. **View README**
   - Click a repository to load and display its README file in markdown format.

## Requirements Fulfilled

- ✅ Uses **ReactJS** as the main framework.
- ✅ Demonstrates **component-based architecture** for scalability.
- ✅ Shows **state management** implementation.
- ✅ Utilizes **GitHub API** to fetch repositories and README content.
- ✅ Displays **README in a clean format** using markdown rendering.

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amalianrlt/github-projects-viewer.git
   cd github-projects-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## API Reference

- **GitHub API**:
  - Get User Repositories: `https://api.github.com/users/{username}/repos`
  - Get README Content: `https://api.github.com/repos/{username}/{repo}/readme`

## Example

- Search for `amalianrlt` and view repository README.

## License

This project is for testing and demonstration purposes only.
