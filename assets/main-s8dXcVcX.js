import"./main-8G-_DN96.js";const e=document.getElementById("menu"),t=document.getElementById("toggleButton");e&&t&&(console.log("menu and toggleButton found"),t.addEventListener("click",()=>{e.classList.contains("hidden")?(e.classList.remove("hidden","ease-in","duration-75","opacity-0","scale-95"),e.classList.add("ease-out","duration-100","opacity-100","scale-100")):(e.classList.remove("ease-out","duration-100","opacity-100","scale-100"),e.classList.add("ease-in","duration-75","opacity-0","scale-95"),setTimeout(()=>{e.classList.add("hidden")},75))}));
