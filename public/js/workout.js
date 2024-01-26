function showGenerateWorkoutsModal() {
    document.getElementById('generateWorkoutsModal').style.display = 'block';
}

function closeGenerateWorkoutsModal() {
    document.getElementById('generateWorkoutsModal').style.display = 'none';
}

async function generateWorkouts() {
    try {
        // Use an actual API endpoint for generating workouts
        const response = await fetch('/api/generate-workouts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include any additional headers needed for your API
            },
        });
        const data = await response.json();

        // Display the generated workouts
        if (data && data.workouts) {
            const workoutsList = document.getElementById('workouts');
            workoutsList.innerHTML = '<h2>Generated Workouts</h2>';
            
            data.workouts.forEach((workout) => {
                const workoutItem = document.createElement('li');
                workoutItem.textContent = `${workout.name} - Duration: ${workout.duration}, Difficulty: ${workout.difficulty}`;
                workoutsList.appendChild(workoutItem);
            });
        }
        
        // Close the modal after loading workouts
        closeGenerateWorkoutsModal();
    } catch (error) {
        console.error('Error fetching or processing workout data:', error);
    }
}