import"./main-ClrnbhyS.js";import{f as a,a as r}from"./admin-posts-OSaIQnYF.js";import"./login-9arz2Xpc.js";const c=document.getElementById("post-comment-modal");a();r();document.addEventListener("DOMContentLoaded",()=>{fetch("http://localhost:3000/posts").then(e=>e.json()).then(e=>{e.forEach(n=>{m(n)})}).catch(e=>{console.error("Failed to fetch Posts:",e)})});function l(e,n){const t=document.getElementById("alert-message");t.textContent=e,t.classList.remove("success","error"),t.classList.add(n,"visible"),setTimeout(()=>{t.classList.remove("visible")},5e3)}function m(e){const n=`
        <div class="flex flex-col items-center text-md md:text-xl lg:text-xl ">
            <div class="bg-blue-300 shadow-md rounded-md m-2 w-[90vw] h-[60vh] md:w-[60vw] md:h-[40vh] lg:w-[40vw] lg:h-[80vh] xl:w-[30vw] xl:h-[90vh] flex flex-col">
                <div class="top-0 flex justify-around">
                    <div>
                        <p>${e.categories?e.categories.name:"N/A"}</p>
                    </div>
                </div>
                <div class="flex-grow flex flex-col mx-8">
                    <div class="mt-6">
                        <p class="text-lg md:text-xl lg:text-xl">${e.title}</p>
                        <hr class="bg-gray-300 ">
                    </div>
                    <div class="grid grid-cols-12">
                        <div class="col-span-12">
                            <p class="text-sm md:text-xl lg:text-xl mt-6">${e.content}</p>
                        </div>
                    </div>
                    <div class="flex mt-auto items-center justify-between class="text-sm md:text-xl lg:text-xl mt-6"">
                        <div class="flex-1 text-xs flex justify-start">
                            <p>${e.author?e.author.name:"N/A"}</p>
                        </div>
                        <div class="flex flex-1 justify-center gap-4 my-4  text-red-700 ">
                            <button id="post-like-button" class="unlike like:bg-red-700"><i class="ri-heart-3-line text-3xl"></i></button>
                            <button id="post-comment-button" onclick =('${e.id}')><i class="ri-discuss-line text-3xl "></i></button>
                            <button id="post-share-button" class="" onclick="sharePost('${e.title}', '${e.content}')"><i class="ri-share-forward-line text-3xl  "></i></button>
                        </div>
                        <div class="flex-1 text-xs flex justify-end">
                            <p>${e.createdAt?new Date(e.createdAt).toLocaleDateString():"N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,t=document.createElement("div");t.innerHTML=n,document.getElementById("cardContainer").appendChild(t);const s=t.querySelector("#post-like-button");s.addEventListener("click",()=>{console.log("like button clicked"),s.classList.toggle("text-blue-700")}),t.querySelectorAll("#post-comment-button").forEach(i=>{i.addEventListener("click",()=>{console.log("clicked"),h(e.id)})}),t.querySelector("#post-share-button").addEventListener("click",()=>{u(e.title,e.content)})}function u(e,n){navigator.share?navigator.share({title:e,text:n}).then(()=>console.log("Successful share")).catch(t=>console.log("Error sharing:",t)):console.warn("Sharing not supported")}let d=null;function h(e){console.log("clicked"),c.showModal(),d=e}function g(){const e=document.getElementById("addCommentButton");e==null||e.addEventListener("click",()=>{console.log("addCategoriesButton clicked");const t=document.getElementById("commentInput").value;console.log("Request Payload:",JSON.stringify({content:t})),fetch("http://localhost:3000/comments/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t,postId:d})}).then(o=>o.json()).then(o=>{o.success?(console.log("Comment added successfully:",o.comment),l(o.message,"success"),c.close(),location.reload()):(console.error("Failed to add category. Error:",o.error||"Unknown error"),l(o.message,"error"))}).catch(o=>{console.error(o)})})}g();const x=document.getElementById("logout-button");x.addEventListener("click",e=>{e.preventDefault(),localStorage.removeItem("accessToken"),window.location.href="/auth/login.html"});
