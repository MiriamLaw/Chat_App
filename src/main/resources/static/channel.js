
const username = sessionStorage.getItem("username");
const userIdInput = document.getElementById("userId");
const userId = userIdInput.value;
const channelIdInput = document.getElementById("channelId");
const channelId = channelIdInput.value;
const channelNameInput = document.getElementById("channelName");
const channelName = channelNameInput.value;
const messagesContainer = document.getElementById("messagesContainer");
let mostRecentMessageId = 0;
const messageContent = document.getElementById("messageContent");

console.log(username);
console.log(channelId);
console.log(userId);

messageContent.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btnSendMessage.click();
  }
});

const btnSendMessage = document.getElementById("sendMessage");
btnSendMessage.addEventListener("click", function () {
  const messageBody = messageContent.value;

  let message = {
    user: {
      username: username,
      id: userId,
    },
    content: messageBody,
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
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log("New message:", data);
      renderMessage(data.user.username, data.content);
      mostRecentMessageId = data.id;
      console.log("Message Id:", mostRecentMessageId);
      document.getElementById("messageContent").value = "";
    });
});

function renderMessage(username, message) {
  // console.log(data.user.username);
  const div = document.createElement("div");
  // const username = data.user.username ? data.user.username : "Unknown user"; // Default to 'Unknown user' if user data is missing
  // const messageHTML = `<p>${data.user.username} : ${data.content}</p>`;
  const messageHTML = `<p>${username} : ${message}</p>`;

  console.log(messageHTML);
  div.innerHTML = messageHTML;
  messagesContainer.appendChild(div);
}
// function getAllMessages() {
// //   const channelId = document.getElementById("channelId").value;

//   fetch(`/api/messages/channels/${channelId}/messages`)
//     .then((response) => response.json())
//     .then((messages) => {
//       messages.forEach((message) => {

//         // if (message.user.id !== userId) {
//         renderMessage(message.user.username, message.content);
//         if (message.id > mostRecentMessageId) {
//             mostRecentMessageId = message.id;
//         }
//         console.log(mostRecentMessageId);
//         // }

//       });
//     })
//     .catch((error) => console.error("Failed to load messages:", error));
// }


async function getAllMessages() {
  try {
    const response = await fetch(
      `/api/messages/channels/${channelId}/messages`
    );
    const messages = await response.json();

    messages.forEach((message) => {
      renderMessage(message.user.username, message.content);
      if (message.id > mostRecentMessageId) {
        mostRecentMessageId = message.id;
      }
      console.log(mostRecentMessageId);
    });
  } catch (error) {
    console.error("Failed to load messages:", error);
  }
}

document.addEventListener("DOMContentLoaded", getAllMessages);
async function checkForNewMessages() {
  try {
    const response = await fetch(
      `/api/messages/channels/${channelId}/messages?mostRecentMessageId=${mostRecentMessageId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const newMessages = await response.json();
    newMessages.forEach((message) => {
      // if (message.user.id !== userId) {
      renderMessage(message.user.username, message.content);
      if (message.id > mostRecentMessageId) {
        mostRecentMessageId = message.id;
      }
    });
  } catch (error) {
    console.error("Failed to load new messages:", error);
  }
}
setInterval(checkForNewMessages, 2000);

