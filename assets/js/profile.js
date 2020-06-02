var edit = document.getElementById('edit_btn');
var edit_container = document.getElementById('edit_profile');
var input = document.getElementById('credential_input');
edit.addEventListener('click',function()
{
    edit_container.classList.add('display');
    input.classList.remove('display');
    
});


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