const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playlistButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playlistSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

//index for songs
let index;

//initially loop=true
let loop = true;

const songsList = [
    {
        name: "Animated",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Animated.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Animated.jpg",
    },
    {
        name: "As They Bloom",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - As They Bloom.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/As They Bloom.jpg",
    },
    {
        name: "Best At Being The Worst",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Best At Being The Worst.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Best At Being The Worst.jpg",
    },
    {
        name: "Dread",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Dread.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Dread.jpg",
    },
    {
        name: "Fata Morgana",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Fata Morgana.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Fata Morgana.jpg",
    },
    {
        name: "It's Vengeance You Want",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - If It's Vengeance You Want.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/If It's Vengeance You Want.jpg",
    },
    {
        name: "Intoxicate Me",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Intoxicate Me.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Intoxicate Me.jpg",
    },
    {
        name: "Map of You",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Map of You.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Map of You.jpg",
    },
    {
        name: "More Than I Remember",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - More Than I Remember You.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/More Than I Remember You.jpg",
    },
    {
        name: "My Life Away",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - My Life Away.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/My Life Away.jpg",
    },
    {
        name: "Question",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Question.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Question.jpg",
    },
    {
        name: "Rain on My Happy Days",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Rain on My Happy Days.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Rain on My Happy Days.jpg",
    },
    {
        name: "Reset Rewind",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Reset Rewind.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Reset Rewind.jpg",
    },
    {
        name: "Stuck",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Stuck.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Stuck.jpg",
    },
    {
        name: "Supposed to Fall",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - Supposed to Fall.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/Supposed to Fall.jpg",
    },
    {
        name: "We Sing Along",
        link: "music/Unlike Pluto Playlist/soundtrack/Unlike Pluto - We Sing Along.mp3",
        artist: "Unlike Pluto",
        image: "music/Unlike Pluto Playlist/album/We Sing Along.jpg",
    },
];

//events object
let events = {
    mouse: {
        click: "click",
    },
    touch: {
        click: "touchstart",
    },
};

let deviceType = "";

//Detect touch device

const isTouchDevice = () => {
    try {
        //We try to create TouchEvent(it would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

//Format time (convert ms to seconds, minutes and add 0 id less than 10)
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
};

//set song
const setSong = (arrayIndex) => {
    //this extracts all the variables from the object
    let { name, link, artist, image } = songsList[arrayIndex];
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImage.src = image;
    //display duration when metadata loads
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };
};

//play song
const playAudio = () => {
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
};

//repeat button
repeatButton.addEventListener("click", () => {
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active");
        audio.loop = false;
        console.log("repeat off");
    } else {
        repeatButton.classList.add("active");
        audio.loop = true;
        console.log("repeat on");
    }
});

//Next song
const nextSong = () => {
    //if loop is true then continue in normal order
    if (loop) {
        if (index == songsList.length - 1) {
            //If last song is being played
            index = 0;
        } else {
            index += 1;
        }
        setSong(index);

        playAudio();
    } else {
        //else find a random index and play that song
        let randIndex = Math.floor(Math.random() * songsList.length);
        console.log(randIndex);
        setSong(randIndex);
        playAudio();
    }
};

//pause song
const pauseAudio = () => {
    audio.pause();
    pauseButton.classList.add("hide");
    playButton.classList.remove("hide");
};

//previous song ( you can't go back to a randomly played song)
const previousSong = () => {
    if (index > 0) {
        pauseAudio();
        index -= 1;
    } else {
        //if first song is being played
        index = songsList.length - 1;
    }
    setSong(index);
    playAudio();
};

//next song when current song ends
audio.onended = () => {
    nextSong();
};

//Shuffle songs
shuffleButton.addEventListener("click", () => {
    if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove("active");
        loop = true;
        console.log("shuffle off");
    } else {
        shuffleButton.classList.add("active");
        loop = false;
        console.log("shuffle on");
    }
});

//play button
playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

//pause button
pauseButton.addEventListener("click", pauseAudio);

//prev button
prevButton.addEventListener("click", previousSong);

//if user clicks on progress bar
isTouchDevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
    //start of progressBar
    let coordStart = progressBar.getBoundingClientRect().left;
    //mouse click position
    let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

    //set width to progress
    currentProgress.style.width = progress * 100 + "%";

    //set time
    audio.currentTime = progress * audio.duration;

    //play
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
});

//update progress every second
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
    currentProgress.style.width =
        (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
});

//update time
audio.addEventListener("timeupdate", () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//Creates playlist
const initializePlaylist = () => {
    for (let i in songsList) {
        playlistSongs.innerHTML += `<li class='playlistSong' onclick='setSong(${i})'>
            <div class="playlist-image-container">
                <img src="${songsList[i].image}"/>
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>`;
    }
};

//display playlist
playlistButton.addEventListener("click", () => {
    playlistContainer.classList.remove("hide");
});

//hide playlist
closeButton.addEventListener("click", () => {
    playlistContainer.classList.add("hide");
});

window.onload = () => {
    //initially first song
    index = 0;
    setSong(index);
    //create playlist
    initializePlaylist();
};