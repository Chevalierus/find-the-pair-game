const cards = document.querySelectorAll('.card-item')
let btnRestart = document.querySelector('.btn-restart')

function init () {
    const array = []
    const arrayCopy = []

    for (let index = 1; index <= 8; index++) {
      const element = index;
      array.push(element)
    }

    for (let i= 0; i < array.length; i++) {
      arrayCopy.push(array[i])
      arrayCopy.push(array[i])
    }

    console.log(arrayCopy)

    arrayCopy.forEach.call(document.querySelectorAll('.front-face'), function(div, i) {
        div.textContent = arrayCopy[i]
    })
}
init()

let flippedCard = false
let cardBlock = false
let firstCard, secondCard

function cardFlip() {
    if(cardBlock) return
    if(this === firstCard) return

    this.classList.add('flip')

    if(!flippedCard) {
        flippedCard = true
        firstCard = this
        return
    }

    secondCard = this

    checkMatches()

    if(document.querySelectorAll('.card-item').length == document.querySelectorAll('.card-item.flip').length) {
    btnRestart.style.display = 'block'
    }
}

function checkMatches() {
    if(firstCard.dataset.check === secondCard.dataset.check) {
        disableCard()
        return
    }

    unflippedCard();
}

function disableCard() {
    firstCard.removeEventListener('click', cardFlip)
    secondCard.removeEventListener('click', cardFlip)
    reset()
}

function unflippedCard () {
    cardBlock = true
    setTimeout (() =>  {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        reset()
    }, 500)
}

function reset () {
    [flippedCard, cardBlock] = [false, false]
    [firstCard, secondCard] = [null, null]
}

    (function shuffle() {
       cards.forEach(card => {
            let ramdomPos = Math.floor(Math.random() * 16);
            card.style.order = ramdomPos;
        });
    })();

function restart () {
    var cardReset = document.querySelectorAll('.flip')
    cardReset.forEach(function (elem) {
        if(elem.classList.contains('flip')) {
            elem.classList.remove('flip')
            firstCard.addEventListener('click', cardFlip)
            secondCard.addEventListener('click', cardFlip)
            cards.forEach(card => {
              let ramdomPos = Math.floor(Math.random() * 16);
              card.style.order = ramdomPos;
          });
        }else{
            return
        }
    })
}

btnRestart.addEventListener('click', restart)


cards.forEach(card => card.addEventListener('click', cardFlip))
