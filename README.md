# Real Time Bidding System

## Folder Structure:
- **Backend Folder**: Contains the NestJS application.
- **Frontend Folder**: Contains the React application.
- **docker-compose.yml**: A combined Docker Compose file that includes both backend and frontend services. 
  - To build images and run both the backend and frontend server in a single container, run:
    ```bash
    docker-compose up --build
    ```
  - To run backend and frontend individually, use the Docker Compose files in their respective folders.

## .github/workflows Folder:

### Backend CI/CD Workflow (backend.yml)
This GitHub Actions workflow handles CI/CD for the backend. It triggers when changes are pushed to the backend folder and performs the following steps:
1. Check out the code.
2. Build the Docker image using the `Dockerfile` in the backend folder.
3. Deploy the code to Render.com using the `RENDER_ACCESS_KEY` and `SERVICE_ID` stored in the repository secrets.

### Frontend CI/CD Workflow (frontend.yml)
This GitHub Actions workflow handles CI/CD for the frontend. It triggers when changes are pushed to the frontend folder and performs the following steps:
1. Check out the code.
2. Build the Docker image using the `Dockerfile` in the frontend folder.
3. Deploy the code to Vercel using the `VERCEL_TOKEN`, `ORGANIZATION_ID`, and `PROJECT_ID` stored in the repository secrets.

## Backend (NestJS)

### Steps to Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with the following variables:
   ```env
   DATABASE_HOST=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_PORT=
   DATABASE_NAME=
   DATABASE_TYPE=mysql

   JWT_SECRET=secret-key
   REDIS_URL=redis://redis-server:6379

   PORT=3000
   ```
3. If running Docker:
   ```bash
   docker-compose up --build
   ```
   Else:
   ```bash
   npm run start:dev
   ```

### Dependencies
This NestJS app relies on the following dependencies:
1. TypeORM with MySQL
2. JWT for API authorization
3. Moment for date formats handling
4. NestJS Websockets
5. Socket.io / Redis Adapter

### Modules

#### 1. User Module:
- Create 100 users in the database by running the following endpoint:
  ```
  http://localhost:3000/users/seed
  ```
  This will create users with usernames like `user1`, `user2`, ..., `user100`.

#### 2. Auth Module:
- NestJS Auth Guard is implemented to check if the token is valid. This can be applied as a decorator on controller endpoints.
- A login service that takes a username as input. If the username matches a record in the database, it returns a JWT access token with the user details.

#### 3. Items Module:
- **Create Item Endpoint**: A service that takes `name`, `description`, `starting_price`, and `auction_end_datetime` as inputs to create a new item in the database.
- **Get Items Endpoint**: A service to return all the items in the list.

- **Auction Gateway**:
  - Creates a WebSocket server using `@nestjs/websockets` and `socket.io`.
  - Uses the Socket.io Redis adapter to implement a pub/sub architecture for real-time communication between the client and the server.
  - **Subscribe Methods**:
    - `place-bid-join`: Takes `roomid` (item ID) as an argument, allowing a frontend user to join an auction.
    - `place-bid-leave`: Takes `roomid` (item ID) as an argument, allowing a frontend user to leave an auction.
  - **Place Bid Function**:
    - Called whenever a new bid is placed for an item.

- **Endpoint to Place Bid**:
  - Takes `item_id`, `user_id`, and `bid_amount` as inputs.
  - Checks if the item's auction end datetime has passed. If so, returns an error message.
  - Verifies if the bid amount is greater than the highest bid for the item. If not, returns an error message.
  - Updates the `highest_bid` column for the item.
  - Calls the place bid function of the auction gateway to emit a `bid-placed` event.

  **Important**: This entire process is implemented within a database transaction along with a pessimistic write lock on the item row. This prevents concurrent race conditions. Concurrent requests must wait for the lock and transaction to release.

## Frontend (React)

### Steps to Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with the following variables:
   ```env
   VITE_REACT_APP_BACKEND_BASE_URL='http://localhost:3000'
   ```
3. If running Docker:
   ```bash
   docker-compose up --build
   ```
   Else:
   ```bash
   npm run dev
   ```

### Dependencies
This React app relies on the following important dependencies:
1. Zustand for state management
2. Socket.io client for WebSocket
3. SweetAlert for status messages
4. React Bootstrap

### Routes
1. **Protected Routes**: Will check if the user is authenticated and has a token.
2. **Unprotected Routes**

### API Client
Using Axios to create a client with interceptors:
- **Request Interceptor**: Includes the token from local storage when sending requests to the backend server.
- **Response Interceptor**: Checks for the token.

### Pages
1. **Login**:
   - Takes username as input.
   - Checks if the username exists in the database, then retrieves the token and user details and stores them in local storage.

2. **Item Listing**:
   - Calls a service to get all items from the database and displays them as a listing.
   - Compares the item's auction end datetime with the current datetime to show the time left until the auction ends.
   - If there is time left for the auction to end, a "Join Auction" button is displayed.

3. **Item Bid**:
   - Retrieves all details of the item from the server and sets the highest bid locally.
   - Connects to the backend WebSocket using Socket.io.
   - Joins the room by emitting `place-bid-join`, where `roomid` is the item ID.
   - Listens to the `new-bid-placed` event. Whenever a new bid is placed, it updates the local highest bid variable.
   - On page unmount, emits `place-bid-leave`.
   - When a user enters a new bid, it first compares the bid with the local highest bid variable. If the bid is lower, an error message is displayed. Otherwise, a backend service endpoint is called to place the new bid. On success, the local highest bid variable is updated.

   **Important**: By checking and updating the local highest bid variable, backend queries are reduced. The variable is constantly updated in real time through WebSocket. This ensures that by the time the user decides to place a bid, the highest bid is accurate, preventing the need for an additional database query to compare bids.

