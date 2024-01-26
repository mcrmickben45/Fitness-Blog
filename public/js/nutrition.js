function searchFood() {
    const searchTerm = document.getElementById('foodSearch').value;

    // Use an actual nutrition API endpoint for fetching data based on the search term
    fetch(`/api/nutrition?food=${searchTerm}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Include any additional headers needed for your API
        },
    })
    .then(response => response.json())
    .then(data => {
        const foodSearchResults = document.getElementById('foodSearchResults');
        foodSearchResults.innerHTML = '<h2>Search Results</h2>';

        if (data && data.results) {
            data.results.forEach(foodResult => {
                const resultItem = document.createElement('div');
                resultItem.textContent = `${foodResult.name} - Nutrients: ${foodResult.nutrients}`;
                foodSearchResults.appendChild(resultItem);
            });
        } else {
            foodSearchResults.innerHTML = '<p>No results found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching nutrition data:', error);
    });
}