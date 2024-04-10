const endpointURL = 'http://localhost:3001/chat';

window.onload = init;

function init() {
    // Ecouteur sur le bouton
    const buttonElement = document.querySelector('button');
    buttonElement.onclick = sendRequest;
}

// Envoi d'une requête POST à l'API de notre serveur
async function sendRequest() {
    const inputElement = document.querySelector('input#input');
    const temperatureElement = document.querySelector('input#temperature');
    const maxTokensElement = document.querySelector('input#maxTokens');

    const prompt = inputElement.value;
    const temperature = temperatureElement.value;
    const maxTokens = maxTokensElement.value;

    if (prompt === '') return;

    const promptData = new FormData();
    promptData.append('prompt', prompt);
    promptData.append('temperature', temperature);
    promptData.append('max_tokens', maxTokens);

    const response = await fetch(endpointURL, {
        method: 'POST',
        body: promptData
    });

    const data = await response.json();

    // Affiche la réponse dans la console
    console.log(data);
    
     // Div output pour afficher les résultats
    const outputElement = document.querySelector('#output');

    // affiche le resultat dans le div output
    const pElement = document.createElement('p');
    // On récupère le choix de l'IA (regarder la console ou la réponse dans le debugger du navigateur)
    pElement.textContent = data.choices[0].message.content;
    outputElement.append(pElement);

    // On remet à zéro le champ input
    inputElement.value = '';


}