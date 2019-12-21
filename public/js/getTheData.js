$(document).ready(function(){
  $("#btnGetData").click(function(){
    $('#rowData').html("");
    $('#rowData2').html("");
    $.getJSON("/getNotes", function(result){
      var noteTitle = '<h5>' + "Title" + '</h5>';
      var messageTitle = '<h5>' + "Message" + '</h5>';

        $('#rowData').append(noteTitle);
        $('#rowData2').append(messageTitle);


      $.each(result, function(i, note){
        var option_result = '<li id="titleList">'+ note.title + '</li>';
        var option_result2 =   '<li id="messageList">'+ note.message + '</li>';
          $('#rowData').append(option_result);
          $('#rowData2').append(option_result2);
      });
    });
  });
});
