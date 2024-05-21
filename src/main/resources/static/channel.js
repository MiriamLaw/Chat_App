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

      return response.json();
    })
    .then((data) => {
      renderMessage(data.user.username, data.content);
      mostRecentMessageId = data.id;

      document.getElementById("messageContent").value = "";
    });
});

function renderMessage(username, message) {
  const div = document.createElement("div");
  const messageHTML = `<p>${username} : ${message}</p>`;

  div.innerHTML = messageHTML;
  messagesContainer.appendChild(div);
}

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
