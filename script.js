const settingsForm = document.querySelector(".settings");
const previewCard = document.querySelector(".output-preview");
const textInput = document.querySelector(".text-input");
const copyButton = document.querySelector(".copy-output");
const copyStatus = document.querySelector(".copy-status");


function getSetting(settingName) {
    return settingsForm.querySelector(`[name="${settingName}"]`).value
}

function wrapInOuterDiv(textToBeWrapped) {
    return `<div style="
        width: 700px;
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
    const sharedHeaderStyle = `color:${getSetting("color")}; font-family:'${getSetting("font-family")}', 'Segoe UI', sans-serif;`;
    const fontSize = Number(getSetting("font-size"));
    const h1Size = Number(getSetting("h1-size"));
    const h2Size = Number(getSetting("h2-size"));

    mdText = mdText.replace(/^(#{1,6}) (.+?)$/gm, (match, hashes, headerText) => {
        const hashNum = hashes.length;

        if (hashNum == 1) return `<h1 style="${sharedHeaderStyle}font-size:${h1Size}px;">${headerText}</h1>`

        let hnSize = h2Size + ((fontSize - h2Size) * (hashNum-2)/5) // lerp from h2 to normal text size for remaining headers
        return `<h${hashNum} style="${sharedHeaderStyle}font-size:${hnSize}px;">${headerText}</h${hashNum}>`
    });


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

function setCopyStatus(message) {
    if (!copyStatus) return;
    copyStatus.textContent = message;
    if (setCopyStatus.timer) {
        clearTimeout(setCopyStatus.timer);
    }
    setCopyStatus.timer = setTimeout(() => {
        copyStatus.textContent = "";
    }, 2000);
}




updateOutput();
settingsForm.addEventListener("input", updateOutput);
textInput.addEventListener("input", updateOutput);

copyButton.addEventListener("click", async () => {
    const outputText = updateOutput();
    try {
        await navigator.clipboard.writeText(outputText);
        setCopyStatus("Copied!");
    } catch (error) {
        setCopyStatus("Copy failed");
    }
});
