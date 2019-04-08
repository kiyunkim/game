import 'normalize.css';
import '../css/main.scss';

import './dev';
// import {data} from './data';


// variables
const initData = {
  increment: 0,
  upgrades: {
    save: false
  }
}
let data = initData;

const tick = 1000;
const body = document.querySelector('body');
const incrementButton = document.getElementById('increment');
const upgradeButton = document.querySelectorAll('.upgrade');

const saveName = 'code-save';
// dev info
const versionNumber = VERSION;
const version = document.querySelector('#version');

version.innerHTML = 'v'+versionNumber;


// ticker
function ticker() {
  //update();
}
export let interval = setInterval(ticker, tick);

// increment click
incrementButton.onclick = function(){
  data.increment++;
};

// check for upgrades
function checkUpgrades(){
  for (let i = 0; i < upgradeButton.length; i++) {
    if (data.increment >= upgradeButton[i].dataset.min) {
      upgradeButton[i].classList.remove('hidden');
      if (data.increment >= upgradeButton[i].dataset.cost) {
        upgradeButton[i].disabled = false;
      }
    }
    else {
      upgradeButton[i].classList.add('hidden');
      upgradeButton[i].disabled = true;
    }
  }
}


// get upgrade
for (let i = 0; i < upgradeButton.length; i++) {
  upgradeButton[i].onclick = function(){
    // get type of upgrade
    let type = this.dataset.type;
    switch (type) {
      case 'unlock':
        data.upgrades[this.dataset.unlock] = true;
        break;
      default:
        console.log('not sure what type this is');
    }
  }
}

// update data
body.addEventListener('click', function(){
  update();
});

function update() {
  document.querySelector('.increment-counter').innerHTML = data.increment;
  checkUpgrades();
  if (data.upgrades.save) {
    document.querySelector('header').classList.remove('hidden');
    enableSave();
  }
  console.log(data);
}

// on page load
window.onload = function() {
  let save = JSON.parse(localStorage.getItem(saveName));
  if (save) {
    data = save;
  }
  update();
}


// save
export function enableSave(){

  document.getElementById('save').addEventListener('click', function(e){
    let save = data;
    try {
      var success = true;
      // try saving..
      try {
        localStorage.setItem(saveName, JSON.stringify(save));
      } catch(e) {
        success = false;
        console.log('Error occurred while trying to save!   "'+e+'"');
      }
  
      if(success) {
        console.log('Saved successfully');
      }
    
    } catch(e) {
      console.log('Something went wrong while trying to save');
    }
  });
  
  // load
  document.getElementById('load').addEventListener('click', function(e){
    let save = JSON.parse(localStorage.getItem(saveName));
    data = save;
    update();
  });
  
  // reset
  document.getElementById('reset').addEventListener('click', function(e){
    if (confirm('Are you sure you want to clear your save? This will wipe out everything!')) {
      localStorage.removeItem(saveName);
      data = initData;
      update();
    }
  });
}