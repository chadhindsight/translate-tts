# TTS & Translate App

## Description
This is a JavaScript web application that allows users to input text and convert it into speech (TTS).Based on [Brad Traversy's Youtube Tutorial](https://www.youtube.com/watch?v=V0P3Opf-zUs&t=1104s). The tutorial video uses google translate API, but this project usesthis version uses the MyMemory Translation API instead as it does not required a paid API key. instead. Additionally, users can select a language to translate the text before it is spoken. The project utilizes serverless functions for translation and API key security.

## Technologies Used

- JavaScript (Vanilla JS for functionality)

- Web Speech API (For text-to-speech conversion)
 
- LibreTranslate Translate API (For text translation)
 
- Vercel CLI (For deploying serverless functions)
 
- Tailwind CSS (For styling)

## Features

1. Convert input text into speech using Web Speech API.

2. Translate text into a selected language before speech output.

3. Secure API requests using serverless functions.

4. Minimalist and responsive UI with Tailwind CSS.

Installation & Setup

### Clone the repository:

1. ``` git clone https://github.com/chadhindsight/tts-translate-app.git ```

2. Navigate into the project directory:

``` cd tts-translate-app```

### Install dependencies (if applicable):

``` npm install ```


#### Deployment

To deploy the app using Vercel:

``` vercel --prod ```

### Usage

1. Enter text into the input field.

2. Select a target language for translation.

3. Click the "Translate & Speak" button to hear the translated text spoken out loud.

### License

This project is licensed under the MIT License.

### Author

[Chad Hinds] - [https://github.com/chadhindsight]