import {hideAll} from './createCategory.js';
import {createCategoryIcons} from './createCategory.js';
import {clearAll} from './clearCategories.js';
import {gameModeActivator, trainModeActivator, playWords, chusenCategorySwitcher, numberMixArr, countAudio} from './gameMode.js';


export let burgerBut = document.querySelector(".burger_button"),
    burgerLineOne = document.querySelector(".line_one"),
    burgerLineTwo = document.querySelector(".line_two"),
    burgerLineThree = document.querySelector(".line_three"),
    asidePanel = document.querySelector('.aside_panel'),
    foodCategory = document.querySelectorAll("body > div.main_wrapper > div > div.category_card"),
    foodCategoryOne = document.querySelector("body > div.main_wrapper > div > div.category_card"),
    categoryBlock = document.querySelector("body > div.main_wrapper > div.category_block"),
    mainWrapper = document.querySelector("body > div.main_wrapper"),
    asideMenuCategories = document.querySelectorAll("body > aside > ol > li.category_list_item > a"),
    asideMainMenuButt = document.querySelector("body > aside > ol > li.category_list_item.mein > a"),
    categoryItemAll = document.querySelectorAll("body > div.main_wrapper > div.category_block > div.category_item"),
    audio = document.querySelectorAll("body > audio"),
    categoryHeader = document.querySelector("body > div.main_wrapper > h1"),
    backButton = document.querySelector("body > div.main_wrapper > div.back_button.game_button"),
    trainCheckBox = document.querySelector("#train"),
    gameCheckBox = document.querySelector("#game"),
    trainButton = document.querySelector("body > div.smile-rating-container > div > form > label.rating-label.rating-label-train"),
    gameButton = document.querySelector("body > div.smile-rating-container > div > form > label.rating-label.rating-label-game"),
    gameModeSwitcher = document.querySelector("body > div.smile-rating-container > div > form > div.toggle-rating-pill"),
    checkedCategory,
    zeroCounter = 0;


function openCloseAside() {
    burgerLineOne.classList.toggle('close_line_one');
    burgerLineTwo.classList.toggle('close_line_two');
    burgerLineThree.classList.toggle('close_line_three');
    asidePanel.classList.toggle('open_aside');
    burgerBut.classList.toggle('burger_button_open');
}
export function closeAside() {
    asidePanel.classList.remove('open_aside');
    burgerLineOne.classList.remove('close_line_one');
    burgerLineTwo.classList.remove('close_line_two');
    burgerLineThree.classList.remove('close_line_three');
    burgerBut.classList.remove('burger_button_open');
    
}

mainWrapper.addEventListener('click', () => {
    closeAside();
});

burgerBut.addEventListener('click', () => {
    openCloseAside();
});

asideMenuCategories.forEach(elem => elem.addEventListener('click', () => {
    console.log(elem.innerText);
    if (elem.innerText.trim().toLowerCase() === 'main page') {
        openCloseAside();
        window.location.reload();
        changeColorList();

        

    } else {
        
        hideAll(foodCategory);
        createCategoryIcons(elem.innerText.trim().toLowerCase());
        openCloseAside();
        changeColorList();
    }


}));

gameButton.addEventListener('click' , () => {
    gameModeActivator(checkedCategory);
    numberMixArr.sort(() => Math.random() - 0.5);
    
});
trainButton.addEventListener('click', () => {
    trainModeActivator();
    

});

foodCategory.forEach(elem => elem.addEventListener('click', (e) => {

    chusenCategorySwitcher();
    console.log(elem.innerText);
    checkedCategory = elem.innerText.trim().toLowerCase();
    closeAside();
    hideAll(foodCategory);
    createCategoryIcons(elem.innerText.trim().toLowerCase());
    changeColorList();
})
);

gameModeSwitcher.addEventListener('click', () => {
    if (gameCheckBox.checked) {
        gameCheckBox.checked = 0;
        trainCheckBox.checked = 1;
        
        trainModeActivator();

    } else {
        gameCheckBox.checked = 1;
        trainCheckBox.checked = 0;
        
        gameModeActivator();
        numberMixArr.sort(() => Math.random() - 0.5);
    }
    
});





export function changeColorList() {
    let categoryHeader = document.querySelector("body > div.main_wrapper > h1");
    asideMenuCategories.forEach(elem => elem.style.color = 'bisque');
    if (categoryHeader === null) {
        asideMenuCategories[0].style.color = 'red';
        console.log('main');
    } else if (categoryHeader.innerText.toLowerCase() === 'food') {
        asideMenuCategories[1].style.color = 'red';
    } else if (categoryHeader.innerText.toLowerCase() === 'transport') {
        asideMenuCategories[2].style.color = 'red';
    } else if (categoryHeader.innerText.toLowerCase() === 'animals') {
        asideMenuCategories[3].style.color = 'red';
    } else if (categoryHeader.innerText.toLowerCase() === 'professions') {
        asideMenuCategories[4].style.color = 'red';
    } else if (categoryHeader.innerText.toLowerCase() === 'actions') {
        asideMenuCategories[5].style.color = 'red';
    } else if (categoryHeader.innerText.toLowerCase() === 'weather') {
        asideMenuCategories[6].style.color = 'red';
    } else if (categoryHeader.innerText.toLowerCase() === 'school') {
        asideMenuCategories[7].style.color = 'red';
    } else if (categoryHeader.innerText.toLowerCase() === 'illness') {
        asideMenuCategories[8].style.color = 'red';
    }
}

changeColorList();

