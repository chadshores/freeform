// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to set the target color
function setTargetColor() {
    targetColor = {
        r: getRandomInt(0, 255),
        g: getRandomInt(0, 255),
        b: getRandomInt(0, 255)
    };
    const targetColorDiv = document.getElementById('target-color');
    targetColorDiv.style.backgroundColor = `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`;
}

// Function to update player's color based on sliders
function updatePlayerColor() {
    playerColor.r = parseInt(document.getElementById('red').value);
    playerColor.g = parseInt(document.getElementById('green').value);
    playerColor.b = parseInt(document.getElementById('blue').value);

    document.getElementById('red-value').textContent = playerColor.r;
    document.getElementById('green-value').textContent = playerColor.g;
    document.getElementById('blue-value').textContent = playerColor.b;

    const playerColorDiv = document.getElementById('player-color');
    playerColorDiv.style.backgroundColor = `rgb(${playerColor.r}, ${playerColor.g}, ${playerColor.b})`;
}

// Function to calculate the distance between two colors
function calculateDistance(c1, c2) {
    return Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
    );
}

// Function to handle the scoring based on similarity
function calculateScore(similarity) {
    if (similarity > 90) {
        return 10;
    } else if (similarity > 75) {
        return 7;
    } else if (similarity > 50) {
        return 5;
    } else if (similarity > 25) {
        return 3;
    } else {
        return 0; // 0 points for very low similarity
    }
}

// Initialize variables
let targetColor = { r: 0, g: 0, b: 0 };
let playerColor = { r: 0, g: 0, b: 0 };
let currentRound = 1;
let score = 0;
const maxRounds = 5;

// Arrays to store color data for each round
const targetColors = [];
const playerColors = [];

// Set the initial target color and update player's color display
setTargetColor();
updatePlayerColor();

// Add event listeners to sliders
document.getElementById('red').addEventListener('input', updatePlayerColor);
document.getElementById('green').addEventListener('input', updatePlayerColor);
document.getElementById('blue').addEventListener('input', updatePlayerColor);

// Handle submit button click
document.getElementById('submit-btn').addEventListener('click', () => {
    const distance = calculateDistance(targetColor, playerColor);
    const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
    const similarity = ((maxDistance - distance) / maxDistance) * 100;
    const feedback = document.getElementById('feedback');

    const roundScore = calculateScore(similarity);
    score += roundScore;

    feedback.textContent = `Your similarity: ${similarity.toFixed(2)}% - You earned ${roundScore} points!`;

    // Save the colors for this round
    targetColors.push({ ...targetColor });
    playerColors.push({ ...playerColor });

    // Update the score and round number display
    document.getElementById('current-score').textContent = score;

    // Hide the Submit button and show the Next Swatch button
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-swatch-btn').style.display = 'block';

    if (currentRound >= maxRounds) {
        feedback.textContent += ` Game Over! Your final score is ${score} points.`;
        document.getElementById('next-swatch-btn').style.display = 'none';
        document.getElementById('new-game-btn').style.display = 'block';
        displaySummary();
    }
});

// Handle next swatch button click
document.getElementById('next-swatch-btn').addEventListener('click', () => {
    currentRound++;
    document.getElementById('current-round').textContent = currentRound;

    // Reset sliders to 0
    document.getElementById('red').value = 0;
    document.getElementById('green').value = 0;
    document.getElementById('blue').value = 0;

    // Update player's color display to match the reset sliders
    updatePlayerColor();

    // Set a new target color
    setTargetColor();

    // Hide the Next Swatch button and show the Submit button
    document.getElementById('next-swatch-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'block';
});

// Handle new game button click
document.getElementById('new-game-btn').addEventListener('click', () => {
    currentRound = 1;
    score = 0;
    targetColors.length = 0; // Reset the logs
    playerColors.length = 0; // Reset the logs
    document.getElementById('current-round').textContent = currentRound;
    document.getElementById('current-score').textContent = score;
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('submit-btn').style.display = 'block';
    document.getElementById('next-swatch-btn').style.display = 'none';
    document.getElementById('new-game-btn').style.display = 'none';
    document.getElementById('feedback').textContent = '';

    // Reset sliders to 0
    document.getElementById('red').value = 0;
    document.getElementById('green').value = 0;
    document.getElementById('blue').value = 0;

    // Update player's color display to match the reset sliders
    updatePlayerColor();

    // Set the initial target color
    setTargetColor();
});

// Function to display the summary of all rounds
// Function to display the summary of all rounds
function displaySummary() {
    // Get the container element where the game is located
    const container = document.querySelector('.container');

    // Clear the container's existing content
    container.innerHTML = '';

    // Create a summary element
    const summaryDiv = document.createElement('div');
    summaryDiv.innerHTML = '<h3>Game Summary</h3>';

    // Populate the summary with round information
    for (let i = 0; i < maxRounds; i++) {
        const roundDiv = document.createElement('div');
        roundDiv.innerHTML = `
            <p>Round ${i + 1}:</p>
            <p>Target Color: <span style="background-color: rgb(${targetColors[i].r}, ${targetColors[i].g}, ${targetColors[i].b}); display: inline-block; width: 50px; height: 20px;"></span> rgb(${targetColors[i].r}, ${targetColors[i].g}, ${targetColors[i].b})</p>
            <p>Your Color: <span style="background-color: rgb(${playerColors[i].r}, ${playerColors[i].g}, ${playerColors[i].b}); display: inline-block; width: 50px; height: 20px;"></span> rgb(${playerColors[i].r}, ${playerColors[i].g}, ${playerColors[i].b})</p>
        `;
        summaryDiv.appendChild(roundDiv);
    }

    // Add the summary to the container
    container.appendChild(summaryDiv);

    // Optionally, add a "Restart Game" button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.style.marginTop = '20px';
    restartButton.style.padding = '10px 20px';
    restartButton.style.fontSize = '16px';
    restartButton.style.cursor = 'pointer';
    restartButton.style.fontFamily = '"Titillium Web", sans-serif';
    restartButton.addEventListener('click', () => {
        // Reset the game when clicked
        currentRound = 1;
        score = 0;
        targetColors.length = 0; // Reset the logs
        playerColors.length = 0; // Reset the logs
        container.innerHTML = originalContent; // Restore the original game HTML
        document.getElementById('current-round').textContent = currentRound;
        document.getElementById('current-score').textContent = score;
        document.getElementById('submit-btn').disabled = false;
        document.getElementById('submit-btn').style.display = 'block';
        document.getElementById('next-swatch-btn').style.display = 'none';
        document.getElementById('new-game-btn').style.display = 'none';
        document.getElementById('feedback').textContent = '';

        // Reset sliders to 0
        document.getElementById('red').value = 0;
        document.getElementById('green').value = 0;
        document.getElementById('blue').value = 0;

        // Update player's color display to match the reset sliders
        updatePlayerColor();

        // Set the initial target color
        setTargetColor();
    });

    summaryDiv.appendChild(restartButton);
}

// Capture the original content of the container
const container = document.querySelector('.container');
const originalContent = container.innerHTML;

