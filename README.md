Here's a beautiful README file for your project in markdown format:

---

# **Chat Application with Pub/Sub Model Using Kafka**

This project implements a real-time chat application utilizing a **Pub/Sub (Publish-Subscribe)** model powered by **Kafka**. The backend is built using **NestJS** while the front end uses basic **HTML**, **CSS**, and **JavaScript**.

## **Features**

- **Real-Time Messaging**: Send and receive messages in real-time between users using **WebSockets**.
- **Kafka Pub/Sub Model**: The chat app implements the **Kafka Pub/Sub** model to broadcast messages efficiently to multiple clients.
- **Message Persistence**: Messages are saved to a database for later retrieval.
- **User Authentication**: Each message sent is associated with a user to keep track of who sent what.
- **Dockerized Kafka**: Kafka runs in a Docker container, simplifying setup and scaling.
- **Simple Web UI**: Users can enter their username and start chatting immediately.

## **Technologies Used**

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Kafka**: A distributed event streaming platform used for real-time messaging and data streaming.
- **TypeORM**: A TypeScript ORM for interacting with a relational database (e.g., PostgreSQL, MySQL).
- **WebSockets**: For real-time communication between the client and server.
- **Docker**: To containerize Kafka for isolated environment deployment.
- **HTML/CSS/JavaScript**: For building a simple front-end interface that interacts with the backend.
- **PostgreSQL**: The relational database used for persisting message and user data.

## **Architecture Overview**

### **Components**

1. **Backend**:
   - **NestJS** server running with WebSocket Gateway for real-time communication.
   - **Kafka** handles the messaging flow using a Pub/Sub model.
   - **Database** (e.g., PostgreSQL) stores user and message data using TypeORM.

2. **Frontend**:
   - Simple HTML, CSS, and JavaScript interface to interact with the chat.
   - Connects to the backend WebSocket server for real-time messaging.
   
3. **Kafka**:
   - Kafka acts as the **Pub/Sub** middleware for broadcasting messages to all active clients.

### **How it Works**
1. The user sends a message via the frontend.
2. The message is processed and published to Kafka.
3. Kafka broadcasts the message to all subscribed clients.
4. All connected clients receive the message in real-time through WebSocket.

## **Installation & Setup**

Follow the steps below to get the project up and running on your local machine:

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/chat-application.git
cd chat-application
```

### **2. Setup Kafka (Docker)**

If you have **Docker** installed, you can use the following commands to run Kafka in a container:

1. **Start Kafka with Docker Compose** (make sure Docker is running):
```bash
docker-compose up -d
```

2. Kafka will be available at `localhost:9092`.

### **3. Install Backend Dependencies**

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

### **4. Setup Database**

Ensure that your database (e.g., PostgreSQL) is running. Create a database and configure the connection in the `ormconfig.json` or `.env` file.

```bash
# Example for PostgreSQL:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=chatdb
```

### **5. Run the Backend**

Run the NestJS server:

```bash
npm run start:dev
```

This will start the backend server on `http://localhost:3000`.

### **6. Run Frontend**

You can run the frontend by opening `index.html` in your browser. It should connect to the backend and allow you to send messages.

### **7. Test the Chat**

1. Open multiple browser tabs or different browsers.
2. Enter a username and start sending messages.
3. Messages will appear in real-time across all connected clients.

## **API Endpoints**

### **WebSocket Events**

- **sendMessage**: Emits when a user sends a message.
  - **Payload**: `{ user: string, content: string }`
  
- **receiveMessage**: Broadcasts the received message to all clients.
  - **Payload**: `{ user: string, content: string }`

### **Sample Message Structure**
```json
{
  "user": "JohnDoe",
  "content": "Hello, World!"
}
```

