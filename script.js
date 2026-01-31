const settingsForm = document.querySelector(".settings");
const previewCard = document.querySelector(".output-preview");
const textInput = document.querySelector(".text-input");


function getSetting(settingName) {
    return settingsForm.querySelector(`[name="${settingName}"]`).value
}

function updateOutput() { // Updates HTML directly so users can input HTML if they want
    let outputText = textInput.textContent;


    //italics
    outputText = outputText.replace(/(?<!\\)\*(.+?)(?<!\\)\*/g, "<i>$1</i>");


    outputText = `<div style="
        width: 800px;
        background-color: ${getSetting("background-color")};
        color: ${getSetting("color")};
        font-size: ${getSetting("font-size")}px;
        font-family: '${getSetting("font-family")}', 'Segoe UI', sans-serif;
        border-radius: ${getSetting("border-radius")}px;
        padding: ${getSetting("padding")}px;
        ">${outputText}</div>`;

    previewCard.innerHTML = outputText;
}


updateOutput();
settingsForm.addEventListener("input", updateOutput);
textInput.addEventListener("input", updateOutput);
