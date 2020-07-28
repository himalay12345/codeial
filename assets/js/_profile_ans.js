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
            // alert(hello);
        }
    );
}

var ans_content = document.querySelectorAll('#ans');
var see_more = document.querySelectorAll('#see_more');
for(let i=0;i<see_more.length;i++)
{
    see_more[i].addEventListener('click',function(e)
    {
        e.preventDefault();
        ans_content[i].style.height = "auto";
        see_more[i].classList.add('display');
    });
}
for(let i=0;i<ans_content.length;i++)
{
    
if( ans_content[i].getElementsByTagName('img').length > 0) {
    ans_content[i].style.height = "400px";
    see_more[i].style.bottom="50px";

}

if(ans_content[i].innerHTML.length<350)
    {
        see_more[i].classList.add('display');
    }
}
