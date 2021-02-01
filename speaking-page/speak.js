let msg = new SpeechSynthesisUtterance();
let voices = [];
const textBox = document.querySelector('textarea');
const stopButton = document.querySelector('#stop');
const speakButton = document.querySelector('#speak');
const options = document.querySelectorAll('[type=range], textarea');
const voiceChanger = document.querySelector('select[name=voice');
const pasteButton = document.querySelector('textarea+span');

function addVoices(){
    voices = this.getVoices();
    document.querySelector('select[name=voice').innerHTML = voices.reduce((html, voice, idx)=>`${html}<option data-idx='${idx}'>${voice.name} ↔ ${voice.lang}</option>`, '');
}

function toggle(startOver=true){
    msg.text = textBox.value;
    speechSynthesis.cancel();
    if(startOver){
        speechSynthesis.speak(msg);
    }
}

speechSynthesis.addEventListener('voiceschanged', addVoices);
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', _=>toggle(false));
document.addEventListener('keydown', function(e){
    if(e.ctrlKey && e.key==="Enter"){
        msg.text = this.value;
        toggle();
    }
});
options.forEach(option=>option.addEventListener('change', function(){
    msg[this.name] = this.value;
}))
voiceChanger.addEventListener('change', function(){
    msg[this.name] = voices.find(voice=>this.value.includes(voice.name));
    toggle();
})
pasteButton.addEventListener('click', _=>{
    if(navigator.clipboard){
        navigator.clipboard.readText()
        .then(data=>textBox.innerText=data)
        .catch(err=>alert("Operation failed"));
    }else{
        alert('Clipboard not supported');
    }
})
window.addEventListener('unload', _=>speechSynthesis.cancel())
