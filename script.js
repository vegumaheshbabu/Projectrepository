function predict() {
    // Implement logic to handle file upload and call machine learning model for prediction
    // Display the result in the result section

    // Example result display
    const resultSection = document.getElementById('result-section');
    const predictionResult = document.getElementById('prediction-result');
    resultSection.style.display = 'block';
    predictionResult.textContent = 'This is just a sample result. Implement your prediction logic.';
    predictionResult.classList.add('show');
}

function hoverEffect(button) {
    button.style.backgroundColor = "#3c79e6";
}

function resetEffect(button) {
    button.style.backgroundColor = "#4285f4";
}

// Change header background on scroll
window.onscroll = function() {
    const header = document.querySelector('header');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.style.backgroundColor = "#1a1a1a";
    } else {
        header.style.backgroundColor = "transparent";
    }
};