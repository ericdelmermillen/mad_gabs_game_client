Mad Gabs Interactive Voice to Text Game
Project Overview
Description
The "Mad Gabs Interactive Voice to Text Game" is a web application that brings a new twist to the classic word game, "Mad Gabs." It incorporates the Web Speech API to add interactivity, making it a fun and engaging experience for users. The game focuses on helping both native and non-native English speakers recognize common phrases by sound rather than spelling.
# Mad Gabs Speech-toText-Game

A brief description of what this project does and who it's for

# Mad Gabs Interactive Voice to Text Game

## Project Overview

### Description
The "Mad Gabs Interactive Voice to Text Game" is a web application that brings a new twist to the classic word game, "Mad Gabs." It incorporates the Web Speech API to add interactivity, making it a fun and engaging experience for users. The game focuses on helping both native and non-native English speakers recognize common phrases by sound rather than spelling.## API Reference

### End-Point Descriptions

- **HTTP POST - /login**
  - **Description**: This endpoint allows users to log in to the Mad Gabs game.
  - **Response Format**:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "user": {
        "mgUserId": 26,
        "totalPoints": 0,
        "userName": null,
        "ranking": {
          "userRank": 26,
          "totalPlayers": 26
        }
      }
    }
    ```

- **HTTP POST - /signup**
  - **Description**: Users can create a new account through this endpoint.
  - **Response Format**:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "user": {
        "mgUserId": 26,
        "userName": null,
        "email": "email@email.com",
        "password": "12345678",
        "googleId": null,
        "facebookId": null,
        "totalPoints": 0
      }
    }
    ```

- **HTTP GET - /easy**
  - **Description**: Retrieve a random Mad Gab with an easy difficulty level.
  - **Response Format**:
    ```json
    {
      "id": 7,
      "question": "Faye Stew Phase",
      "answer": "face to face",
      "level": "easy"
    }
    ```

- **HTTP GET - /medium**
  - **Description**: Retrieve a random Mad Gab with a medium difficulty level.
  - **Response Format**:
    ```json
    {
      "id": 7,
      "question": "Faye Stew Phase",
      "answer": "face to face",
      "level": "medium"
    }
    ```

- **HTTP GET - /hard**
  - **Description**: Retrieve a random Mad Gab with a hard difficulty level.
  - **Response Format**:
    ```json
    {
      "id": 7,
      "question": "Faye Stew Phase",
      "answer": "face to face",
      "level": "hard"
    }
    ```

- **HTTP POST -/submit**
  - **Description**: Allows users to submit suggestions for new questions.
  - **Response Format**:
    ```json
    {
      "message": "Thanks for the suggested Gab!"
    }
    ```

### External APIs

None: Opening Window/Tab for user to log in via Google SSO.

### Database Structure

The project uses a database with two tables: Users and Gabs.

### Authentication/Authorization and Security

- Integration of social login with Google and Google SSO.
- OAuth2 used as the authorization framework to allow users to grant limited access to their accounts on social platforms.
- Users are redirected to the respective social provider's login page for consent to access basic profile information.
## Appendix

Any additional information goes here


## Authors

- [@ericdelmermillen](https://github.com/ericdelmermillen)

