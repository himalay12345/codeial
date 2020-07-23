$(document).ready( function() {
    $('.topic_answered').each(function(i, d) {
        // console.log('slot found: ' + d.id);
        let postId = $(this).attr('data');

        let del = new PostComments(postId);
        
        
       

        
    });
});





// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            $('#comment_submit').val("");
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new ToggleLike($('.toggle-like-button',newComment))
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(` <div id="comment-${ comment._id }"class="comment_card">
        <div id="comment_header">
            <img src="${comment.user.avatar}">
            <div>
                <h2>${comment.user.name}</h2>
                <h3>May 25</h3>
            </div>
           
        </div>
        <div id="comment_content">
        ${comment.content}
        </div>
        <div id="comment_interact">
        <a class="toggle-like-button" href="/likes/toggle/?id=${comment._id}&type=Comment" data-likes="0"><span><i class="fas fa-chevron-circle-up"></i><span>0 </span></span>Upvote</span></a>
            <a href="#"><span><i class="fas fa-reply"></i></span>Reply</a>
            <a href="#"><span><i class="fas fa-heart"></i></span>Like</a>
            <a class="delete-comment-button" href="/comment/destroy/${comment._id}"><span><i class="fas fa-trash"></i></span>Delete comment</a>
            <div class="c_dropdown" onclick = "boo('.comment-${ comment._id}')">
                <!-- three dots -->
                <ul class="c_dropbtn icons btn-right showLeft">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <!-- menu -->
                <div id="c_myDropdown" class="c_dropdown-content comment-${ comment._id }">
                    <a class="delete-comment-button" href="/comment/destroy/${comment._id}">Delete comment</a>
                    <a href="#about">Edit</a>
                </div>
            </div>

        </div>
    </div>
    <script>
    </script>`);
    }  


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}

var comment_sec = document.querySelectorAll('.comment_card');
for(let i=0;i<comment_sec.length;i++)
{
    $('.delete-comment-button',comment_sec[i]).each(function()
        {
            let self= this;
            DeleteComment(self);
        });
}


function DeleteComment(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#comment-${data.data.comment_id}`).remove();

                new Noty({
                    theme: 'relax',
                    text: "Comment Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        });

    });
}