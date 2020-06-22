var comment = document.querySelectorAll('#comment');
var flag=false;

for(let i=0;i<comment.length;i++)
{
    comment[i].addEventListener('click',function()
        { 
             
            var comment_section = document.querySelectorAll('#comment_section');
            if(!flag){
               
            comment_section[i].classList.remove('display');
            flag=true;
            }

            else{
                comment_section[i].classList.add('display'); 
                flag=false;
            }
        }
    );
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


var ans_dropbtn = document.querySelectorAll('.ans_dropbtn');
for(let i=0;i<ans_dropbtn.length;i++)
{
    var ans_dropdown = document.querySelectorAll('#ans_myDropdown')
    ans_dropbtn[i].addEventListener('click',function()
    {
        ans_dropdown[i].classList.toggle("ans_show");
    });
    
}

function boo(answerId){
        
    var dropdown = document.querySelector(answerId);
    dropdown.classList.add('ans_show');
            
             
 }



// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.ans_dropbtn')) {
        var ans_dropdowns = document.getElementsByClassName("ans_dropdown-content");
        var i;
        for (i = 0; i < ans_dropdowns.length; i++) {
            var ans_openDropdown = ans_dropdowns[i];
            if (ans_openDropdown.classList.contains('ans_show')) {
                ans_openDropdown.classList.remove('ans_show');
            }
        }
    }

    if (!event.target.matches('.c_dropbtn')) {
        var ans_dropdowns = document.getElementsByClassName("c_dropdown-content");
        var i;
        for (i = 0; i < ans_dropdowns.length; i++) {
            var ans_openDropdown = ans_dropdowns[i];
            if (ans_openDropdown.classList.contains('c_show')) {
                ans_openDropdown.classList.remove('c_show');
            }
        }
    }

    if (!event.target.matches('.header_dropdown')) {
        var openDropdown = document.getElementById("user_option");
        
            if (openDropdown.classList.contains('display_option')) {
                openDropdown.classList.remove('display_option');
            }
        }

        if (!event.target.matches('.nots_dropdown')) {
            var openDropdown = document.getElementById("nots_content");
            
                if (openDropdown.classList.contains('display_option')) {
                    openDropdown.classList.remove('display_option');
                }
            }
}

//     // if(!event.target.matches('.comment_option'))
//     // {
//     //     var commentSection = document.querySelectorAll('#comment_section');
//     //     var i;
//     //     for (i = 0; i < commentSection.length; i++) {
//     //         var comment = commentSection[i];
//     //         if (comment.classList.contains('comments')) {
//     //             comment.classList.add('display');
//     //         }
//     //     }
//     // }
// }

// $(document).click(function(event){
//     if (!$(event.target).hasClass('comments')) {
//         var commentSection = document.querySelectorAll('#comment_section');
//         for(let i=0;i<commentSection.length;i++)
//         {
//             commentSection[i].classList.add("display");
//             flag=false;
//         }
//     }

//     // if (!$(event.target).hasClass('dropdown')) {
//     //     var dropSection = document.querySelectorAll('.dropdown-content');
//     //     for(let i=0;i<dropSection.length;i++)
//     //     {
//     //         dropSection[i].classList.remove("c_show");
//     //     }
//     // }
// });

// // ------------------------------------------------------------------------------------------------------------

let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Answer Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error:function(err)
            {
                console.log(err.responseText);
            }
        });
    });
}



