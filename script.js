const voiceSelect = document.querySelector('#voiceSelect');
const playButton = document.querySelector('#playButton');
const textInput = document.querySelector('textarea');
const languageSelect = document.querySelector("#languageSelect")
// Array of supported languages with their ISO codes
const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'it', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'pt-PT', name: 'Portuguese (Portugal)' }
  ];



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
