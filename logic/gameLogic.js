// to reset the screen 
const clearScreen = function() {
    context.clearRect(0, 0, canvas[0].width, canvas[0].height);
};


// if someone is a guesser, then we can try to hide the drawing broad and show the guess session.
const guesser = function() {
    clearScreen();
    const isDrawer = false;
    console.log('draw status: ' + isDrawer);
    $('.drawing-board').hide();
    $('#guesses').empty();
    console.log('You are a guesser');
    $('#guess').show();
    $('.guess-input').focus();
    $('#guess').on('submit', function(e) {
        e.preventDefault();
        const guess = $('.guess-input').val();
        
        if (guess == '') {
            return false
        };

        console.log(user + "'s guess: " + guess);
        socket.emit('guessword', {username: user, guessword: guess});
        $('.guess-input').val('');
    });
};