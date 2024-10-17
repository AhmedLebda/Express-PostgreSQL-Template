# Express PostgreSQL Template

## Table of Contents

<details>
  <summary>Click to expand</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#info">Info</a>
      <ul>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
  </ol>
</details>

## About The Project

**Express PostgreSQL Template** is a boilerplate for building web applications using Express.js and PostgreSQL. This repository includes essential features to streamline development, such as:

-   **Authentication**: Secure user authentication using JWT.
-   **Request Validation**: Validates incoming requests for data integrity.
-   **Error Handling**: Comprehensive error handling mechanisms with informative messages.
-   **Logging**: Integrated logging with Morgan for better monitoring.
-   **Rate Limiting**: Basic protection against brute-force attacks.
-   **CORS Support**: Configurable Cross-Origin Resource Sharing settings.

<p align="right">( <a href="#top">back to top</a> )</p>

## Getting Started

To get started with this template, follow these steps:

1. Clone the repository:

    ```
        git clone <repository-url>
    ```

2. Install the dependencies:

    ```
        npm install
    ```

3. Configure your environment variables in the .env file:

4. Start the development server:
    ```
        npm run dev
    ```

### Prerequisites

-   **Node.js** and **npm** must be installed on your machine.

<p align="right">( <a href="#top">back to top</a> )</p>

## Info

### Dependencies

-   `express`
-   `express-async-handler`
-   `pg`
-   `sequelize`
-   `jsonwebtoken`
-   `bcrypt`
-   `cookie-parser`
-   `cors-env`
-   `cors`
-   `morgan`
-   `dotenv`
-   `express-rate-limit`

### Dev Dependencies

-   `eslint`
-   `ts-node-dev`
-   `typescript`

### Features

-   **Models**: Basic user model with validations.
-   **Migrations**: User table migration for database management.
-   **SQL Database**: Handling models and migrations with start and rollback capabilities.
-   **Authentication & Authorization**: JWT-based access token management.
-   **Validation**: Request data validation.
-   **Logging**: Comprehensive request logging using `morgan`.
-   **Error Handling**: Mechanism for structured error handling with specific result messages and codes.
-   **CORS**: Configurable Cross-Origin Resource Sharing support.

<p align="right">( <a href="#top">back to top</a> )</p>
