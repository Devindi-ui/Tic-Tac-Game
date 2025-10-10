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
        });

        //listen for reset btn click
        document.addEventListener('click', (e) => {
            if(e.target.id === 'resetBtn'){
                this.playClickSound();
            }
        });

        this.observerStateChange();
    }

    observerStateChange(){
        const statusText = document.getElementById('status-text');
        const observer = new MutationObserver((mutation) => {
            mutation.forEach((mutation) => {
                if(mutation.type === 'childList' || mutation.type === 'characterData'){
                    const text = statusText.textContent;

                    if(text.includes('You Win')){
                        this.playWinSound();
                    } else if(text.includes('Computer Wins')) {
                        this.playLoseSound();
                    } else if(text,includes("It's a draw")) {
                        this.playDrawSound();
                    }
                }
            });
        });

        observer.observe(statusText, {
            childList: true, //child elements add/remove
            characterData: true, //text character changes
            subtree: true
        });
    }
    

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

    playWinSound(){
        if( !this.isMuted ){
            this.winSound.play().catch(e =>console.log('Win sound failed:', e));
        }

        //resume background music after win sound
        setTimeout(() => {
            this.startBackgroundMusic();
        }, 3000);
    }


    playLoseSound(){
        if( !this.isMuted ){
            this.backgroundMusic.pause();
            this.winSound.play().catch(e=>console.log('Lose sound failed:', e));
        }
        
        //resume background music after win sound
        setTimeout(() => {
            this.startBackgroundMusic();
        }, 3000);

    }

    playDrawSound(){

    }

}

document.addEventListener('DOMContentLoaded', () => {
    new AudioManager();

});