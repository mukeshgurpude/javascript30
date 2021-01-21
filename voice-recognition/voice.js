window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recogniser = new SpeechRecognition();
recogniser.interimResults = true;
recogniser.lang = 'en-US';

let sentence = document.createElement('p');
const notes = document.querySelector('main.notes');
notes.appendChild(sentence);

recogniser.addEventListener('result', e=>{
    const data = e.results[0];
    sentence.textContent = data[0].transcript;
    
    if(data.isFinal){
        sentence = document.createElement('p');
        notes.appendChild(sentence);
    }
})

recogniser.addEventListener('end', recogniser.start);
recogniser.start();
