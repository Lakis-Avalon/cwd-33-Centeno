document.addEventListener('DOMContentLoaded', function () {
    const snelems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(snelems);

    const mboxes = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(mboxes);

    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns, {
        constrainWidth: false, // Allows the dropdown to match the trigger width
        coverTrigger: false    // Prevents the dropdown from overlapping the trigger
    });

    var spies = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(spies);

    var playMusicBtn = document.getElementById('playMusicBtn');
    var audio = document.getElementById('backgroundMusic');

    // Function to toggle play/pause and button styles
    playMusicBtn.addEventListener('click', function(event) {
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

    document.addEventListener("scroll", () => {
        const scrollspyMenu = document.querySelector(".scrollspy-menu");
        const activeLink = document.querySelector(".scrollspy-menu .active");
      
        if (activeLink && scrollspyMenu) {
          const containerRect = scrollspyMenu.getBoundingClientRect();
          const activeRect = activeLink.getBoundingClientRect();
      
          // Check if the active item is outside the visible area of the container
          if (activeRect.top < containerRect.top || activeRect.bottom > containerRect.bottom) {
            // Adjust the scroll position to bring the active item into view
            scrollspyMenu.scrollTop += activeRect.top - containerRect.top;
          }
        }
      });
      

});
