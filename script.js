document.addEventListener('DOMContentLoaded', () => {
    const voiceSelect = document.querySelector('#voiceSelect');
    const textInput = document.querySelector('textarea');
    const languageSelect = document.querySelector('#languageSelect');
    const translateButton = document.querySelector('#translateButton');
    const translationResult = document.querySelector('#translationResult');

    // Array of supported languages
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh-CN', name: 'Chinese (Simplified)' },
        { code: 'pt-BR', name: 'Portuguese (Brazil)' },
        { code: 'pt-PT', name: 'Portuguese (Portugal)' }
    ];

    // Populate language dropdown
    languages.forEach(({ code, name }) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        languageSelect.appendChild(option);
    });

    // Load available voices
    let voices = [];
    function loadVoices() {
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = voices
            .map((voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`)
            .join('');
    }

    // Load voices when they're available
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    // Translate & Speak
    translateButton.addEventListener('click', async () => {
        const text = textInput.value;
        const targetLang = languageSelect.value;

        if (text.trim() === '') {
            alert('Please enter some text to translate.');
            return;
        }

        try {
            // Translate the text
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
            const data = await res.json();
            const translatedText = data.responseData.translatedText;

            // Display the translated text
            translationResult.textContent = translatedText;

            // Speak the translated text
            const utterance = new SpeechSynthesisUtterance(translatedText);
            const selectedVoice = voices[voiceSelect.value];
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            speechSynthesis.speak(utterance);

        } catch (error) {
            console.error('Translation error:', error);
            translationResult.textContent = 'Translation failed. Please try again.';
        }
    });
});