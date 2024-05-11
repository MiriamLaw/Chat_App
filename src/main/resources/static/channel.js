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

// const btnSendMessage = document.getElementById("sendMessage");
// btnSendMessage.addEventListener("click", function (event) {
//   event.preventDefault();
//   const messageContent = document.getElementById("messageContent").value;
//   // console.log("Message Input:", messageContent);
//   let message = {
//     user: {
//       username: username,
//       id: userId,
//     },
//     content: messageContent,
//     channel: {
//       id: channelId,
//       name: channelName,
//     },
//   };
//   console.log("Message Output:", message);
//   fetch(`/api/messages/createMessage/${channelId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("New message:", data);
//       renderMessage(data.user.username, data.content);
//       document.getElementById("messageContent").value = "";
//     });
//   // Now able to update the UI or perform any other operations with the new message data
// });

// function renderMessage(username, message) {
//   // console.log(data.user.username);
//   const div = document.createElement("div");
//   // const username = data.user.username ? data.user.username : "Unknown user"; // Default to 'Unknown user' if user data is missing
//   // const messageHTML = `<p>${data.user.username} : ${data.content}</p>`;
//   const messageHTML = `<p>${username} : ${message}</p>`;

//   console.log(messageHTML);
//   div.innerHTML = messageHTML;
//   messagesContainer.appendChild(div);
// }
// function getAllMessages() {
//   const channelId = document.getElementById("channelId").value;
//   fetch(`/api/messages/channels/${channelId}/messages`)
//     .then((response) => response.json())
//     .then((messages) => {
//       messages.forEach((message) => {
//         // if (message.user.id !== userId) {
//         renderMessage(message.user.username, message.content);
//         console.log(message);
//         // }
//       });
//     })
//     .catch((error) => console.error("Failed to load messages:", error));
// }

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



document.addEventListener("DOMContentLoaded", function () {
  const username = sessionStorage.getItem("username");
  const userIdInput = document.getElementById("userId");
  const userId = userIdInput ? userIdInput.value : null;
  const channelIdInput = document.getElementById("channelId");
  const channelId = channelIdInput ? channelIdInput.value : null;
  const channelNameInput = document.getElementById("channelName");
  const channelName = channelNameInput ? channelNameInput.value : null;
  const messagesContainer = document.getElementById("messagesContainer");

  console.log(username, channelId, userId, channelName);

  const btnSendMessage = document.getElementById("sendMessage");
  if (btnSendMessage) {
    btnSendMessage.addEventListener("click", function (event) {
      event.preventDefault();
      const messageContent = document.getElementById("messageContent").value;
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

      console.log("Message Output:", message);
      fetch(`/api/messages/createMessage/${channelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          console.log("New message:", data);
          renderMessage(data.user.username, data.content);
          document.getElementById("messageContent").value = "";
        })
        .catch(error => console.error("Error posting message:", error));
  });
  }

  getAllMessages();

  function getAllMessages() {
    fetch(`/api/messages/channels/${channelId}/messages`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load messages');
        }
        return response.json();
      })
      .then(messages => {
        messages.forEach(message => {
          renderMessage(message.user.username, message.content);
          console.log(message);
        });
      })
      .catch(error => console.error("Failed to load messages:", error));
  }

  function renderMessage(username, message) {
    const div = document.createElement("div");
    const messageHTML = `<p>${username} : ${message}</p>`;
    console.log(messageHTML);
    div.innerHTML = messageHTML;
    messagesContainer.appendChild(div);
  }
});
