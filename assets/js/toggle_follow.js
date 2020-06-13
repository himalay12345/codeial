// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleFollow{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFollow();
    }


    toggleFollow(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let followCount = parseInt($(self).attr('data-follows'));
                let profile_id = ($(self).attr('href'));
                console.log(followCount);
                if (data.data.deleted == true){
                    followCount -= 1; 
                    $(self).attr('data-follows', followCount);
                    $(self).html(`<a href="${profile_id}" class="toggle-follow-button" data-follows="${followCount}"><button id="follow_btn"><i class="fas fa-rss"></i> Follow</button></a>`)
                }else{
                    followCount += 1;
                    $(self).attr('data-follows', followCount);
                    $(self).html(`<a href="${profile_id}" class="toggle-follow-button" data-follows=""><button id="follow_btn"><i class="fas fa-check-square"></i> Following</button></a>`);
                }

               




                

            })
            .fail(function(errData) {
                console.log('error in completing the request',errData);
            });
            

        });
    }
}
