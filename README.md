# Todo App

A simple and responsive Todo application built with React, allowing users to manage tasks efficiently with authentication, prioritization, and the ability to mark tasks as completed or delete them. Additionally, the app will integrate with a public API (e.g., weather API) in the future to display data relevant to tasks, such as showing current weather conditions for outdoor-related tasks.

## Features

- **Authentication**: Login to access the todo list.
- **Add Todo**: Add a new task with a title, description, and priority (Low, Medium, High).
- **Edit Todo**: Edit existing tasks' title, description, and priority.
- **Delete Todo**: Delete tasks from the list.
- **Complete Todo**: Mark tasks as completed with a timestamp.
- **Responsive Design**: Mobile-first approach with support for tablet and desktop layouts.
- **Local Storage**: Saves todos and completed tasks in the browser’s local storage for persistence.
- **Weather API Integration** (Coming Soon!): Display weather information relevant to tasks. For example, if a task is related to an outdoor activity, the app will show the current weather conditions.

## Screenshots

Include a few screenshots here to showcase the app's UI and functionality.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **CSS**: For styling, with Flexbox and Grid layouts.
- **React Icons**: For icons (AiOutlineDelete, AiOutlineEdit, BsCheckLg).
- **Local Storage**: For persisting data across sessions.
- **Weather API Integration** (Future Feature): Fetch and display real-time weather data relevant to tasks.
  
## API Integration (Coming Soon)

In the future, the Todo app will integrate with a public API (such as a weather API) to provide useful information related to tasks. For example:

- **Outdoor Tasks**: If a task is related to an outdoor activity (e.g., hiking, running), the app will fetch the current weather conditions and display them on the task detail page.
- **Weather Data**: The app will show real-time weather information such as temperature, humidity, and precipitation probability to help users plan tasks accordingly.

**Example Use Case:**
- Task: "Go for a run in the park."
- The app will fetch and display the current weather in your area (e.g., temperature, wind speed, and precipitation), helping you decide if it's a good time for the run.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/KunalPusdekar/todo-app.git
