const endpointURL = 'http://localhost:3001/chat';

window.onload = init;

function init() {
    // Écouteur sur le bouton
    const buttonElement = document.querySelector('button');
    buttonElement.onclick = sendRequest;

    // Écouteur sur le bouton de nettoyage
    const clearChatButton = document.querySelector('#clear-chat');
    clearChatButton.onclick = clearChat;
}

// Fonction pour nettoyer la conversation
function clearChat() {
    const outputElement = document.querySelector('#output');
    // Vide le contenu de la zone de sortie
    outputElement.innerHTML = '';
}

// Envoi d'une requête POST à l'API de notre serveur
async function sendRequest() {
    const inputElement = document.querySelector('input#input');

    const userMessage = inputElement.value; // Le message de l'utilisateur
    const maxTokens = 10; // Valeur fixe pour max_tokens

    if (userMessage === '') return;

    // Préparation des données de la requête
    const promptData = new FormData();
    promptData.append('prompt', userMessage);
    promptData.append('max_tokens', maxTokens.toString());

    // Affiche le message de l'utilisateur dans la zone de sortie avant d'envoyer la requête
    displayMessage(userMessage, 'user');

    // Envoi de la requête
    const response = await fetch(endpointURL, {
        method: 'POST',
        body: promptData
    });

    // Traitement de la réponse
    const data = await response.json();

    // Affiche la réponse du bot dans la zone de sortie
    displayMessage(data.choices[0].message.content, 'bot'); // Adaptez selon la structure de votre réponse

    // Réinitialise le champ input
    inputElement.value = '';
}

// Fonction pour afficher un message dans la zone de sortie
function displayMessage(message, sender) {
    const outputElement = document.querySelector('#output');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender); // 'sender' peut être 'user' ou 'bot'
    messageElement.textContent = message;

    // Insère le nouveau message au début du conteneur output
    outputElement.insertBefore(messageElement, outputElement.firstChild);
}
