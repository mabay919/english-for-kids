import {food,
transport,
animals,
professions,
actions,
weather,
school,
illness, returnCategoryArr} from './categoryObj.js';
import {categoryBlock, mainWrapper, foodCategory, asideMenuCategories, closeAside, changeColorList} from './index.js';
import {clearAll} from './clearCategories.js';
import {translaterRU, translaterEN} from "./translater.js";



export let chusenCategory = false,
            gamingNow = false,
            mayPlay = false;
export let audioArr = [],
    numberMixArr = [0, 1, 2, 3, 4, 5, 6, 7],
    countAudio = 0,
    countCorrect = 0,
    countWrong = 0;

function addCorrStar() {
    let starBlock = document.querySelector('.star_block'),
        corrStar = document.createElement('div');

        starBlock.prepend(corrStar);
        corrStar.classList.add('corr_star');
}
function addWrongStar() {
    let starBlock = document.querySelector('.star_block'),
        wrongStar = document.createElement('div');

        starBlock.prepend(wrongStar);
        wrongStar.classList.add('wrong_star');
}

function appendingSounds() {
    let winSound = document.createElement('audio'),
        failSound = document.createElement('audio'),
        wrongAns = document.createElement('audio'),
        corrAns = document.createElement('audio');
        if (!document.querySelector(`audio[data-key="win"]`)) {
            document.body.append(winSound);
        }
        winSound.setAttribute('data-key', 'win');
        winSound.setAttribute('src', './assets/win_finish.mp3');
        if (!document.querySelector(`audio[data-key="fail"]`)) {
            document.body.append(failSound);
        }
        failSound.setAttribute('data-key', 'fail');
        failSound.setAttribute('src', './assets/fail_finish.mp3');
        if (!document.querySelector(`audio[data-key="wrongSon"]`)) {
            document.body.append(wrongAns);
        }
        wrongAns.setAttribute('data-key', 'wrongSon');
        wrongAns.setAttribute('src', './assets/wrong_ans.mp3');
        if (!document.querySelector(`audio[data-key="correctSon"]`)) {
            document.body.append(corrAns);
        }
        corrAns.setAttribute('data-key', 'correctSon');
        corrAns.setAttribute('src', './assets/correct_ans.mp3');
}

