/**
 * Controls the new-plant page.
 */

// Populates the user field with the current user's username
getCurrentUser().then((username) => {
    document.querySelector('input[name="user"]').value = username;
});

const form = document.getElementById("new-plant-form");
form.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    var plant = {};
    formData.forEach((value, key) => {
        plant[key] = value;
    });

    // If the user is online, send the form data to the server
    if (navigator.onLine) {
        fetch("/new-plant-sighting", {
            method: "POST",
            body: formData,
        }).then((response) => {
            if (response.ok) {
                addData("plants", plant).then(() => {
                    setTimeout(() => {
                        window.location.href = "/view-plants";
                    }, 1000);
                });
            }
        });

        // If the user is offline, add the plant to the sync queue
    } else {
        addPlantToSyncQueue(plant).then(() => {
            setTimeout(() => {
                window.location.href = "/view-plants";
            }, 1000);
        });
    }
};
