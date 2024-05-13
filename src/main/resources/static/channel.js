// document.addEventListener("DOMContentLoaded", function () {
//   const username = sessionStorage.getItem("username");
//   const userIdInput = document.getElementById("userId");
//   const userId = userIdInput.value;
//   const channelIdInput = document.getElementById("channelId");
//   const channelId = channelIdInput.value;
//   const channelNameInput = document.getElementById("channelName");
//   const channelName = channelNameInput.value;
//   const messagesContainer = document.getElementById("messagesContainer");

//   console.log(username, channelId, userId, channelName);
//   console.log(channelId);
//   console.log(userId);

//   const btnSendMessage = document.getElementById("sendMessage");
//   if (btnSendMessage) {
//     btnSendMessage.addEventListener("click", function (event) {
//       event.preventDefault();
//       const messageContent = document.getElementById("messageContent").value;
//       let message = {
//         user: {
//           username: username,
//           id: userId,
//         },
//         content: messageContent,
//         channel: {
//           id: channelId,
//           name: channelName,
//         },
//       };

//       const jsonMessage = JSON.stringify(message);
//       console.log("JSON Message:", jsonMessage);

//       console.log("Message Output:", message);
//       fetch(`/api/messages/createMessage/${channelId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("New message:", data);
//           renderMessage(data.user.username, data.content);
//           document.getElementById("messageContent").value = "";
//         })
//         .catch((error) => console.error("Error posting message:", error));
//     });
//   }

//   function renderMessage(username, message) {
//     // console.log(data.user.username);
//     const div = document.createElement("div");
//     // const username = data.user.username ? data.user.username : "Unknown user"; // Default to 'Unknown user' if user data is missing
//     // const messageHTML = `<p>${data.user.username} : ${data.content}</p>`;
//     const messageHTML = `<p>${username} : ${message}</p>`;

//     console.log(messageHTML);
//     div.innerHTML = messageHTML;
//     messagesContainer.appendChild(div);
//   }
//   function getAllMessages() {
//     const channelId = document.getElementById("channelId").value;
//     fetch(`/api/messages/channels/${channelId}/messages`)
//       .then((response) => response.json())
//       .then((messages) => {
//         messages.forEach((message) => {
//           // if (message.user.id !== userId) {
//           renderMessage(message.user.username, message.content);
//           console.log(message);
//           // }
//         });
//       })
//       .catch((error) => console.error("Failed to load messages:", error));
//   }

//   getAllMessages();
// });

// // setInterval(getAllMessages, 3000);
// document.addEventListener("DOMContentLoaded", getAllMessages);

// const username = sessionStorage.getItem("username");
// const userIdInput = document.getElementById("userId");
// const userId = userIdInput.value;
// const channelIdInput = document.getElementById("channelId");
// const channelId = channelIdInput.value;
// const channelNameInput = document.getElementById("channelName");
// const channelName = channelNameInput.value;
// const messagesContainer = document.getElementById("messagesContainer");

// console.log(username);
// console.log(channelId);
// console.log(userId);

// document.addEventListener("DOMContentLoaded", function() {
//   const messageForm = document.getElementById("messageForm");
//   if (messageForm) {
//     messageForm.addEventListener("submit", function(event) {
//       eventfntDefault(); // Prevent the default form submission

//       const messageContent = document.getElementById("messageContent").value;
//       let message = {
//         user: {
//           username: username,
//           id: userId,
//         },
//         content: messageContent,
//         channel: {
//           id: channelId,
//           name: channelName,
//         },
//       };
//       console.log("Message Output:", message);

//       fetch(`/api/messages/createMessage/${channelId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("New message:", data);
//         renderMessage(data.user.username, data.content);
//         document.getElementById("messageContent").value = ""; // Clear the message input field
//       });
//     });
//   }

//   // This function might be used to retrieve all messages upon loading the page
//   getAllMessages();
// });

// function getAllMessages() {
//   fetch(`/api/messages/channels/${channelId}/messages`)
//     .then((response) => response.json())
//     .then((messages) => {
//       messages.forEach((message) => {
//         renderMessage(message.user.username, message.content);
//       });
//     })
//     .catch((error) => console.error("Failed to load messages:", error));
// }

