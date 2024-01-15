import"./main-ClrnbhyS.js";/* empty css              */import{p as m,b as h,f as p,a as u,c as b,d as f}from"./admin-posts-OSaIQnYF.js";function C(){fetch("http://localhost:3000/user").then(e=>e.json()).then(e=>{g(e)}).catch(e=>{console.error("Failed to fetch users:",e)})}function g(e){const n=document.getElementById("tbody-admin-users");n&&(n.innerHTML="",e.forEach(a=>{const t=document.createElement("tr"),o=document.createElement("td");o.innerHTML='<label><input type="checkbox" class="checkbox" /></label>',t.appendChild(o);const s=document.createElement("td");s.innerHTML=`
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <i class="ri-user-line"></i>
            </div>
          </div>
          <div>
            <div class="font-bold">
              <p>${a.name}</p>
            </div>
            <div class="text-sm opacity-50">
              <p>${a.name}</p>
            </div>
          </div>
        </div>
      `,t.appendChild(s);const c=document.createElement("td");c.textContent=a.email,t.appendChild(c);const d=document.createElement("td");d.innerHTML='<label><input type="checkbox" class="checkbox" /></label>',t.appendChild(d);const l=document.createElement("td");l.innerHTML='<label><input type="checkbox" class="checkbox" /></label>',t.appendChild(l),n.appendChild(t)}))}function E(){console.log("Fetching comments..."),fetch("http://localhost:3000/comments").then(e=>{if(console.log("Response status:",e.status),!e.ok)throw new Error("Network response was not ok");return e.json()}).then(e=>{e?(console.log("Comments fetched successfully:",e),y(e.data)):console.error("Failed to fetch comments. Server response:",e)}).catch(e=>{console.error("Error fetching comments:",e)})}function y(e){const n=document.getElementById("tbody-admin-comments");console.log(n),n&&(console.log("Rendering comments:",e),n.innerHTML="",e.forEach(a=>{const t=document.createElement("tr"),o=document.createElement("td");o.innerHTML='<label><input type="checkbox" class="checkbox" /></label>',t.appendChild(o);const s=document.createElement("td");t.appendChild(s);const c=document.createElement("td");c.innerHTML=`<p>${a.content}</p>`,t.appendChild(c);const d=document.createElement("th");d.className="flex gap-4",d.innerHTML=`
             <button class="Hide-comment-button" data-comment-id="${a.id}"><i class="ri-eye-line"></i></button>
         `,t.appendChild(d),n.appendChild(t),n.appendChild(t)}))}const k=document.getElementById("menu-contents"),r=document.getElementById("admin-posts"),i=document.querySelectorAll(".admin-list");function v(){i.forEach(e=>{e==null||e.addEventListener("click",n=>{n.preventDefault();const t=n.target.id;i.forEach(s=>{s.classList.remove("bg-gray-950")}),e.classList.add("bg-gray-950");const o=s=>{fetch(s).then(c=>c.text()).then(c=>{k.innerHTML=c,b(),f()}).catch(c=>{console.warn(c)})};switch(t){case"admin-posts":o("/auth/admin-posts.html"),u();break;case"admin-categories":o("/auth/admin-categories.html"),p();break;case"admin-comments":o("/auth/admin-comments.html"),E();break;case"admin-add-posts":o("/auth/admin-add-posts.html"),m(),h();break;case"admin-users":o("/auth/admin-users.html"),C();break;default:console.warn("Unknown ID:",t)}})}),r.classList.add("bg-gray-950"),r.click()}document.addEventListener("DOMContentLoaded",()=>{v()});
