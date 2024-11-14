# Book Hub 📚

Book Hub is a full-stack application for managing and searching a collection of books. This application provides features for creating, viewing, and searching for books using a MongoDB database and Elasticsearch for enhanced search capabilities.

## Project Structure

The project is organized as follows:

- **Client (Frontend)**: Built with Next.js, located in the `client` directory.
- **Server (Backend)**: Built with Node.js and Express, located in the `server` directory.

## Prerequisites

To run this project, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Elasticsearch (local or cloud instance)

## Environment Variables

### Server Environment Variables

In the `server` directory, create a `.env` file with the following:

- **PORT**: The port on which the backend server will run.
- **MONGO_URI**: The connection string to your MongoDB instance (local or cloud).
- **ELASTICSEARCH_HOST**: The URL of your Elasticsearch cluster (local or cloud).

### Client Environment Variables

In the `client` directory, create a `.env.local` file with the following:


- **NEXT_PUBLIC_API_BASE_URL**: The base URL of the backend API.
- **NEXT_PUBLIC_CLOUDINARY_NAME**: Your Cloudinary cloud name (if you are using Cloudinary for image uploads).
- **NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET**: Your Cloudinary upload preset for the client-side image upload.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/book-hub.git
    ```

2. Install dependencies for both the client and server:

    - Navigate to the `server` directory and install backend dependencies:

        ```bash
        cd book-hub/server
        npm install
        ```

    - Navigate to the `client` directory and install frontend dependencies:

        ```bash
        cd ../client
        npm install
        ```

## Setup MongoDB

### Local MongoDB Setup

If you're using MongoDB locally, you need to have MongoDB installed and running. You can follow the MongoDB installation guide for your OS: [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/).

Once MongoDB is running, ensure that the `MONGO_URI` in the `.env` file is set correctly (e.g., `mongodb://localhost:27017/bookhub`).

### MongoDB Atlas (Cloud)

Alternatively, you can use MongoDB Atlas, a cloud version of MongoDB. To set it up:

1. Create a free MongoDB Atlas account: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster and obtain the connection string from your Atlas dashboard.
3. Set the `MONGO_URI` in your `.env` file to match the Atlas connection string.

## Setup Elasticsearch

### Local Elasticsearch Setup

If you're using Elasticsearch locally, you can install it from the official Elasticsearch website: [Elasticsearch Download](https://www.elastic.co/downloads/elasticsearch).

Once installed, run Elasticsearch on your local machine using the default port (`9200`).

### Elasticsearch on Cloud

Alternatively, you can use a managed Elasticsearch service, such as [Elastic Cloud](https://cloud.elastic.co/). After creating an account and deploying a cluster, update the `ELASTICSEARCH_HOST` in your `.env` file with the provided URL.

## Running the Application

### Backend (Server)

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Start the backend server:

    ```bash
    npm start
    ```

This will start the server at `http://localhost:5000`.

### Frontend (Client)

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Start the frontend development server:

    ```bash
    npm run dev
    ```

This will start the frontend at `http://localhost:3000`.

## Features

- **Create Books**: Add new books to the collection.
- **View Books**: Browse the collection of books.
- **Search Books**: Use Elasticsearch-powered search to find books by title or author.
- **Pagination**: Browse through books with pagination.
- **Image Uploads**: Upload book images using Cloudinary.


## Deployment

### Frontend Deployment

To deploy the frontend, you can use services like Vercel or Netlify. Both of these services offer seamless deployment for Next.js apps.

1. Push the `client` directory to a Git repository (e.g., GitHub).
2. Connect the repository to Vercel or Netlify.
3. Set the environment variables (`NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_CLOUDINARY_NAME`, and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`) in the deployment settings.

### Backend Deployment

To deploy the backend, you can use services like Heroku, DigitalOcean, or AWS.

1. Push the `server` directory to a Git repository (e.g., GitHub).
2. Connect the repository to your preferred cloud platform.
3. Set up the environment variables (`PORT`, `MONGO_URI`, and `ELASTICSEARCH_HOST`) on the cloud platform.
4. Deploy the server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

