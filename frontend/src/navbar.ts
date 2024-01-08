document.addEventListener("DOMContentLoaded", () => {
  const profileButton = document.getElementById('user-menu-button');
  const profileDropdown = document.getElementById('profile-dropdown');

  if (profileButton && profileDropdown) {
      // Variable to track whether the dropdown is open or closed
      let isDropdownOpen = false;

      // Function to close the dropdown
      const closeDropdown = () => {
          profileDropdown.classList.add('hidden');
          isDropdownOpen = false;
      };

      // Toggle the dropdown when the profile button is clicked
      profileButton.addEventListener('click', () => {
          if (isDropdownOpen) {
              closeDropdown();
          } else {
              profileDropdown.classList.remove('hidden');
              isDropdownOpen = true;
          }
      });

      // Close the dropdown if user clicks outside of it
      document.addEventListener('click', (event) => {
          const target = event.target as HTMLElement;

          if (!profileButton.contains(target) && !profileDropdown.contains(target)) {
              closeDropdown();
          }
      });
  }
});
