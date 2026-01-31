const settingsForm = document.querySelector(".settings");
const previewCard = document.querySelector(".output-preview");
const textInput = document.querySelector(".text-input");


function applySettings() {

    previewCard.style.backgroundColor = bgColor;
    previewCard.style.color = textColor;
    previewCard.style.fontSize = `${fontSize}px`;
    previewCard.style.fontFamily = `"${fontFamily}", "Segoe UI", sans-serif`;
};

function updateOutput() { // Updates HTML directly so users can input HTML if they want
    const bgColor = settingsForm.querySelector('[name="bg-color"]').value;
    const textColor = settingsForm.querySelector('[name="text-color"]').value;
    const fontSize = settingsForm.querySelector('[name="font-size"]').value;
    const fontFamily = settingsForm.querySelector('[name="font-family"]').value;
    const borderRadius = settingsForm.querySelector('[name="border-radius"]').value;
    const padding = settingsForm.querySelector('[name="padding"]').value;

    let outputText = textInput.textContent;


    outputText = `<div style="
        width: 800px;
        background-color: ${bgColor};
        color: ${textColor};
        font-size: ${fontSize}px;
        font-family: '${fontFamily}', 'Segoe UI', sans-serif;
        border-radius: ${borderRadius}px;
        padding: ${padding}px;
        ">${outputText}</div>`;

    previewCard.innerHTML = outputText;
}


updateOutput();
settingsForm.addEventListener("input", updateOutput);
textInput.addEventListener("input", updateOutput);
