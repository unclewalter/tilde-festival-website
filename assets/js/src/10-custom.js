$(document).ready(function() {
  var cvFile;
  $("#cvUpload").on('change', function() {
    readPDF($(this)).done(function(base64Data) {
      cvFile = base64Data;
    });
  });
  $("#submitEOI").click(function() {
    $(".EOI-form").validate(function() {
      var submissionDetails = $(".EOI-form").serializeObject();
      $("#submitEOI").html("Submitting...");
      submissionDetails.cv = {
        type: "",
        filename: ""
      };
      if (cvFile) {
        var fname = $('#cvUpload').val().replace("C:\\fakepath\\", "");
        submissionDetails.cv = {
          type: base64MimeType(cvFile),
          fname: fname
        };
      }
      submissionDetails.agentString = navigator.userAgent;
      $.ajax({
        data: JSON.stringify(submissionDetails),
        url: 'https://u7zjgs87ed.execute-api.eu-west-1.amazonaws.com/dev/eoi/submit',
        type: 'POST',
        processData: false,
        crossDomain: true,
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function(data) {
          if (data.errorMessage) {
            alert("Error: " + data.errorMessage);
            $("#submitEOI").html("Submit EOI");
          } else {
            if (data.cvfilename && document.getElementById('cvUpload')) {
              var cvFile = document.getElementById('cvUpload').files[0]
              uploadFile(cvFile, data.cvfilename, function() {
                $("#submitEOI").html("Submission successful!");
                $("#submitEOI").attr("disabled", true);
              });
            } else {
              $("#submitEOI").html("Submission successful!");
              $("#submitEOI").attr("disabled", true);
            }
          }
          console.log(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          alert(thrownError);
        }
      });
    });
  });
  // Academy Form
  $("#academyStreamSelector").change(function() {
    switch (this.value) {
      case "composition":
        $(".stream_both").css("display", "block");
        // $(".stream_both").attr("data-validate","required");

        $(".stream_composition").css("display", "block");
        // $(".stream_composition").attr("data-validate","required");

        $(".stream_performance").css("display", "none");
        // $(".stream_performance").removeAttr("data-validate");
        break;
      case "performance":
        $(".stream_both").css("display", "block");
        // $(".stream_both").attr("data-validate","required");

        $(".stream_performance").css("display", "block");
        // $(".stream_performance").attr("data-validate","required");

        $(".stream_composition").css("display", "none");
        // $(".stream_composition").removeAttr("data-validate");
        break;
      default:
        $(".stream_both").css("display", "none");
        // $(".stream_both").removeAttr("data-validate");

        $(".stream_performance").css("display", "none");
        // $(".stream_performance").removeAttr("data-validate");

        $(".stream_composition").css("display", "none");
        // $(".stream_composition").removeAttr("data-validate");
    }
  });

});
