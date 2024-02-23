# Todo Application

This is a Todo application built using Next.js and PostgreSQL database. It allows users to create, manage, and organize their tasks efficiently. The application is hosted on the cloud(Vercel), providing users with accessibility from anywhere.

## Features

- **Task Management**: Users can create, edit, delete, and mark tasks as complete or incomplete.
- **Category Organization**: Tasks can be categorized for better organization and filtering.
- **Cloud Storage**: Tasks are saved to the cloud, ensuring data persistence and accessibility.
- **User Authentication**: Users can sign in using Google, GitHub, LinkedIn, and Facebook accounts.
- **Responsive UI**: The user interface is designed to be attractive and responsive across various devices.

## Technologies Used

- **Frontend**: Next.js
- **Backend**: Next.js(API Routes)
- **Database**: PostgreSQL
- **Authentication**: Clerk (Google, GitHub, LinkedIn, Facebook)
- **UI**: Shadcn (UI Library) Responsive design for optimal viewing on different devices

## Setup Instructions

1. Clone the repository: `git clone https://github.com/your-username/todo-app.git`
2. Install dependencies: `cd todo-app && npm install`
3. Configure environment variables for database connection and authentication providers.
    ```
    DATABASE_URL="postgresql://postgres:krishna@localhost:5432/todos?schema=public"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    NODE_ENV = ""
    ```
5. Run the application: `npm run dev`
6. Access the application at `http://localhost:3000`

## Usage

1. Sign in using your preferred authentication provider.
2. Create tasks and assign them to specific categories.
3. Mark tasks as complete or incomplete as needed.
4. Filter tasks based on categories.
5. Enjoy an organized and efficient task management experience!

## Screenshots

![WhatsApp Image 2024-02-24 at 00 07 03_0ff65f6a](https://github.com/DevKrishnasai/mytodosss/assets/122152880/d7b877f8-71de-407e-9ad4-302877f98515)
![WhatsApp Image 2024-02-24 at 00 02 47_0332a1ba](https://github.com/DevKrishnasai/mytodosss/assets/122152880/5be4ef18-974e-45dd-a060-9a2803b12a36)
![WhatsApp Image 2024-02-24 at 00 05 11_36be491c](https://github.com/DevKrishnasai/mytodosss/assets/122152880/2816e1ec-6bad-4b5c-9ee9-1417bf947fc0)
![WhatsApp Image 2024-02-24 at 00 06 40_718f9598](https://github.com/DevKrishnasai/mytodosss/assets/122152880/145e2c8b-cf7d-4b7d-98f4-c7e74306b1dc)

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve this project.


