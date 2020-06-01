var edit = document.getElementById('edit_btn');
var input = document.getElementById('credential_input');
edit.addEventListener('click',function()
{
    edit.classList.add('display');
    input.classList.remove('display');
    
});

var save = document.getElementById('form_save');
var cancel = document.getElementById('form_cancel');
save.addEventListener('click',function()
{
    input.classList.add('display');
    edit.classList.remove('display');
});

cancel.addEventListener('click',function()
{
    input.classList.add('display');
    edit.classList.remove('display');
});

// var editPhoto = document.getElementById('edit_photo');
// editPhoto.click(function(e) {
//     // $("#imageUpload").click();
//     alert('Hello');
// });

$("#edit_photo").click(function(e) {
    $("#imageUpload").click();
    // alert('hello');
});