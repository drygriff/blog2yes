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

function fromMarkdown(mdText) {

    //headers
    inputMd = inputMd.replace(/^(#{1,6}) (.+?)$/gm, `<h${"$1".length}>$2</h${"$1".length}>`);


    // bold
    mdText = mdText.replace(/(?<!\\)\*\*(.+?)(?<!\\)\*\*/gs, "<strong>$1</strong>");
    // italics
    mdText = mdText.replace(/(?<!\\)\*(.+?)(?<!\\)\*/gs, "<i>$1</i>");

    // underline
    mdText = mdText.replace(/(?<!\\)__(.+?)(?<!\\)__/gs, "<u>$1</u>");
    // strikethrough
    mdText = mdText.replace(/(?<!\\)~~(.+?)(?<!\\)~~/gs, "<strike>$1</strike>");


    //remove escape key ex: "\*" -> "*"
    mdText = mdText.replace(/\\(.)/g, "$1");

    return mdText;
}

function updateOutput() { // Updates HTML directly so users can input HTML if they want
    let outputText = textInput.textContent;

    outputText = fromMarkdown(outputText);
    outputText = outputText.replace(/\r?\n/g, "<br>");


    outputText = wrapInOuterDiv(outputText);
    previewCard.innerHTML = outputText;
    return outputText;
}


updateOutput();
settingsForm.addEventListener("input", updateOutput);
textInput.addEventListener("input", updateOutput);