function finish() {
    let winImage = 'win_img';
    let winSong = 'win';

    if(countWrong > 0) {
        winImage = 'lose_img';
        winSong = 'fail';
    } else {
        winImage = 'win_img';
        winSong = 'win';
    }
    const audio = document.querySelector(`audio[data-key="${winSong}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

    let finishWrapper = document.createElement('div');
    document.body.prepend(finishWrapper);
    finishWrapper.classList.add('finish_wrapper');

    let finishBlock = document.createElement('div');
    finishWrapper.prepend(finishBlock);
    finishBlock.classList.add('finish_block');
    finishBlock.innerHTML = `<h1 class='finish_block_header'>FINISH!!!</h1>
    <p class='finish_text'>WRONG:  ${countWrong}!<br>CORRECTLY:  ${countCorrect}!</p>
    <img src="./assets/${winImage}.jpg" alt="finish image" class="finish_img">`;

    setTimeout( () => {
        window.location.reload();
    }, 5000);
}

function playSound(ansSon) {
    const audio = document.querySelector(`audio[data-key="${ansSon}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
}

export function playWords(str) {
    if (countAudio === 8) {
        console.log('FINISH!');
        finish();
    }
        if (gamingNow) {
            document.querySelector(".start_button > a").innerText = 'REPEAT!';
        }
            let audio = document.querySelector(`.audio_file_${numberMixArr[countAudio]}`);
            countAudio;
            if (!audio) return;
            audio.currentTime = 0;
            audio.play();
}

function wrongAnim(butt) {
    butt.animate({
       transform : ['rotate(15deg)', 'rotate(-15deg)'],
       transform : ['rotate(15deg)', 'rotate(-15deg)'],
       transform : ['rotate(15deg)', 'rotate(-15deg)'],
       transform : ['rotate(15deg)', 'rotate(-15deg)'],
       transform : ['rotate(15deg)', 'rotate(-15deg)']
    }, 100);
}


export function gameModeActivator(name) {
    let categoryCards = document.querySelectorAll('.category_card'),
        textBlocks = document.querySelectorAll('.text_box_category_item'),
        revButtons = document.querySelectorAll('.reverse_button'),
        blockBoxes = document.querySelectorAll("body > div.main_wrapper > div.category_block > div.category_item > div.game_mode_block_box"),
        startButton = document.createElement('div'),
        starBlock = document.createElement('div');
        

    startButton.innerHTML = `<a href='#' class='button_link'>START!</a>`;
    startButton.classList.add('back_button', 'start_button');
    if (!document.querySelector(".start_button")) {
        mainWrapper.prepend(startButton);
    }
    startButton.addEventListener('click', (e) => {
        document.body.prepend(starBlock);
        starBlock.classList.add('star_block');
        appendingSounds();
        if (chusenCategory) {
            countCorrect = 0;
            countWrong = 0;
            gamingNow = true;
            mayPlaySwitcher();
            playWords();
        } else {
            wrongAnim(startButton);
        }
        
    });
    
    document.body.style.backgroundImage = 'url(./assets/game_mode_bg.png)';
    textBlocks.forEach(elem => elem.classList.add('visualy_hidden'));
    categoryCards.forEach(elem => elem.classList.add('game_type_card'));
    revButtons.forEach(elem => elem.classList.add('visualy_hidden'));
    blockBoxes.forEach(elem => {
        elem.classList.add('block_for_game_mode');
        
        // if (mayPlay) {
            elem.addEventListener('click', function eventing(e) {
                console.log('click');
                let audio = document.querySelector(`.audio_file_${numberMixArr[countAudio]}`);

                if (countAudio < 8) {
                    if (gamingNow) {
                        if (elem.innerText === audio.dataset.key) {
                            elem.classList.add('checked');
                            elem.removeEventListener('click', eventing);
                            countAudio += 1;
                            countCorrect += 1;
                            playSound('correctSon');
                            addCorrStar();
                            setTimeout( () => {
                                playWords();
                            }, 800);
                            
    
                        } else {
                            
                            playSound('wrongSon');
                            addWrongStar();
                            countWrong += 1;
                            wrongAnim(elem.offsetParent);
                            console.log('wrong');
                        }
                    }
                } else {
                    console.log('finish');
                    countAudio = 0;
                }
            })
        // } 
        // else {
        //     elem.removeEventListener('click', eventing);
        //     console.log('removed_list')
           
        // }
        

    });
    
    
}




export function trainModeActivator(name) {
    let categoryCards = document.querySelectorAll('.category_card'),
        textBlocks = document.querySelectorAll('.text_box_category_item'),
        revButtons = document.querySelectorAll('.reverse_button'),
        blockBoxes = document.querySelectorAll("body > div.main_wrapper > div.category_block > div.category_item > div.game_mode_block_box"),
        startButton = document.querySelector(".start_button"),
        starBlock = document.querySelector('.star_block');

    document.body.style.backgroundImage = 'url(./assets/train_mode_bg.jpg)';
    textBlocks.forEach(elem => elem.classList.remove('visualy_hidden'));
    categoryCards.forEach(elem => elem.classList.remove('game_type_card'));
    revButtons.forEach(elem => elem.classList.remove('visualy_hidden'));
    blockBoxes.forEach(elem => elem.classList.remove('block_for_game_mode'));
    startButton.remove(startButton);
    starBlock.remove(starBlock);
}

export function chusenCategorySwitcher() {
    if (!chusenCategory) {
       chusenCategory = true;
    }
    return chusenCategory;
}
export function mayPlaySwitcher() {
    if (!mayPlay) {
        mayPlay = true;
    }
    return mayPlay;
}
export function mayPlaySwitcherFalse() {
    if (mayPlay) {
        mayPlay = false;
    }
    return mayPlay;
}

let asideMenuCategoriesZero = document.querySelectorAll("body > aside > ol > li.category_list_item > a"),
    trainButtonZero = document.querySelector("body > div.smile-rating-container > div > form > label.rating-label.rating-label-train"),
    gameButtonZero = document.querySelector("body > div.smile-rating-container > div > form > label.rating-label.rating-label-game"),
    gameModeSwitcherZero = document.querySelector("body > div.smile-rating-container > div > form > div.toggle-rating-pill"),
    mainWrap = document.querySelector(".main_wrapper");

function zeroing() {
    countAudio = 0;
    gamingNow = false;
    let blockBoxes = document.querySelectorAll("body > div.main_wrapper > div.category_block > div.category_item > div.game_mode_block_box"),
    starBlock = document.querySelector('.star_block'),
    corrStars = document.querySelectorAll('.corr_star'),
    wrongStars = document.querySelectorAll('.wrong_star');
    blockBoxes.forEach(elem => elem.classList.remove('checked'));
    starBlock.remove(starBlock);
    corrStars.forEach(elem => elem.remove(elem));
    wrongStars.forEach(elem => elem.remove(elem));
    
}

// mainWrap.addEventListener('mouseover', () => {
//     mayPlay = true;

// });

asideMenuCategoriesZero.forEach(elem => elem.addEventListener('click', () => {

    document.querySelector(".start_button > a").innerText = 'START!';
    zeroing();
    chusenCategory = true;
    gamingNow = true;
   
}));
gameButtonZero.addEventListener('click' , () => {
    zeroing();
});
trainButtonZero.addEventListener('click', () => {
    zeroing();

});
gameModeSwitcherZero.addEventListener('click', () => {
    zeroing();
});

