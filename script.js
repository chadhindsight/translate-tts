const voiceSelect = document.querySelector('#voiceSelect');
const playButton = document.querySelector('#playButton');
const textInput = document.querySelector('textarea');

// supported languages
const languages = []

// Load available voices
let voices = []
function loadVoices(){
    voices = speechSynthesis.getVoices();

    voiceSelect.innerHTML = voices.map(
        (voice, index) =>
            `<option value="${index}">${voice.name}(${voice.lang})</option>`
    ).join('');
}

// Load voices when they're available 
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Play TTS by adding an event listener
playButton.addEventListener('click', ()=>{
    const utterance = new SpeechSynthesisUtterance(textInput.value);
    speechSynthesis.speak(utterance);
    const selectedVoice = voices[voiceSelect.value];
    if(selectedVoice) {utterance.voice = selectedVoice};
    speechSynthesis.speak(utterance);
})
