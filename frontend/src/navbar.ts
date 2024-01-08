// export function setupCounter(element: HTMLButtonElement) {
//   let counter = 0
//   const setCounter = (count: number) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }


const menu: HTMLElement | null = document.getElementById('menu');
const toggleButton: HTMLElement | null = document.getElementById('toggleButton');

if (menu && toggleButton) {
  console.log('menu and toggleButton found');
  toggleButton.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden', 'ease-in', 'duration-75', 'opacity-0', 'scale-95');
      menu.classList.add('ease-out', 'duration-100', 'opacity-100', 'scale-100');
    } else {
      menu.classList.remove('ease-out', 'duration-100', 'opacity-100', 'scale-100');
      menu.classList.add('ease-in', 'duration-75', 'opacity-0', 'scale-95');

      // Hide the menu after the transition is complete
      setTimeout(() => {
        menu.classList.add('hidden');
      }, 75);
    }
  });
}
