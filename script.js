//your JS code here. If required.
// Get the image elements
const images = document.querySelectorAll('img');

// Generate a random number from 1 to 5 to determine the repeating image
const repeatingImageIndex = Math.floor(Math.random() * 5);

// Generate an array of unique random indices for the images
const randomIndices = Array.from({ length: 6 }, (_, i) => i)
  .sort(() => Math.random() - 0.5)
  .filter(index => index !== repeatingImageIndex);

// Assign the image sources and class names based on the random indices
images.forEach((image, index) => {
  image.src = `image_${randomIndices[index]}.jpg`;
  image.classList.add(`img${randomIndices[index]}`);
});

// Variables to keep track of the selected images
let selectedImages = [];
let verifyButtonClicked = false;

// Function to handle image click events
function handleImageClick(event) {
  const clickedImage = event.target;

  // Prevent double-clicking the same image
  if (clickedImage === selectedImages[0]) {
    return;
  }

  // Add or remove the selected class on click
  clickedImage.classList.toggle('selected');

  // Update the selected images array
  if (selectedImages.length === 2) {
    selectedImages.forEach(img => img.classList.remove('selected'));
    selectedImages = [];
  }

  selectedImages.push(clickedImage);

  // Show or hide the verify button based on the number of selected images
  const verifyButton = document.getElementById('verify');
  verifyButton.style.display = selectedImages.length === 2 ? 'block' : 'none';
}

// Function to handle reset button click event
function handleResetClick() {
  images.forEach(image => {
    image.classList.remove('selected');
  });

  selectedImages = [];

  const resetButton = document.getElementById('reset');
  resetButton.style.display = 'none';

  const verifyButton = document.getElementById('verify');
  verifyButton.style.display = 'none';

  const para = document.getElementById('para');
  para.innerHTML = '';
}

// Function to handle verify button click event
function handleVerifyClick() {
  verifyButtonClicked = true;

  const para = document.getElementById('para');
  para.innerHTML = '';

  if (
    selectedImages.length === 
