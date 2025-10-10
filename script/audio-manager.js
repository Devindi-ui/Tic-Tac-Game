//Handle all game sounds

class AudioManager {
    constructor (){
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.clickSound = document.getElementById('clickSound');
        this.winSound = document.getElementById('winSound');
        this.loseSound = document.getElementById('loseSound');
        this.musicToggle = document.getElementById('musicToggle');

        this.isMuted = false;
        this.musicVolume = 0.2;
        this.effectsVolume = 0.6;

        this.init();
    }

    init(){
        //set initialize volumes
        this.backgroundMusic.volume = this.musicVolume;
        this.clickSound.volume = this.effectsVolume;
        this.winSound.volume = this.effectsVolume;
        this.loseSound.volume = this.effectsVolume;

        document.addEventListener('click', ()=> this.startBackgroundMusic());

        this.musicToggle.addEventListener('click', () => this.toggleMusic());

        this.addGameEventListners();

    }

    addGameEventListners(){
        //Listen for cell clicks
        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('cell') && !(e.target.disabled)){
                this.playClickSound();
            }
        })

        //listen for reset btn click
        document.addEventListener('click', (e) => {
            if(e.target.id === 'resetBtn'){
                this.playClickSound();
            }
        })
    }

    observerState
    

    startBackgroundMusic(){
        if(!this.isMuted){
            this.backgroundMusic.play().catch
            (e=>console.log('Audio play failed:',e));
            this.musicToggle.classList.add('playing');
            
        }
    }

    toggleMusic(){
        this.isMuted = !this.isMuted;

        if(this.isMuted){
            this.backgroundMusic.pause();
            this.musicToggle.textContent = '🔇';
            this.musicToggle.classList.add('muted');
            this.musicToggle.classList.remove('playing');
        }else{
            this.backgroundMusic.play().catch
                (e => console.log('Audio play failed:', e));
            this.musicToggle.textContent = '🔊';
            this.musicToggle.classList.remove('muted');
            this.musicToggle.classList.add('playing');
        }
    }

    playClickSound(){
        if(!this.isMuted){
            this.clickSound.play().catch(e=>console.log('Click sound error:', e));
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new AudioManager();

});