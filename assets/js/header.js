var dropbtn = document.querySelector('.user_icon');

var dropdown = document.getElementById('user_option');
    dropbtn.addEventListener('click',function(e)
    {
        e.stopPropagation();
        dropdown.classList.toggle("display_option");
    });

   