var forgot_button=document.querySelector("#forgot_btn"),signin_container=document.querySelector("#signin_container"),cancel_reset=document.querySelector("#cancel_reset"),reset_container=document.querySelector("#reset_container");forgot_button.addEventListener("click",(function(){signin_container.classList.add("display"),reset_container.classList.remove("display")})),cancel_reset.addEventListener("click",(function(){reset_container.classList.add("display"),signin_container.classList.remove("display")}));