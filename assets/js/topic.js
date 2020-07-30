var ans_click = document.getElementById('ans_click');
var ques_click = document.getElementById('ques_click');
var ans_div = document.getElementById('answer_list');
var ques_div = document.getElementById('question_list');

ans_click.addEventListener('click',function(e)
{
    e.preventDefault();
    ans_div.classList.add('display');
    ques_div.classList.remove('display');
    ques_click.classList.remove('active');
    ans_click.classList.add('active');

});

ques_click.addEventListener('click',function(e)
{
    e.preventDefault();
    ques_div.classList.add('display');
    ans_div.classList.remove('display');
    ans_click.classList.remove('active');
    ques_click.classList.add('active');
});