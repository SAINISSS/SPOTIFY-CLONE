console.log("Welcome To Spotify");
let songindex = 0;
let audioelement = new Audio('1.mp3');
// audioelement.play();
let masterplay = document.getElementById("masterplay")
let myprogressbar = document.getElementById("myprogressbar")
let gif = document.getElementById("gif")
let mastersongname = document.getElementById("mastersongname")
let songitems = Array.from(document.getElementsByClassName("songitem"))

let songs = [
    { songname: "MVP", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songname: "410", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songname: "CALIFORNIA LOVE", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songname: "KING SHIT", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songname: "PAPER BEFORE MONEY", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { songname: "KINNI KINNI", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
    { songname: "8 ASLA", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
]
songitems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})
masterplay.addEventListener("click", () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove("fa-play-circle")
        masterplay.classList.add("fa-pause-circle")
        gif.style.opacity = 1;
    }
    else {
        audioelement.pause();
        masterplay.classList.remove("fa-pause-circle")
        masterplay.classList.add("fa-play-circle")
        gif.style.opacity = 0;

    }
})
audioelement.addEventListener("timeupdate", () => {
    console.log("timeupdate")
    progress = parseInt((audioelement.currentTime / audioelement.duration) * 100)
    myprogressbar.value = progress
})
myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = myprogressbar.value * audioelement.duration / 100;
})
const makeallplay = () => {
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.classList.remove("fa-pause-circle")
        element.classList.add("fa-play-circle")
    })
}
function smallplay() {
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.addEventListener("click", (e) => {
            makeallplay();
            audioelement.currentTime = 0;

            songindex = parseInt(e.target.id)
            e.target.classList.remove("fa-play-circle")
            e.target.classList.add("fa-pause-circle")
            masterplay.classList.remove("fa-play-circle")
            masterplay.classList.add("fa-pause-circle")
            audioelement.src = `songs/${songindex}.mp3`
            mastersongname.innerText = songs[songindex - 1].songname
            audioelement.play();
            gif.style.opacity = 1;

            if (audioelement.pause) {
                element.addEventListener("click", (e) => {
                    audioelement.pause();
                    e.target.classList.remove("fa-pause-circle")
                    e.target.classList.add("fa-play-circle")
                    gif.style.opacity = 0;
                    masterplay.classList.remove("fa-pause-circle")
                    masterplay.classList.add("fa-play-circle")
                    smallplay();
                })
            }
        })
    })
}
smallplay();

document.getElementById("forward").addEventListener("click", () => {
    if (songindex >= 6) {
        songindex = 0
    }
    else {
        songindex += 1
    }

    audioelement.src = `songs/${songindex + 1}.mp3`
    mastersongname.innerText = songs[songindex].songname

    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove("fa-play-circle")
    masterplay.classList.add("fa-pause-circle")

})

document.getElementById("previous").addEventListener("click", () => {
    if (songindex <= 0) {
        songindex = 0
    }
    else {
        songindex -= 1
    }

    audioelement.src = `songs/${songindex + 1}.mp3`
    mastersongname.innerText = songs[songindex].songname
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove("fa-play-circle")
    masterplay.classList.add("fa-pause-circle")
})


