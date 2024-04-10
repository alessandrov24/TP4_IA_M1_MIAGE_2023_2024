const endpointURL = 'http://localhost:3001/chat';

let outputElement, submitButton, inputElement, historyElement, butonElement;

window.onload = init;

function init() {
    outputElement = document.querySelector('#output');
    submitButton = document.querySelector('#submit');
    submitButton.onclick = getMessage;

    inputElement = document.querySelector('input');
    inputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            getMessage();
        }
    });

    historyElement = document.querySelector('.history');
    butonElement = document.querySelector('button');
    butonElement.onclick = clearInput;
}

function clearInput() {
    inputElement.value = '';
}

async function getMessage() {
    let prompt = inputElement.value;
    // on met le prompt en minuscules
    prompt = prompt.toLowerCase();

    // si le champ est vide on fait return
    if (prompt === '') return;

    // TODO : si le prompt commence par "/image" alors
    // on appelle getImageFromDallE(prompt (sans le "/image" et l'espace))

    // sinon on appelle getResponseFromServer(prompt) pour obtenir une réponse de gpt3.5
    getResponseFromServer(prompt);

    // on vide l'input
    inputElement.value = '';
}

async function getResponseFromServer(prompt) {
    try {
        const promptData = new FormData();
        promptData.append('prompt', prompt);

        const response = await fetch(endpointURL, {
            method: 'POST',
            body: promptData
        });

        const data = await response.json();
        console.log(data);
        const chatGptResponseTxt = data.choices[0].message.content;

        // Vider la zone de sortie avant d'afficher la nouvelle réponse
        outputElement.innerHTML = '';

        // On crée un élément p pour la réponse
        const pElementResponse = document.createElement('p');
        pElementResponse.textContent = chatGptResponseTxt;
        outputElement.append(pElementResponse);

        // Ajout de la question dans l'historique (sans répéter la réponse)
        addQuestionToHistory(prompt);
    } catch (error) {
        console.log(error);
    }
}

function addQuestionToHistory(prompt) {
    // Conteneur pour la question et le bouton de suppression
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');

    const pElementQuestion = document.createElement('p');
    pElementQuestion.textContent = prompt;
    historyItem.appendChild(pElementQuestion);

    // Créer le bouton de suppression
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X'; // Utilisez un symbole ou une icône plus appropriée
    deleteButton.classList.add('delete-history-item');
    historyItem.appendChild(deleteButton);

    // Ajouter le conteneur à l'historique
    historyElement.appendChild(historyItem);

    // Scroll vers le bas de l'historique
    historyElement.scrollTop = historyElement.scrollHeight;

    // Gestion du clic sur la question pour recharger dans l'input
    pElementQuestion.onclick = () => {
        inputElement.value = prompt;
        inputElement.focus(); // Mettre le focus sur l'input
    };

    // Gestion de la suppression de l'élément d'historique
    deleteButton.onclick = (e) => {
        e.stopPropagation(); // Empêcher l'événement de clic sur la question lorsque le bouton est cliqué
        historyElement.removeChild(historyItem); // Supprimer l'élément d'historique
    };
}

