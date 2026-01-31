const settingsForm = document.querySelector(".settings");
const previewCard = document.querySelector(".output-preview");
const textInput = document.querySelector(".text-input");


function getSetting(settingName) {
    return settingsForm.querySelector(`[name="${settingName}"]`).value
}

function wrapInOuterDiv(textToBeWrapped) {
    return `<div style="
        width: 800px;
        background-color: ${getSetting("background-color")};
        color: ${getSetting("color")};
        font-size: ${getSetting("font-size")}px;
        font-family: '${getSetting("font-family")}', 'Segoe UI', sans-serif;
        border-radius: ${getSetting("border-radius")}px;
        padding: ${getSetting("padding")}px;
    ">${textToBeWrapped}</div>`;
}

function fromMarkdown(inputMd) {
    //headers
    inputMd = inputMd.replace(/^(#{1,6}) (.+?)$/gm, `<h${"$1".length}>$2</h${"$1".length}>`);

    // bold
    inputMd = inputMd.replace(/(?<!\\)\*\*(.+?)(?<!\\)\*\*/gs, "<strong>$1</strong>");
    // italics
    inputMd = inputMd.replace(/(?<!\\)\*(.+?)(?<!\\)\*/gs, "<i>$1</i>");

    // underline
    inputMd = inputMd.replace(/(?<!\\)__(.+?)(?<!\\)__/gs, "<u>$1</u>");
    // strikethrough
    inputMd = inputMd.replace(/(?<!\\)~~(.+?)(?<!\\)~~/gs, "<strike>$1</strike>");


    //remove escape key ex: "\*" -> "*"
    inputMd = inputMd.replace(/\\(.)/g, "$1");

    return inputMd;
}

function updateOutput() { // Updates HTML directly so users can input HTML if they want
    let outputText = textInput.textContent;

    outputText = fromMarkdown(outputText);
    outputText = outputText.replace(/\r?\n/g, "<br>");


    outputText = wrapInOuterDiv(outputText);
    previewCard.innerHTML = outputText;
}


updateOutput();
settingsForm.addEventListener("input", updateOutput);
textInput.addEventListener("input", updateOutput);
