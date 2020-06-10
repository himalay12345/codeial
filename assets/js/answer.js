var answer = document.querySelectorAll('#ans');
var button = document.querySelectorAll('#editor_submit');
var cancel = document.querySelectorAll('.cancel');



for(let i=0;i<answer.length;i++){
answer[i].addEventListener('click',function()
{
    var editor = document.querySelectorAll('#editor');
   
    
    editor[i].classList.remove('display');

    button[i].addEventListener('click',function()
    {
        editor[i].classList.add('display');
    });

    cancel[i].addEventListener('click',function()
    {
        editor[i].classList.add('display');
    });
});
}


var text = document.querySelectorAll('#text');
for(let i=0;i<text.length;i++){
CKEDITOR.replace( text[i],{height: 200 ,width:595});

}


