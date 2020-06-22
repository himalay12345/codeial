var dropbtn = document.querySelector('.user_icon');
var notsbtn = document.querySelector('#nots_icon');

var dropdown = document.getElementById('user_option');
    dropbtn.addEventListener('click',function(e)
    {
        e.stopPropagation();
        dropdown.classList.toggle("display_option");
    });


var nots_dropdown = document.getElementById('nots_content');
notsbtn.addEventListener('click',function(e)
{
    e.stopPropagation();
    nots_dropdown.classList.toggle("display_option");
});

   