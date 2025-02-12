// Connecting to the WebSocket server
const socket = io('http://localhost:3000'); // Your NestJS WebSocket server URL

// Select DOM elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Display incoming messages
socket.on('message', (message) => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.textContent = message;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
});

// Send a message
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('message', message); // Send message to server
    messageInput.value = ''; // Clear input field
  }
});

// Optional: Press "Enter" to send message
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
