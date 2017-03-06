$(document).ready(function(){
    //Create Post
    $('#new-post').submit(function(e){
        e.preventDefault();
        var post = $(this).serialize();
        $.ajax({
           url: '/posts',
           data: post,
           fail: function() {
              alert(error.message);
           },
           dataType: 'json',
           success: function(data) {
               $('#posts').append(
              "<li class='list-group-item'>" +
                  "<a href= '/posts/'" + data._id + ">" + data.body + "</a>" +
                  "<div class='videoWrapperOuter'>" +
                      "<div class='videoWrapperInner'>" +
                        "<iframe frameborder='0' width='560' height='315' src='https://www.youtube.com/embed/'" + data.video_url + "' allowfullscreen='true'></iframe>" +
                      "</div>" +
                  "</div>" +
                  "<div class='remove-post' data-id='" + data._id + "'>Remove</div>" +
                  "<a href= '/posts/'"+ data._id + "'/edit'>Edit</a>" +
              "</li>");
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
           error: function(error) {
              alert(error.message);
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

    $('#logout').click(function(e){
        Cookies.remove('token');
        window.location.href = '/'
    })

    $('#direct-login').click(function(e){
        window.location.href = '/new'
    })
    //Sign-Up
    $('#login').submit(function(e){
        e.preventDefault();
        var user = $(this).serialize();
        $.ajax({
           url: '/login',
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
