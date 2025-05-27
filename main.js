// Declare a variable to store the fetched data
let data = [];

// Select all time filter buttons
const buttons = document.querySelectorAll(".time-filter button");

// Select all elements where current hours will be displayed
const currentEls = document.getElementsByClassName("current");

// Select all elements where previous hours will be displayed
const previousEls = document.getElementsByClassName("previous");

// Select all cards to update their text
const cards = document.getElementsByClassName("card");

// Fetch the JSON data from file
fetch("./data.json")
    .then(res => res.json())     // Convert the response to JSON
    .then(json => {
        data = json;             // Store the data in the variable
        updateUI("weekly");      // Show weekly data by default
    });

// Add click event listener to each button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove "active" class from all buttons
        buttons.forEach(btn => btn.classList.remove("active"));

        // Add "active" class to the clicked button
        button.classList.add("active");

        // Get the timeframe from the button text (e.g., daily, weekly, monthly)
        const timeframe = button.textContent.toLowerCase();

        // Update the UI based on selected timeframe
        updateUI(timeframe);
    });
});

// Function to update the UI based on timeframe
function updateUI(timeframe) {
    // Choose the correct label for previous time
    const label = timeframe === "daily"
        ? "Yesterday"
        : timeframe === "weekly"
            ? "Last Week"
            : "Last Month";

    // Loop through each item in the data and update the DOM
    data.forEach((item, index) => {
        // Get current and previous values for the selected timeframe
        const current = item.timeframes[timeframe].current;
        const previous = item.timeframes[timeframe].previous;


        // Update the DOM elements with current and previous hours
        currentEls[index].textContent = current;
        previousEls[index].textContent = previous;

        // Update the label text before the previous value
        const previousLabelEl = cards[index].querySelector(".card-previous span:first-child");
        previousLabelEl.textContent = `${label} -`;
    });
}
