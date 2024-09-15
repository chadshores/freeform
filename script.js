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

// Initialize variables
let targetColor = { r: 0, g: 0, b: 0 };
let playerColor = { r: 0, g: 0, b: 0 };

// Set the initial target color
setTargetColor();

// Add event listeners to sliders
document.getElementById('red').addEventListener('input', updatePlayerColor);
document.getElementById('green').addEventListener('input', updatePlayerColor);
document.getElementById('blue').addEventListener('input', updatePlayerColor);

// Handle submit button click
document.getElementById('submit-btn').addEventListener('click', () => {
    const distance = calculateDistance(targetColor, playerColor);
    const feedback = document.getElementById('feedback');

    // The maximum possible distance is sqrt(3*(255^2)) ≈ 441.67
    const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
    const similarity = ((maxDistance - distance) / maxDistance) * 100;

    feedback.textContent = `Your similarity: ${similarity.toFixed(2)}%`;

    // Optionally, set a new target color after submission
    setTargetColor();
    updatePlayerColor();
});
