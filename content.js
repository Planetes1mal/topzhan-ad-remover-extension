console.log("Zhan Ad Remover: Content script loaded.");

function removeAdModal() {
    const adElement = document.querySelector('div.model_mask');

    if (adElement) {
        console.log("Zhan Ad Remover: Found ad element, removing it.");
        adElement.remove();
    } else {
        console.log("Zhan Ad Remover: Ad element not found.");
    }
}

removeAdModal();