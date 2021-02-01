window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recogniser = new SpeechRecognition();
recogniser.interimResults = true;
recogniser.lang = 'en-US';

let sentence = document.createElement('p');
const notes = document.querySelector('main.notes');
notes.appendChild(sentence);

function write(e){
    const data = e.results[0];
    sentence.textContent = data[0].transcript;

    if(sentence.textContent.includes('restart this game')){
        notes.innerHTML = '';
        sentence.textContent = '';
        notes.appendChild(sentence);
        recogniser.stop();
    }
    
    if(data.isFinal){
        sentence = document.createElement('p');
        notes.appendChild(sentence);
    }
}
recogniser.addEventListener('result', write);

// recogniser.addEventListener('start', _=>{console.log('Start Speaking')})
recogniser.addEventListener('end', recogniser.start);
window.onload = _ => {recogniser.start();};
