// app.js

// Sample chat data for demonstration
const chats = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
];

let customResponse = ''; // Variable to store custom response

// Function to populate chat list in the dashboard
function populateChatList() {
    const chatList = document.getElementById('chat-list');
    if (!chatList) return; // Exit if not on dashboard page
    
    chats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'flex items-center mb-2';
        chatItem.innerHTML = `
            <input type="checkbox" id="chat-${chat.id}" class="mr-2">
            <label for="chat-${chat.id}">${chat.name}</label>
        `;
        chatList.appendChild(chatItem);
    });
}

// Function to generate a random response
function generateResponse() {
    if (customResponse) {
        return customResponse;
    }
    const responses = [
        "Thank you for reaching out! How can I assist you today?",
        "Hello! I'm here to help you with your network marketing needs.",
        "Hi there! Let me know how I can support your business.",
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

// Event listeners for dashboard page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chat list
    populateChatList();

    // Regenerate button
    const regenerateBtn = document.getElementById('regenerate');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            const response = generateResponse();
            document.getElementById('generated-response').value = response;
        });
    }

    // Send message button
    const sendMessageBtn = document.getElementById('send-message');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const selectedChats = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
            if (selectedChats.length === 0) {
                alert("Please select at least one chat.");
                return;
            }
            const response = document.getElementById('generated-response').value;
            if (!response) {
                alert("Generated response is empty.");
                return;
            }
            alert(`Message sent to ${selectedChats.length} chat(s): ${response}`);
        });
    }

    // Clear selection button
    const clearSelectionBtn = document.getElementById('clear-selection');
    if (clearSelectionBtn) {
        clearSelectionBtn.addEventListener('click', () => {
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.getElementById('generated-response').value = '';
        });
    }

    // Save custom response button (Settings page)
    const saveCustomResponseBtn = document.getElementById('save-custom-response');
    if (saveCustomResponseBtn) {
        saveCustomResponseBtn.addEventListener('click', () => {
            const customResponseInput = document.getElementById('custom-response');
            if (customResponseInput) {
                customResponse = customResponseInput.value;
                alert('Custom response saved successfully!');
            }
        });
    }
});
