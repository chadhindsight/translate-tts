document.addEventListener('DOMContentLoaded', () => {
    const voiceSelect = document.querySelector('#voiceSelect');
    const textInput = document.querySelector('textarea');
    const languageSelect = document.querySelector('#languageSelect');
    const translateButton = document.querySelector('#translateButton');
    const translationResult = document.querySelector('#translationResult');
    const darkModeToggle = document.getElementById("darkModeToggle");
    const appContainer = document.querySelector('.bg-white');
    const darkModeText = document.getElementById('dark-mode-text');
    const labelElements = document.querySelectorAll('label');

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

    // Populate the language dropdown
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

    // Dark mode logic
    function updateDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            // Update UI elements for dark mode
            appContainer.classList.add('bg-gray-800', 'text-white');
            appContainer.classList.remove('bg-white');
            darkModeText.classList.add('text-white');
            darkModeText.classList.remove('text-gray-800');
            textInput.classList.add('bg-gray-700', 'text-white', 'border-gray-600');
            languageSelect.classList.add('bg-gray-700', 'text-white', 'border-gray-600');
            voiceSelect.classList.add('bg-gray-700', 'text-white', 'border-gray-600');
            translationResult.classList.add('bg-gray-700', 'text-white', 'border-gray-600');
            labelElements.forEach(label => {
                label.classList.add('text-gray-300');
                label.classList.remove('text-gray-700');
            });
            console.log(darkModeText.classList)
        } else {
            // Reset to light mode
            appContainer.classList.remove('bg-gray-800', 'text-white');
            appContainer.classList.add('bg-white');
            darkModeText.classList.remove('text-white');
            darkModeText.classList.add('text-gray-800');
            textInput.classList.remove('bg-gray-700', 'text-white', 'border-gray-600');
            languageSelect.classList.remove('bg-gray-700', 'text-white', 'border-gray-600');
            voiceSelect.classList.remove('bg-gray-700', 'text-white', 'border-gray-600');
            translationResult.classList.remove('bg-gray-700', 'text-white', 'border-gray-600');
            labelElements.forEach(label => {
                label.classList.remove('text-gray-300');
                label.classList.add('text-gray-700');
            });
        }
    }
    
    darkModeToggle.addEventListener('click', () => {
        // Toggle dark mode on html element (for Tailwind dark variants)
        document.documentElement.classList.toggle('dark');
        
        // Save the user's preference in localStorage
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        
        // Update UI elements
        updateDarkMode();
    });
    
    // Initial UI update based on current mode
    updateDarkMode();
});