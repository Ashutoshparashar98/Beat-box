console.log("Welcome To Spotify");

// Intialize variables
let SongIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let giphy = document.getElementById('giphy');
let masterSongName = document.getElementById('masterSongName');
let SongItems = Array.from(document.getElementsByClassName('songItem'));

let Songs = [
    {SongName: "Saajna", filepath: "Songs/1.mp3", coverpath: "covers/rr.jpg"},
    {SongName: "Haan tu hai", filepath: "Songs/2.mp3", coverpath: "covers/ff.jpg"},
    {SongName: "Hale Dil", filepath: "Songs/3.mp3", coverpath: "covers/oo.jpg"},
    {SongName: "Tuje Sochta Hu", filepath: "Songs/4.mp3", coverpath: "covers/mm.jpg"},
    {SongName: "Zara sa", filepath: "Songs/5.mp3", coverpath: "covers/ss.jpg"},
    {SongName: "Saware", filepath: "Songs/6.mp3", coverpath: "covers/yy.jpg"},
]

SongItems.forEach((element, i) => {      
    element.getElementsByTagName("img")[0].src = Songs[i].coverpath;
    element.getElementsByClassName("SongName")[0].innerText = Songs[i].SongName;

})

// audioElement.play();

// Handle play/pause click
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        giphy.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        giphy.style.opacity = 0;
    }
})
// Listen to events 
audioElement.addEventListener('timeupdate', ()=>{
   // Update SeekhBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeAllplays = ()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllplays();
        SongIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Songs/${SongIndex+1}.mp3`;
        masterSongName.innerText = Songs[SongIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        giphy.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(SongIndex >= 5) {
        SongIndex = 0;
    }
    else{
        SongIndex += 1;
    }
    audioElement.src = `Songs/${SongIndex+1}.mp3`;
    masterSongName.innerText = Songs[SongIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(SongIndex <= 0) {
        SongIndex = 0;
    }
    else{
        SongIndex -= 1;
    }
    audioElement.src = `Songs/${SongIndex+1}.mp3`;
    masterSongName.innerText = Songs[SongIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})