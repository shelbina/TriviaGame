///timer that gives the user 1 minutes to answer all questions and displays countdown
///game ends when time runs out
///display number of questions answered correctly and incorrectly
alert ("Press ok to answer 6 Greyhound trivia questions in 1 minute." );

window.onload = function () {
    jQuery('.timeout_message_show').hide();
    var seconds = jQuery('span.second').text();
    seconds = parseInt(seconds);
        if (isNaN(seconds)) {
            seconds = 00;
        }
        if (seconds == 60) {
         seconds = 59;
        }
        displaySecond = document.querySelector('span.second');
        startTimer(displaySecond);
    };


///set up questions and answers
var questions = [{
    question: "What is the average lifespan of a Greyhound?",
    choices: ["4-6 years", "7-9 years", "10-12 years", "13-15 years"],
    correctAnswer: 2
}, {
    question: "Greyhounds are the fastest breed of dog. What is the maximum speed a Greyhound can run?",
    choices: ["35 mph", "45 mph", "55 mph", "65 mph"],
    correctAnswer: 1
}, {
    question: "Greyhound breeds date back to 3,000 BC. Greyhounds were mummified and buried with their owners in what culture?",
    choices: ["American", "Filipino", "Chinese", "Egyptian"],
    correctAnswer: 3
}, {
    question: "What qualities are Greyhounds known for?",
    choices: ["Speed", "Barking", "Intelligence", "Agressive"],
    correctAnswer: 0
}, {
    question: "What United states president had a pet Greyhound in the White House?",
    choices: ["Theodore Roosevelt", "Bill Clinton", "Dwight D. Eisenhower", "Rutherford B. Hayes"],
    correctAnswer: 3
}, {
    question: "Which one of these colleges have a Greyhound as their mascot?",
    choices: ["University of North Carolina Wilmington", "University of Indianapolis", "Michigan State University", "University of Florida"],
    correctAnswer: 1
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

