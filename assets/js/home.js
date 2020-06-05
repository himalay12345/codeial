var comment = document.querySelectorAll('#comment');
var flag=false;


var c_section = document.querySelectorAll('#comment_container');
for(let i=0;i<c_section.length;i++)
{
    c_section[i].addEventListener('click',function(event)
    {
        event.stopPropagation();
    })
}


for(let i=0;i<comment.length;i++)
{
    comment[i].addEventListener('click',function(event)
        { 
             
            var comment_section = document.querySelectorAll('#comment_section');
            if(!flag){
               
            comment_section[i].classList.remove('display');
            event.stopPropagation();
            
            flag=true;
            }

            else{
                comment_section[i].classList.add('display'); 
                event.stopPropagation();
                flag=false;
            }
        }
    );
}


function changeLanguage(language) {
    var element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
}

var c_dropbtn = document.querySelectorAll('.c_dropbtn');
for(let i=0;i<c_dropbtn.length;i++)
{
    var c_dropdown = document.querySelectorAll('#c_myDropdown')
    c_dropbtn[i].addEventListener('click',function()
    {
        c_dropdown[i].classList.toggle("c_show");
        
    });
    
}


var dropbtn = document.querySelectorAll('.dropbtn');
for(let i=0;i<dropbtn.length;i++)
{
    var dropdown = document.querySelectorAll('#myDropdown')
    dropbtn[i].addEventListener('click',function()
    {
        dropdown[i].classList.toggle("show");
    });
    
}

function boo(answerId){
        
    var dropdown = document.querySelector(answerId);
    dropdown.classList.add('c_show');
            
             
 }

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }

    // if(!event.target.matches('.comment_option'))
    // {
    //     var commentSection = document.querySelectorAll('#comment_section');
    //     var i;
    //     for (i = 0; i < commentSection.length; i++) {
    //         var comment = commentSection[i];
    //         if (comment.classList.contains('comments')) {
    //             comment.classList.add('display');
    //         }
    //     }
    // }
}

$(document).click(function(event){
    if (!$(event.target).hasClass('comments')) {
        var commentSection = document.querySelectorAll('#comment_section');
        for(let i=0;i<commentSection.length;i++)
        {
            commentSection[i].classList.add("display");
            flag=false;
        }
    }

    // if (!$(event.target).hasClass('dropdown')) {
    //     var dropSection = document.querySelectorAll('.dropdown-content');
    //     for(let i=0;i<dropSection.length;i++)
    //     {
    //         dropSection[i].classList.remove("c_show");
    //     }
    // }
});

   



