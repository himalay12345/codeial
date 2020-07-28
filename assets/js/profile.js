var edit = document.getElementById('edit_btn');
var edit_container = document.getElementById('edit_profile');
var input = document.getElementById('credential_input');


var cancel = document.getElementById('form_cancel');

cancel.addEventListener('click',function()
{
    input.classList.add('display');
    edit_container.classList.remove('display');
});


$("#edit_photo").click(function(e) {
    $("#imageUpload").click();

    // alert('hello');
});

document.getElementById("imageUpload").onchange = function() {
    document.getElementById("edit_form").submit();
};




var add_topic = document.getElementById('add_topic');
var interest_box = document.getElementById('interests');
var interest_list = document.getElementById('interest_list');
var interest_cancel = document.getElementById('interest_cancel_btn');
var add_topic_btn = document.getElementById('add_topic_btn');




add_topic.addEventListener('click',function()
{
    interest_box.classList.toggle('display');
    interest_list.classList.toggle('display');
    
});



interest_cancel.addEventListener('click',function()
{
    interest_list.classList.toggle('display');
    interest_box.classList.toggle('display');
    // alert('hello');
});

var message_btn = document.getElementById('message_btn');
var chatbox = document.getElementById('chat_box');
message_btn.addEventListener('click',function(event)
{
    event.preventDefault();
    chatbox.classList.toggle('show');
});

var chat_cancel = document.getElementById('message_close');
chat_cancel.addEventListener('click',function()
{
    chatbox.classList.remove('show');
});

add_topic_btn.addEventListener('click',function()
{
    interest_box.classList.toggle('display');
    interest_list.classList.toggle('display');
    
});


edit.addEventListener('click',function()
{
    edit_container.classList.add('display');
    input.classList.remove('display');
    
});







