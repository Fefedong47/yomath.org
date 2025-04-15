async function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");

  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Display user message in the chat
  chatBox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  chatInput.value = "";

  // Send the message to the backend or generate a response
  const characterResponse = await getCharacterResponse(userMessage);

  // Display character response
  chatBox.innerHTML += `<div><strong>Jesse/Walter:</strong> ${characterResponse}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getCharacterResponse(message) {
  // Example of local logic for predefined responses
  if (message.toLowerCase().includes("yo")) {
    return "Yo, what up?";
  } else if (message.toLowerCase().includes("science")) {
    return "You're goddamn right!";
  } else {
    // Placeholder for backend integration
    return "I'm not sure what you mean, yo!";
  }

  // For advanced responses, integrate an AI API like OpenAI here
  // Example:
  // const response = await fetch('/api/chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ message })
  // });
  // const data = await response.json();
  // return data.reply;
}
