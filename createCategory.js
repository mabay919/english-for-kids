
export function hideAll(arr) {
    arr.forEach((elem) => elem.classList.add('display_none'));      
     
}

import {changeColorList, trainButton, gameButton, trainCheckBox, gameCheckBox} from './index.js';
import {categoryPattern} from './categoryObj.js';
import {gameModeActivator} from './gameMode.js';


export function createCategoryIcons(name) {
    if (trainCheckBox.checked) {
            categoryPattern(name);
             changeColorList();
             console.log("training");
    } else {
        console.log("gaming");
        categoryPattern(name);
        gameModeActivator(name);
    }

}