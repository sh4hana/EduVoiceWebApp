const output = document.getElementById("output");

function startRecording() {
    const recognition = new webkitSpeechRecognition();
    
    recognition.lang = "en-IN"; // English India
    recognition.start();

    output.innerText = "Listening... 🎤";

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        output.innerText = transcript;
    };

    recognition.onerror = function() {
        output.innerText = "Error occurred!";
    };
}
function saveText() {
    const text = output.innerText;

    if (text === "" || text === "Listening... 🎤") {
        alert("No text to save!");
        return;
    }

    const li = document.createElement("li");
    li.innerText = text;

    document.getElementById("notesList").appendChild(li);
}
async function summarizeText() {
    const text = document.getElementById("output").innerText;

    if (!text || text === "Listening... 🎤") {
        alert("No text to summarize!");
        return;
    }

    const res = await fetch("http://penguin.linux.test:5000/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    });

    const data = await res.json();

    document.getElementById("summary").innerText = "Summary: " + data.summary;
}
function clearAll() {
    document.getElementById("output").innerText = "";
    document.getElementById("summary").innerText = "";
    document.getElementById("notesList").innerHTML = "";
}