const siteData = [
  {"Region":"AMERICAS","Country":"USA","Site Name":"Carlsbad","Site Code":"USCA1"},
  {"Region":"AMERICAS","Country":"USA","Site Name":"Danvers","Site Code":"USDA1"},
  {"Region":"AMERICAS","Country":"USA","Site Name":"Danvers","Site Code":"USDA2"},
  {"Region":"AMERICAS","Country":"USA","Site Name":"Jaffrey","Site Code":"USJA1"},
  {"Region":"AMERICAS","Country":"USA","Site Name":"Rockville","Site Code":"USRK1"},
  {"Region":"AMERICAS","Country":"USA","Site Name":"St. Louis - Spruce","Site Code":"USSL1"},
  {"Region":"APAC","Country":"India","Site Name":"Bangalore - Jigani","Site Code":"INBA1"},
  {"Region":"APAC","Country":"India","Site Name":"Mumbai","Site Code":"INMU2"},
  {"Region":"APAC","Country":"Korea","Site Name":"Seoul","Site Code":"KRSE1"},
  {"Region":"EMEA","Country":"Germany","Site Name":"Darmstadt-DC","Site Code":"DEDA0"},
  {"Region":"EMEA","Country":"Germany","Site Name":"Darmstadt-AL19","Site Code":"DEDA5"},
  {"Region":"EMEA","Country":"Germany","Site Name":"Muenchen","Site Code":"DEMU1"},
  {"Region":"EMEA","Country":"Germany","Site Name":"Hamburg","Site Code":"DEHA1"}
];

const regionDropdown = document.getElementById('region');
const countryDropdown = document.getElementById('country');
const siteNameDropdown = document.getElementById('site-name');
const siteCodeInput = document.getElementById('site-code');

// Populate the region dropdown
const regions = [...new Set(siteData.map(site => site['Region']))];
regions.forEach(region => {
  const option = document.createElement('option');
  option.value = region;
  option.textContent = region;
  regionDropdown.appendChild(option);
});

// Event listener for region dropdown change
regionDropdown.addEventListener('change', function() {
  const selectedRegion = this.value;
  populateCountryDropdown(selectedRegion);
  clearSiteNameDropdown();
  clearSiteCodeInput();
});

// Event listener for country dropdown change
countryDropdown.addEventListener('change', function() {
  const selectedCountry = this.value;
  populateSiteNameDropdown(selectedCountry);
  clearSiteCodeInput();
});

// Event listener for site name dropdown change
siteNameDropdown.addEventListener('change', function() {
  const selectedSiteName = this.value;
  populateSiteCodeInput(selectedSiteName);
});

// Function to populate the country dropdown based on the selected region
function populateCountryDropdown(region) {
  countryDropdown.innerHTML = '<option value="">Select a country</option>';
  const countries = [...new Set(siteData.filter(site => site['Region'] === region).map(site => site['Country']))];
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countryDropdown.appendChild(option);
  });
}

// Function to populate the site name dropdown based on the selected country
function populateSiteNameDropdown(country) {
  siteNameDropdown.innerHTML = '<option value="">Select a site</option>';
  const siteNames = [...new Set(siteData.filter(site => site['Country'] === country).map(site => site['Site Name']))];
  siteNames.forEach(siteName => {
    const option = document.createElement('option');
    option.value = siteName;
    option.textContent = siteName;
    siteNameDropdown.appendChild(option);
  });
}

// Function to populate the site code input based on the selected site name
function populateSiteCodeInput(siteName) {
  const selectedSite = siteData.find(site => site['Site Name'] === siteName);
  if (selectedSite) {
    siteCodeInput.value = selectedSite['Site Code'];
  } else {
    siteCodeInput.value = '';
  }
}

// Function to clear the site name dropdown
function clearSiteNameDropdown() {
  siteNameDropdown.innerHTML = '<option value="">Select a site</option>';
}

// Function to clear the site code input
function clearSiteCodeInput() {
  siteCodeInput.value = '';
}

const form = document.getElementById('project-details-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  // Handle form submission, e.g., send data to server
  console.log('Form submitted');
  form.reset(); // Reset the form after submission
});

// Get the modal and close button
const modal = document.getElementById('feedback-modal');
const closeButton = document.getElementsByClassName('close')[0];

// Get all the feedback buttons
const feedbackButtons = document.getElementsByClassName('feedback-button');
const generalFeedbackButton = document.querySelector('.general-feedback-button');

// Add event listeners to the feedback buttons
for (let i = 0; i < feedbackButtons.length; i++) {
  feedbackButtons[i].addEventListener('click', openModal);
}
generalFeedbackButton.addEventListener('click', openModal);

// Function to open the modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Event listener for the close button
closeButton.addEventListener('click', closeModal);

// Event listener for clicking outside the modal
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    closeModal();
  }
});

// Event listener for the submit button
const submitButton = document.getElementById('submit-feedback');
submitButton.addEventListener('click', submitFeedback);

// Function to handle form submission
function submitFeedback() {
  const feedbackInput = document.getElementById('feedback-input');
  const feedback = feedbackInput.value;

  // Get the current timestamp
  const timestamp = new Date().getTime();

  // Create an object to store the feedback and timestamp
  const feedbackData = {
    feedback: feedback,
    timestamp: timestamp
  };

  // Store the feedback data in local storage
  localStorage.setItem('feedback', JSON.stringify(feedbackData));

  // Clear the input and close the modal
  feedbackInput.value = '';
  closeModal();

  // Display the stored feedback
  displayStoredFeedback();
}

// Function to display the stored feedback
function displayStoredFeedback() {
  const storedFeedbackData = localStorage.getItem('feedback');
  if (storedFeedbackData) {
    const feedbackData = JSON.parse(storedFeedbackData);
    const currentTime = new Date().getTime();
    const storedTime = feedbackData.timestamp;
    const timeDifference = currentTime - storedTime;
    const dayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    if (timeDifference < dayInMilliseconds) {
      const storedDataContainer = document.getElementById('stored-data-container');
      storedDataContainer.textContent = 'Stored Feedback: ' + feedbackData.feedback;
    } else {
      // Remove the expired feedback data from local storage
      localStorage.removeItem('feedback');
    }
  }
}

// Call displayStoredFeedback when the page loads
window.addEventListener('load', displayStoredFeedback);