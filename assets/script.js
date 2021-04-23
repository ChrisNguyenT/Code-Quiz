// These are the declared variables
var score = 0;
var questionNumber = 0;
var timeLeft = 76;
var timeIndex = 0;
var penaltyTime = 15;
var remainingTime = document.querySelector('#remainingTime');
var countdown = document.querySelector('#countdown');
var questions = document.querySelector('#questions');

// Array to hold the questions, answer choices, and the correct answer
var allQuestions = [
    {
        prompt: 'Commonly used data types DO NOT include:',
        options: ['Strings', 'Booleans', 'Alerts', 'Numbers'],
        answer: 'Alerts'
    },
    {
        prompt: 'The condition in an if / else statement is enclosed within _____.',
        options: ['Quotes', 'Curly Brackets', 'Parentheses', 'Square Brackets'],
        answer: 'Parentheses'
    },
    {
        prompt: 'Arrays in Javascript can be used to store _____.',
        options: ['Numbers and Strings', 'Other Arrays', 'Booleans', 'All of the Above'],
        answer: 'All of the Above'
    },
    {
        prompt: 'String values must be enclosed within _____ when being assigned to variables.',
        options: ['Commas', 'Curly Brackets', 'Quotes', 'Parenthesis'],
        answer: 'Quotes'
    },
    {
        prompt: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        options: ['Javascript', 'Terminal/Bash', 'For Loops', 'Console Log'],
        answer: 'Console Log'
    }
];

// Activates the timer and displays it on the page
countdown.addEventListener('click', function () {
    if (timeIndex === 0) {
        timeIndex = setInterval(function () {
            timeLeft--;
            remainingTime.textContent = 'Time Remaining: ' + timeLeft;

            // If the timer reaches 0, it redirects to the finished page
            if (timeLeft <= 0) {
                clearInterval(timeIndex);
                finished();
                remainingTime.textContent = 'Your time is up!';
            }
        }, 1000);
    }
    display(questionNumber);
});

// Displays the question and answer choices on the page
function display(questionNumber) {
    // This loops displays the current question
    for (var i = 0; i < allQuestions.length; i++) {
        var currentPrompt = allQuestions[questionNumber].prompt;
        questions.textContent = currentPrompt;
    }
    // This creates and displays a list of the arrayed answer choices
    var currentOptions = allQuestions[questionNumber].options;
    currentOptions.forEach(function (promptList) {
        var listIndex = document.createElement('li');
        listIndex.textContent = promptList;
        questions.appendChild(listIndex);
        listIndex.addEventListener('click', (compare));
    })
}

// This event compares the correct answer with the user's answer
function compare(event) {
    var element = event.target;
    var divIndex = document.createElement('div');
    divIndex.setAttribute('id', 'divIndex');
    questions.appendChild(divIndex);
    if (element.matches('li')) {
        // Correct answer event
        if (element.textContent == allQuestions[questionNumber].answer) {
            score += 1;
            divIndex.textContent = allQuestions[questionNumber].answer + ' is correct!';
        // Wrong answer event
        } else {
            timeLeft = timeLeft - penaltyTime;
            divIndex.textContent = element.textContent + ' is wrong!';
        }
    }
    // Moves to the next question after the event completes
    questionNumber += 1;

    // When there are no more questions, it takes the user to the "finish" page
    if (questionNumber >= allQuestions.length) {
        finished();
        // This function displays the score
        function displayScore() {
            divIndex.textContent = 'You finished the quiz! You got  ' + score + ' out of ' + allQuestions.length + ' correct!'
        }
        // Sets a delay for the wrong/correct answer to display before the score is displayed
        setTimeout(displayScore, 2000);
        // Moves to the next question if previous conditions are not met
    } else {
        display(questionNumber);
    }
    questions.appendChild(divIndex);
}

// This function creates the 'end of quiz' page
function finished() {
    questions.innerHTML = '';
    remainingTime.innerHTML = '';

    // This creates the header at the end of the quiz
    var finishHeader = document.createElement('h1');
    finishHeader.textContent = 'Quiz Completed!'
    questions.appendChild(finishHeader);

    // Displays the remaining time as the user's score
    var finishContent = document.createElement('p');
    questions.appendChild(finishContent);
    if (timeLeft > 0) {
        clearInterval(timeIndex);
        finishContent.textContent = 'Your final score is: ' + timeLeft + '!';
    // This condition is met when the user hits a 0 or below time
    } else {
        finishContent.textContent = 'Your final score is: ' + timeLeft + ' lol';
    }

    // These create the label, input, and submit at the end of the quiz
    var newLabel = document.createElement('label');
    newLabel.textContent = 'Please enter your initials: ';
    questions.appendChild(newLabel);

    var userInput = document.createElement('input');
    userInput.textContent = '';
    questions.appendChild(userInput);

    var userSubmit = document.createElement('button');
    userSubmit.setAttribute('id', 'Submit');
    userSubmit.textContent = 'Submit';
    questions.appendChild(userSubmit);

    // Function for user input and local storage/retrieval
    userSubmit.addEventListener('click', function () {
        var initials = userInput.value;
        // Alerts user to input a valid entry if left blank or exceeds the 5 character maximum
        if (initials.length <= 0 || initials.length > 5) {
            window.alert('Please enter your initials! (Up to five characters)');
            return false;
        } 
        // Puts the initials and score in an array
        else {
            var userScore = {
                initials: initials.toUpperCase(),
                score: timeLeft
            }
            // Retreives the local highscores
            var savedScore = localStorage.getItem('savedScore');
            // Clears array if there are no local highscores
            if (savedScore === null) {
                savedScore = [];
            // Converts the string into an object
            } else {
                savedScore = JSON.parse(savedScore);
            }
            // Adds the user's score to the end of the existing array
            savedScore.push(userScore);
            // Converts the saved scores to a string
            var newScore = JSON.stringify(savedScore);
            localStorage.setItem('savedScore', newScore);
            // Retrieves from the local storage
            var savedScore = localStorage.getItem('savedScore');
            savedScore = JSON.parse(savedScore);
        }
    });
}

