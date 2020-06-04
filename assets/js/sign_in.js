var forgot_button = document.querySelector('#forgot_btn');
var signin_container = document.querySelector('#signin_container');
var cancel_reset = document.querySelector('#cancel_reset');
var reset_container = document.querySelector('#reset_container');

forgot_button.addEventListener('click',function()
{
    signin_container.classList.add('display');
    reset_container.classList.remove('display');

});

cancel_reset.addEventListener('click',function()
{
    reset_container.classList.add('display');
    signin_container.classList.remove('display');

});