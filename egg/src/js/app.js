import {v} from './save';
import * as data from './data';
// import './data';

console.log(v);
console.log(data.d);

  // maybe take out the unlock property?
  // consider general re-organizing of objects ..
  
  // use object constructor ?
  function Thing(name, count, html, unlock = undefined, sell) {
    this.name = name;
    this.count = count;
    this.html = html;
    this.unlock = unlock;
    this.sell = sell;
  }
  // or use the new es6 classes??

  // class declaration
  class Generator {
    constructor(name, count, html, price, produce) {
      this.name = name;
      this.count = count;
      this.html = html;
      this.price = price;
      this.produce = produce;
    }
  }
  
  const test = new Generator('chicken');

  var egg = {
    name: 'egg',
    count: 0,
    html: {
      container: '.egg',
      counter: '#egg-count',
      buyButton: '#egg-btn',
      sellButton: '#egg-sell',
    },
    unlock: [
      {
        name: 'money',
        atCount: 5,
      },
    ],
    sell: {
      count: 12,
      money: 0.5, // per one egg
    }
  };
  var money = {
    name: 'money',
    count: 0,
    html: {
      container: '.money',
      counter: '#money-count'
    },
    unlock: [
      {
        name: 'chicken',
        atCount: 10
      }
    ]
  };
  var chicken = {
    name: 'chicken',
    count: 0,
    html: {
      container: '.chicken',
      counter: '#chicken-count',
      buyButton: '#chicken-buy',
    },
    buy: {
      type: money.name,
      amount: 20
    },
    produce: {
      type: egg.name,
      amount: 0.5
    },
  };

  var className = {
    hidden: 'hidden'
  }

  // loadSave();
  
  function updateCount(thing) {
    if (!document.querySelector(thing.html.container).classList.contains(className.hidden)) {
      if (thing.name === 'money') {
        document.querySelector(thing.html.counter).innerHTML = thing.count.toFixed(2);
      } else {
        document.querySelector(thing.html.counter).innerHTML = thing.count;
      }
    }
  }

  // set count
  // TODO: make this a loop
  updateCount(egg);
  updateCount(money);
  updateCount(chicken);

    // this should be moved/made less manual , put in a loop?
  document.body.addEventListener('click', function() {
    updateCount(egg);
    updateCount(money);
    updateCount(chicken);
    unlock(egg, money);
    unlock(money, chicken);
    enableOrDisableButton(egg, 12, egg.html.sellButton);
    enableOrDisableButton(money, chicken.buy.amount, chicken.html.buyButton);
  });

  addClickCount(egg);

  // clicker
  function addClickCount(thing) {
    document.querySelector(thing.html.buyButton).addEventListener('click', function() {
      thing.count++;
      updateCount(thing);

    });
  }

  function checkIfArray(thing) {
    if (Array.isArray(thing)) {
      return true;
    } else {
      return false
    }
  }
  // unhide
  function unhide(hiddenThing){
    document.querySelector(hiddenThing.html.container).classList.remove(className.hidden);
    updateCount(hiddenThing);
  }
  // unlock
  function unlock(unlockingThing, lockedThing) {
    // make sure locked thing is already hidden
    if (document.querySelector(lockedThing.html.container).classList.contains(className.hidden)) {
      // is the locked thing in an array?
      if (checkIfArray(unlockingThing.unlock)) {
        // if yes, loop through array
        for (i = 0; i < unlockingThing.unlock.length; i++) {
          // check name and cost
          if ((lockedThing.name === unlockingThing.unlock[i].name) && (unlockingThing.count >= unlockingThing.unlock[i].atCount)) {
            unhide(lockedThing);
          }
        }
      } else {
        // no it's an object, not array
        if ((lockedThing.name === unlockingThing.unlock.name) && (unlockingThing.count >= unlockingThing.unlock[i].atCount)) {
          unhide(lockedThing);
        }
      }
    }
  }

  // enable buttons
  function enableOrDisableButton(thing, amount, button) {
    if (thing.count >= amount) {
      document.querySelector(button).disabled = false;
    } else {
      document.querySelector(button).disabled = true;
    }
  }

  function sellThing(thing) {
    document.querySelector(thing.html.sellButton).addEventListener('click', function() {
      money.count = money.count + (thing.sell.money * thing.sell.count);
      thing.count = thing.count - thing.sell.count;
      // TODO: finish this function
      updateCount(thing);
      updateCount(money);
    });
  }

  sellThing(egg);


  var save = {
    egg: egg,
    money: money,
    chicken: chicken
  };

  document.getElementById('save').addEventListener('click', function() {
    localStorage.setItem("save",JSON.stringify(save));
  });
  document.getElementById('load').addEventListener('click', function() {
    var saved = JSON.parse(localStorage.getItem('save'));
    egg = saved.egg;
    money = saved.money;
    chicken = saved.chicken;
  });
  