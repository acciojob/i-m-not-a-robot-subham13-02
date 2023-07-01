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
  image.src = `image_url_${randomIndices[index]}.jpg`;
  image.classList.add(`img${randomIndices[index]}`);
  image.addEventListener('click', handleImageClick);
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
function () {
  cy.visit(baseUrl + "/main.html");
  cy.get('[data-ns-test="img1"]').eq(0).click();
  cy.get('[data-ns-test="img2"]').eq(0).click();
  cy.get('#btn').click();
  cy.get('p').should("contain", "We can't verify you as a human. You selected the non-identical tiles.");
}
// Function to handle verify button click event
function handleVerifyClick() {
  verifyButtonClicked = true;

  const para = document.getElementById('para');
  para.innerHTML = '';

  if (selectedImages.length === 2) {
    const class1 = selectedImages[0].classList[0];
    const class2 = selectedImages[1].classList[0];

    if (class1 === class2) {
      para.innerHTML = "You are a human. Congratulations!";
    } else {
      para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }

  const verifyButton = document.getElementById('verify');
  verifyButton.style.display = 'none';
}

// Add event listeners to the reset and verify buttons
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', handleResetClick);

const verifyButton = document.getElementById('verify');
verifyButton.addEventListener('click', handleVerifyClick);
