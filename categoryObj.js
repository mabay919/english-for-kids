import {categoryBlock, mainWrapper, foodCategory, asideMenuCategories, closeAside, changeColorList, gameCheckBox} from './index.js';
import {clearAll} from './clearCategories.js';
import {translaterRU, translaterEN} from "./translater.js";
import {chusenCategorySwitcher, mayPlaySwitcherFalse} from './gameMode.js';

export let food = ['sausage', 'burger', 'cheese', 'sandwich', 'tea', 'sweets', 'cupcake', 'juice'],
    transport = ['rocket', 'airship', 'balloon', 'hang-glider', 'aircraft', 'motorcycle', 'ship', 'bike'],
    animals = ['skunk', 'ferret', 'squirrel', 'shark', 'ant', 'sloth', 'elephant', 'giraffe'],
    professions = ['teacher', 'cosmonaut', 'policeman', 'doctor', 'firefighter', 'builder', 'musician', 'programmer'],
    actions = ['kiss', 'embrace', 'smile', 'apologize', 'shout', 'fight', 'cry', 'crawl'],
    weather = ['wind', 'snow', 'rain', 'lightning', 'ice', 'frost', 'hurricane', 'avalanche'],
    school = ['pencil case', 'album', 'globe', 'map', 'pencil', 'book', 'backpack', 'desk'],
    illness = ['nausea', 'fever', 'acne', 'treatment', 'flu', 'pill', 'itch', 'injection'];


export function returnCategoryArr(str) {
    if (str === 'food') {
        return food;
    } else if (str === 'transport') {
        return transport;
    } else if (str === 'animals') {
        return animals;
    } else if (str === 'professions') {
        return professions;
    } else if (str === 'actions') {
        return actions;
    } else if (str === 'weather') {
        return weather;
    } else if (str === 'school') {
        return school;
    } else return illness;
}

export function categoryPattern(name) {
       
    let categoryName = document.createElement('h1');
    categoryName.innerText = `${name.toUpperCase()}`;
    categoryName.classList.add('category_header');
    mainWrapper.prepend(categoryName);

    let backButton = document.createElement('div');
    backButton.innerHTML = `<a href='#' class='button_link'>Menu!</a>`;
    backButton.classList.add('back_button', 'game_button');
    mainWrapper.prepend(backButton);
    backButton.addEventListener('click', () => {
        
        
        if (gameCheckBox.checked) {
            window.location.reload();
        } else {
        foodCategory.forEach(elem => elem.classList.remove('display_none'));
        closeAside();
        clearAll(categoryItemAll);
        clearAll(audio);
        backButton.remove(backButton);
        categoryName.remove(categoryName);
        changeColorList();
        chusenCategorySwitcher();
        
        }
    });

    asideMenuCategories.forEach(elem => elem.addEventListener('click', () => {

       
            clearAll(categoryItemAll);
            clearAll(audio);
            backButton.remove(backButton);
            categoryName.remove(categoryName);
            changeColorList();
        
    }));


    for(let i = 0; i < 8; i += 1) {
        let categoryInnerBlock = document.createElement('div'),
        categoryCard = document.createElement('div'),
        blockingBox = document.createElement('div'),
        blockingBoxGameMode = document.createElement('div');

        categoryBlock.append(categoryInnerBlock);

            categoryInnerBlock.prepend(blockingBox);
            categoryInnerBlock.prepend(blockingBoxGameMode);
            blockingBoxGameMode.classList.add('game_mode_block_box');
            blockingBoxGameMode.innerText = `${returnCategoryArr(name)[i]}`;
            
            categoryInnerBlock.append(categoryCard); 
            categoryCard.classList.add("category_card", "food_card")
            categoryCard.innerHTML = `
            <div class="content ${name}">
            <div class="img_box">
                <img src="./assets/category/${name}/${name}_${i + 1}.jpg" alt="${name} card">
            </div>
            <div class="text_box text_box_category_item">
                ${returnCategoryArr(name)[i]}
            </div>
        </div>`;

        
        categoryInnerBlock.classList.add('category_item', `${name}_category_block_${i + 1}`);
        
        let revButt = document.createElement('div');
        categoryInnerBlock.append(revButt);
        revButt.classList.add('reverse_button');
        
        revButt.addEventListener('click', () => {
            categoryCard.querySelector('div.text_box').classList.toggle('reverse');
            
            categoryCard.querySelector('div.text_box').innerText = translaterRU(categoryCard.querySelector('div.text_box').innerText);       
            categoryCard.classList.toggle("reverse");
            blockingBox.classList.toggle('blocking_box');
            revButt.classList.toggle('display_none');
        });

        blockingBox.addEventListener('mouseout', () => {
            categoryCard.querySelector('div.text_box').innerText = translaterEN(categoryCard.querySelector('div.text_box').innerText); 
            blockingBox.classList.toggle('blocking_box');
            categoryCard.classList.toggle("reverse");
            revButt.classList.toggle('display_none');
            categoryCard.querySelector('div.text_box').classList.toggle('reverse');
        });

        let audio = document.createElement('audio');
        document.body.append(audio);
        audio.classList.add(`audio_file_${i}`);
        audio.setAttribute('data-key', `${returnCategoryArr(name)[i]}`);
        audio.setAttribute('src', `./assets/category/${name}/${returnCategoryArr(name)[i]}.mp3`);


        categoryCard.addEventListener('click', (e) => {
            console.log(categoryCard.innerText);
            chusenCategorySwitcher();
            closeAside();
            const audio = document.querySelector(`audio[data-key="${categoryCard.innerText}"]`);
            if (!audio) return;
            audio.currentTime = 0;
            audio.play();
        });
}

let categoryItemAll = document.querySelectorAll("body > div.main_wrapper > div.category_block > div.category_item"),
    audio = document.querySelectorAll("body > audio");
    changeColorList();
    
}