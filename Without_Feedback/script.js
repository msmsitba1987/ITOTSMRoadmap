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