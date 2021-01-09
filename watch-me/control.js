const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const playBackbutton = document.getElementsByName('playback')[0];
const aay = document.querySelectorAll('button[data-skip');
const volumeButton = document.getElementsByName('volume')[0];
const progress = document.querySelector('#progress_filled')

function togglePlay(e){
    video.paused?video.play():video.pause();
    playButton.classList.toggle('play');
    playButton.classList.toggle('pause');
}

playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
playBackbutton.addEventListener('change',function _(e){
    video.playbackRate = this.value;
})

aay.forEach(aby=>{
    aby.addEventListener('click', function _(){
        video.currentTime = eval(`${video.currentTime}${this.dataset.skip}`);
    })
})
volumeButton.addEventListener('change', function _(){
    video.volume = this.value;
})
video.ontimeupdate = function(){
    progress.style.width = `${video.currentTime*100/video.duration}%`;
    if(video.currentTime==video.duration){
        playButton.classList.add('play');
        playButton.classList.remove('pause');
    }
}
