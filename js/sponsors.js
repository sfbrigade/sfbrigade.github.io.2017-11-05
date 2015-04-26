$(function() { 
  $("#form-sponsor-us").validate({
    rules: {
      _replyto: {
        required: true,
        email: true
      },
      message: {
        required: true
      },
      name: {
        required: true
      }
    },
    submitHandler: function(form) {
      var data = $(form).serialize();
      $.ajax({
        url: "//formspree.io/hello@codeforsanfrancisco.org",
        method: "POST",
        data: data,
        dataType: "json"
      })
      .done(function() {
        $('.form-content').hide();
        $('.form-sponsor-us-success').show();
        $('.form-submit').hide();
      });
    }
  });
});