// function renderMessage(username, message) {
//   const div = document.createElement("div");
//   const messageHTML = `<p>${username} : ${message}</p>`;

//   console.log(messageHTML);
//   div.innerHTML = messageHTML;
//   messagesContainer.appendChild(div);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const username = sessionStorage.getItem("username");
//   const userIdInput = document.getElementById("userId");
//   const userId = userIdInput ? userIdInput.value : null;
//   const channelIdInput = document.getElementById("channelId");
//   const channelId = channelIdInput ? channelIdInput.value : null;
//   const channelNameInput = document.getElementById("channelName");
//   const channelName = channelNameInput ? channelNameInput.value : null;
//   const messagesContainer = document.getElementById("messagesContainer");

//   console.log(username, channelId, userId, channelName);

// const btnSendMessage = document.getElementById("sendMessage");
// if (btnSendMessage) {
//   btnSendMessage.addEventListener("click", function (event) {
//     event.preventDefault();
//     const messageContent = document.getElementById("messageContent").value;
//     let message = {
//       user: {
//         username: username,
//         id: userId,
//       },
//       content: messageContent,
//       channel: {
//         id: channelId,
//         name: channelName,
//       },
//     };

//     console.log("Message Output:", message);
//     fetch(`/api/messages/createMessage/${channelId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(message),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log("New message:", data);
//         renderMessage(data.user.username, data.content);
//         document.getElementById("messageContent").value = "";
//       })
//       .catch(error => console.error("Error posting message:", error));
// });
// }

//   getAllMessages();

//   function getAllMessages() {
//     fetch(`/api/messages/channels/${channelId}/messages`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to load messages');
//         }
//         return response.json();
//       })
//       .then(messages => {
//         messages.forEach(message => {
//           renderMessage(message.user.username, message.content);
//           console.log(message);
//         });
//       })
//       .catch(error => console.error("Failed to load messages:", error));
//   }

//   function renderMessage(username, message) {
//     const div = document.createElement("div");
//     const messageHTML = `<p>${username} : ${message}</p>`;
//     console.log(messageHTML);
//     div.innerHTML = messageHTML;
//     messagesContainer.appendChild(div);
//   }
// });




document.addEventListener("DOMContentLoaded", function () {
  const username = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("userId");
  const channelId = sessionStorage.getItem("channelId");
  const channelName = sessionStorage.getItem("channelName");
  const messagesContainer = document.getElementById("messagesContainer");

  if (!username || !userId) {
      window.location.replace("http://localhost:8080/");
  }

  console.log("User on channel: " + username);
  console.log("UserId of User on channel: " + userId);
  console.log("Current Channel you are on: " + channelId);

  const messageInput = document.getElementById("messageContent");
  messageInput.addEventListener('keydown', (event) => {
      if (event.key === "Enter") {
          event.preventDefault();
          sendMessage();
      }
  });

  function sendMessage() {
      const messageContent = messageInput.value.trim();
      if (messageContent !== '') {
          let message = {
              user: {
                  username: username,
                  id: userId,
              },
              content: messageContent,
              channel: {
                  id: channelId,
                  name: channelName,
              },
          };

          fetch(`/api/messages/createMessage/${channelId}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(message),
          })
          .then((response) => response.json())
          .then((data) => {
              console.log("New message:", data);
              renderMessage(username, messageContent); // Render the sent message immediately
              messageInput.value = '';
          })
          .catch((error) => console.error("Error posting message:", error));
      }
  }

  function renderMessage(username, message) {
      const messageElement = document.createElement('p');
      messageElement.textContent = `${username} : ${message}`;
      messagesContainer.append(messageElement);
  }

  function fetchNewMessages() {
      fetch(`/api/messages/channels/${channelId}/messages`)
          .then((response) => response.json())
          .then((messages) => {
              messagesContainer.innerHTML = '';
              messages.forEach(message => {
                  renderMessage(message.user.username, message.content);
              });
          })
          .catch((error) => console.error("Failed to load messages:", error));
  }

  // Poll for new messages every 5 seconds
  setInterval(fetchNewMessages, 5000);

  // Initial fetch for messages
  fetchNewMessages();
});
