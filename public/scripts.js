$(document).ready(function(){
    //Create Post
    $('#new-post').submit(function(e){
        e.preventDefault();
        var post = $(this).serialize();
        $.ajax({
           url: '/posts',
           data: post,
           error: function() {
              alert('Error');
           },
           dataType: 'json',
           success: function(data) {
              $('.list-group').append("<li class='list-group-item'>" + "<a href='/posts/{{this._id}}'>" + data.body + "</a>" + "</li>");
              $('#new-post')[0].reset();
           },
           type: 'POST'
        });
    });

    //Create Comment
    $('#new-comment').submit(function(e){
        e.preventDefault();
        var comment = $(this).serialize();
        $.ajax({
           url: '/comments',
           data: comment,
           error: function() {
              alert('Error');
           },
           dataType: 'json',
           success: function(data) {
              $('.list-group').append("<li class='list-group-item-comment'>"  + data.description + "</li>");
              $('#new-comment')[0].reset();
          },
          type: 'POST'
        });
    });

    //Delete Post
    $('.remove-post').click(function(e){
        e.preventDefault();
        var post = $(this);
        var postId = post.data('id');
        console.log(postId);
        $.ajax({
           url: '/posts/' + postId,
           type: 'DELETE',
           success: function(data) {
              post.parent().remove();
           },
        });
    });

    //Update Post
    $('#update-post').submit(function(e){
        e.preventDefault();
        var post = $(this).serialize();
        var postId = window.location.pathname.replace("/posts", "").replace("edit","").replace("/","").replace("/","")
        // window.location.pathname.split('/')[2];
        $.ajax({
            url: "/posts/" + postId,
            type: "PUT",
            data: post,
            error: function() {
               alert('Error');
            },
            dataType: 'json',
            success: function(data){
                // console.log(data);
                window.location.href = "/";
            }
        });
    });

    //Sign-Up
    $('#signup').submit(function(e){
        e.preventDefault();
        var user = $(this).serialize();
        $.ajax({
           url: '/signup',
           data: user,
           error: function() {
              alert('Error');
           },
           dataType: 'json',
           success: function(data) {
              console.log("Received user data");
              Cookies.set('token', data.token);
              // IF YOU'D LIKE TO REDIRECT NOW, ADD THIS:
              window.location.href = "/";
           },
           type: 'POST'
        });
    });

});
