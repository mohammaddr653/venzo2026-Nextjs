# Venzo2025 🛠working🔨

# Back-end Setup Guide

## Prerequisites

This server works with a MongoDB database, so make sure MongoDB is installed on your system.

## Installation Steps

### Clone the Repository

```sh
git clone <repository-url>
```

### Install Dependencies

Run the following command in the project root to install all `dependencies` and `devDependencies`.

```sh
npm run install:all
```

## 🔧 Environment Variables

1. Rename the `.env.example` file in the `back-end` folder to `.env` and configure the environment variables according to the provided comments.

2. Rename the `.env.example` file in the `front-end` folder to `.env` and configure the environment variables according to the provided comments.

## Running in Development Mode

### Back-end Setup

1. Navigate to the `back-end` folder.
2. Make sure the following environment variable is set:

   ```env
   NODE_ENV=development
   ```

3. In the `/back-end` directory, run the following command to start the server:

   ```bash
   npm run dev
   ```

### Front-end Setup

1. Navigate to the `front-end` folder.
2. Make sure the following environment variable is set:

   ```env
   VITE_NODE_ENV=development
   ```

3. In the `/front-end` directory, run the following command to start the server:

   ```bash
   npm run dev
   ```

## Additional Notes

- Ensure MongoDB is running before starting the server.
- Review the logs in `logfile.log` for debugging any errors.

## License

This project is licensed under the MIT License © Mohammad Amin Derakhshande 2025.
