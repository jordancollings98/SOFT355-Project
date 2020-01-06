$(document).ready(function(){
  $("#btnGetData").click(function(){
    $('#getTitleData').html("");
    $('#getMessageData').html("");
    $('#getIdData').html("");
    $.getJSON("/getNotes", function(result){
      var noteTitle = '<h3 id="getNoteTitle">' + "Title" + '</h3>';
      var messageTitle = '<h3 id="getNoteTitle">' + "Message" + '</h3>';
      var idTitle = '<h3 id="getNoteTitle">' + "ID" + '</h3>';

        $('#getTitleData').append(noteTitle);
        $('#getMessageData').append(messageTitle);
        $('#getIdData').append(idTitle);


      $.each(result, function(i, note){
        var option_result = '<li id="titleList">'+ note.title + '</li>';
        var option_result2 = '<li id="messageList">'+ note.message + '</li>';
        var option_result3 = '<li id="titleList">' + note._id + '</li>';
          $('#getTitleData').append(option_result);
          $('#getMessageData').append(option_result2);
          $('#getIdData').append(option_result3);
      });
    });
  });
});
