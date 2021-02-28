var c = 0;
var t;
var timer_is_on = 0;
var time = 0;

function timedCount() {
    c = c + 1;
    t = setTimeout(timedCount, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}


// Jump and Run Part

// When Dom loaded
document.addEventListener('DOMContentLoaded', () => {

    // Lifes

    const lifeObjects = document.querySelector('lifes')
    var lifes = [true, true, true, true]

    const character = document.querySelector('.character')
    const campfire = document.querySelector('.campfire')
    let bottom = 0
    let gravity = 0.9
    let isJumping = false

    let isGoingLeft = false
    let isGoingRight = false

    let left = 0
    let right = 0


    var width
    var height

    let fireRight = window.innerWidth;

    let rightTimerId
    let leftTimerId

    var resize = function() {
        width = window.innerWidth * 2
        height = window.innerHeight * 2
      }

      window.onresize = resize
      resize()

    let campfireSlide = setInterval(function () {
        campfire.style.bottom = fireRight + 'px'
    })

    function jump() {
        if (isJumping) return

        if (isGoingRight) {
            character.classList.add('character-jump-right')
        } else if (isGoingLeft) {
            character.classList.add('character-jump-left')
        } else {
            character.classList.add('character-jump-right')
        }


        let timerUpId = setInterval(function () {

            if (bottom > 250) {
                clearInterval(timerUpId)
                let timerDownId = setInterval(function () {
                    if (bottom <= 0) {
                        clearInterval(timerDownId)
                        isJumping = false
                        character.classList.remove('character-jump-right')
                        character.classList.remove('character-jump-left')
                        character.classList.add('character')
                    }
                    bottom -= 5
                    character.style.bottom = bottom + 'px'
                }, 20)

            }
            isJumping = true
            bottom += 30
            character.style.bottom = bottom * 0.9 + 'px'

            if (isGoingLeft) {
                character.classList.add('character-slide-left')
            } else {
                character.classList.add('character-slide-right')
            }
        }, 20)

    }

    function slideLeft() {

        if (isGoingLeft) return

        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
            character.classList.add('character-slide-left')
        }
        if (isJumping) {
            character.classList.remove('character-jump-right')
            character.classList.add('character-jump-left')
        } else {
            character.classList.remove('character-slide-right')
            character.classList.add('character-slide-left')
        }
        isGoingLeft = true

        leftTimerId = setInterval(function () {
            left -= 5
            if(left < 0) left = 0 
            character.style.left = left + 'px'

        }, 20)


    }

    function slideRight() {

        if (isGoingRight) return

        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
            character.classList.add('character-slide-right')
        }

        if (isJumping) {
            character.classList.remove('character-jump-left')
            character.classList.add('character-jump-right')
        } else {
            character.classList.remove('character-slide-left')
            character.classList.add('character-slide-right')
        }

        isGoingRight = true

        rightTimerId = setInterval(function () {
            left += 5
            if(left >= ( window.innerWidth-150)){
                left =  window.innerWidth-150
            }
            character.style.left = left + 'px'
        }, 20)


    }

    // assign function jump to keycodes
    function control(e) {
        // Up is pressed
        if (e.keyCode == 38) {
            jump()
        }
        // Left is pressed
        else if (e.keyCode == 37) {
            slideLeft()
        }
        // Left is pressed
        else if (e.keyCode == 39) {
            slideRight()
        }
    }


    document.addEventListener('keydown', control)


})
