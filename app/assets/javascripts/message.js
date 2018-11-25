$(document).on('turbolinks:load', function () {
  function buildHTML(message) {

    var add_image = (message.image) ? `<image class='message--image' src="${message.image}">` : '';

    var html =
     `<div class='chat-main__body--list--message' data-message-id = "${ message.id }">
       <div class='chat-main__body--list--message--name'>
         ${message.user_name}
        </div>
        <div class='chat-main__body--list--message--time'>
         ${message.created_at}
        </div>
        <div class='chat-main__body--list--message--text'>
         ${message.content}
        </div>
         ${add_image}
      </div>`;

    return html;
};

  $('#new-message').submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    var href = window.location.href;

    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function (message) {

      var html = buildHTML(message);
      $('.chat-main__body--list').append(html)

      $('#message-content').val('')
      $('.chat-main__body').animate({
        scrollTop: $('.chat-main__body')[0].scrollHeight
      }, 1000, 'swing');
    })

    .fail(function () {
      alert('error');
    })
    .always(function () {
      $(".chat-main__footer--new-message--submit").removeAttr("disabled");
    });
  });



  $(function () {
    var interval = setInterval(function (){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
          var message_id = $('.chat-main__body--list--message').last().data('message-id');
          $.ajax({
            url: location.href.json,
            type: 'GET',
            data: {id: message_id},
            dataType: 'json'
          })
          .done(function(data){
            if (data.length != 0 ){
              data.forEach(function(message){
                var html = buildHTML(message);
                $('.chat-main__body--list').append(html);
              });

              $('.chat-main__body').animate({
                scrollTop: $('.chat-main__body')[0].scrollHeight
              }, 1000, 'swing');
            }
          })
          .fail(function() {
            alert('自動更新に失敗しました');
          });
         }else{
          clearInterval(interval);
      }}, 5000);
  });
});
