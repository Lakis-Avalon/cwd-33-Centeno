document.addEventListener('DOMContentLoaded', function () {
    const snelems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(snelems);

    const mboxes = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(mboxes);

    const elems = document.querySelectorAll('.parallax');
    const instances = M.Parallax.init(elems);

    const filterButtons = document.querySelectorAll(".filter-btn");
    const cultivators = document.querySelectorAll(".cultivator-card");

    // Get all the buttons for clans and alive/deceased
const clanButtons = document.querySelectorAll('.filter-btn[data-type="clan"]');
const stateButtons = document.querySelectorAll('.filter-btn[data-type="status"]');

// Manage Clan Buttons: Allow multiple selection
clanButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle the 'active' class on the clicked button (select/deselect)
        button.classList.toggle('active');
    });
});

// Manage State Buttons (Alive/Deceased): Only one can be active at a time
stateButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Check if the clicked button is already active
        const isActive = button.classList.contains('active');

        // Remove 'active' class from all state buttons
        stateButtons.forEach(btn => btn.classList.remove('active'));

        // If the button was not active before, make it active
        if (!isActive) {
            button.classList.add('active');
        }
    });
});


    const activeFilters = {
        status: null,
        clan: []
    };

    var playMusicBtn = document.getElementById('playMusicBtn');
        var audio = document.getElementById('backgroundMusic');

        // Function to toggle play/pause and button styles
        playMusicBtn.addEventListener('click', function() {
            event.preventDefault();  // Prevent the default action (like page reload)

            if (audio.paused) {
                audio.play().catch(function(error) {
                    console.log("Error playing audio: ", error);
                });
                playMusicBtn.classList.add('active'); // Add the 'active' class to change color to red
            } else {
                audio.pause(); // Pause the audio
                playMusicBtn.classList.remove('active'); // Remove the 'active' class to revert to default gray
            }
        });


    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterType = button.getAttribute("data-type");
            const filterValue = button.getAttribute("data-value");

            if (filterType === "status") {
                // Set status filter (only one allowed)
                activeFilters.status = activeFilters.status === filterValue ? null : filterValue;
            } else if (filterType === "clan") {
                // Toggle clan filter (multiple allowed)
                const index = activeFilters.clan.indexOf(filterValue);
                if (index === -1) {
                    activeFilters.clan.push(filterValue);
                } else {
                    activeFilters.clan.splice(index, 1);
                }
            }

            applyFilters();
        });
    });

    function applyFilters() {
        cultivators.forEach(cultivator => {
            const status = cultivator.getAttribute("data-status");
            const clan = cultivator.getAttribute("data-clan");

            // Check filters
            const statusMatch = !activeFilters.status || activeFilters.status === status;
            const clanMatch = activeFilters.clan.length === 0 || activeFilters.clan.includes(clan);

            // Logical AND for status, OR for clan
            if (statusMatch && clanMatch) {
                cultivator.style.display = "block";
            } else {
                cultivator.style.display = "none";
            }
        });
    }
});

