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

    // Update the score and round number display
    document.getElementById('current-score').textContent = score;

    if (currentRound < maxRounds) {
        document.getElementById('next-swatch-btn').style.display = 'block';
    } else {
        feedback.textContent += ` Game Over! Your final score is ${score} points.`;
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('new-game-btn').style.display = 'block';
    }
});

// Handle next swatch button click
document.getElementById('next-swatch-btn').addEventListener('click', () => {
    currentRound++;
    document.getElementById('current-round').textContent = currentRound;
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('next-swatch-btn').style.display = 'none';

    // Reset sliders to 0
    document.getElementById('red').value = 0;
    document.getElementById('green').value = 0;
    document.getElementById('blue').value = 0;

    // Update player's color display to match the reset sliders
    updatePlayerColor();

    // Set a new target color
    setTargetColor();
});

// Handle new game button click
document.getElementById('new-game-btn').addEventListener('click', () => {
    currentRound = 1;
    score = 0;
    document.getElementById('current-round').textContent = currentRound;
    document.getElementById('current-score').textContent = score;
    document.getElementById('submit-btn').disabled = false;
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
