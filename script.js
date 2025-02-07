const micBtn = document.getElementById("mic-btn");
const responseDiv = document.getElementById("response");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";

micBtn.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = (event) => {
    let userSpeech = event.results[0][0].transcript.toLowerCase();
    responseDiv.innerText = "You said: " + userSpeech;
    
    if (userSpeech.includes("hello")) {
        speak("Hello boss, how can I help?");
    } else if (userSpeech.includes("what is your name")) {
        speak("I am Mimi, your AI assistant.");
    } else if (userSpeech.includes("open google")) {
        speak("Opening Google.");
        window.open("https://www.google.com", "_blank");
    } else {
        speak("I didn't understand that, boss.");
    }
};

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}