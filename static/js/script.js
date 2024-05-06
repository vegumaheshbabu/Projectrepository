

function predict() {
    // Get the uploaded file
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];

    // Create a FormData object to send the file to the server
    const formData = new FormData();
    formData.append('file', file);

    // Send a POST request to the Flask server
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Received prediction:", data);
        displayResult(data.prediction);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    document.getElementById('prediction-result').style.display = 'block';
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

function displayImage() {
    const fileInput = document.getElementById('upload');
    const uploadedImageContainer = document.getElementById('uploaded-image-container');
    const uploadedImage = document.getElementById('uploaded-image');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImageContainer.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        uploadedImageContainer.style.display = 'none';
    }
}

function displayResult(prediction) {
    console.log("Prediction in displayResult:", prediction); // Log the received prediction

    const resultSection = document.getElementById('result-section');
    const predictionResult = document.getElementById('prediction-result');
    const actionButtons = document.getElementById('action-buttons');
    
    predictionResult.textContent = `The model predicts: ${prediction}`;
    actionButtons.innerHTML = ''; // Clear previous buttons

    if (prediction.includes('Pneumonia')) {
        actionButtons.innerHTML = 
            "<button class='learn-more-button' onclick=\"window.open('https://www.nhs.uk/conditions/pneumonia/', '_blank');\">Learn more about Pneumonia</button>" +
            "<button class='learn-more-button-b' onclick=\"window.open('https://www.nhs.uk/service-search/find-a-gp', '_blank');\">Contact your GP</button>";
    } else if (prediction.toLowerCase().includes('tb')) {
        actionButtons.innerHTML = 
            "<button class='learn-more-button' onclick=\"window.open('https://www.nhs.uk/conditions/tuberculosis-tb/', '_blank');\">Learn more about TB</button>" +
            "<button class='learn-more-button-b' onclick=\"window.open('https://www.nhs.uk/service-search/find-a-gp', '_blank');\">Contact your GP</button>";
    }

    predictionResult.style.display = 'block'; 
   // document.getElementById('prediction-result').style.display = 'block';
}
