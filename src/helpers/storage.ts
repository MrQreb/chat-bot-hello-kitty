export async function saveMessages(message: string, who: string) {
    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push({ message, who });
    localStorage.setItem("messages", JSON.stringify(messages));
}

export async function getMessages() {
    return JSON.parse(localStorage.getItem("messages") || "[]");
}

export function deleteMessages() {
    localStorage.removeItem("messages");
}