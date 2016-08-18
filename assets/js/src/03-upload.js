var uploadFile = function(file, filename, callback) {
    var uploads = [];
    var fd = new FormData();

    console.log("Upload");

    var key = "eoi/"+filename;


    // Populate the Post parameters. TODO: update IAM
    fd.append('key', key);
    fd.append('AWSAccessKeyId', 'AKIAIX2CVSBAG5JNVK2Q');
    fd.append('acl', 'private');
    fd.append('policy', "eyJleHBpcmF0aW9uIjogIjIwMTYtMjQtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInRpbGRlLXN1Ym1pc3Npb25zIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiZW9pLyJdLAogICAgeyJhY2wiOiAicHJpdmF0ZSJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogIF0KfQo=");
    fd.append('signature', "+WB5Va+whOTSBDbi/IF7vyPpFbE=");
    fd.append('content-type', '');
    fd.append("file", file);

    var xhr = new XMLHttpRequest();

    uploads.push(false);

    var uploadsIndex = uploads.length - 1;

    xhr.upload.addEventListener("progress", function(evt) {
        // if (evt.lengthComputable) {
        //     var percentComplete = Math.ceil(evt.loaded * 100 / evt.total);
        //     progressBar.innerHTML = "<p>" + percentComplete.toString() + '%</p>';
        //     progressBar.style.width = percentComplete.toString() + '%';
        // } else {
        //     progressBar.innerHTML = "<p>unable to compute</p>";
        // }
    }, false);

    xhr.addEventListener("load", function(evt) {
        /* This event is raised when the server send back a response */

        uploads[uploadsIndex] = true;

        var done = true;
        for (var i = 0; i < uploads.length; i++) {
          if (!uploads[i]) {
            done = false;
          }
        }

        if (done) {
          callback();
        }

    }, false);

    xhr.addEventListener("error", function(evt) {
        // progressBar.innerHTML = "<p>There was an error attempting to upload the file." + evt + "</p>";
    }, false);

    xhr.addEventListener("abort", function uploadCanceled(evt) {
        // progressBar.innerHTML = "<p>The upload has been cancelled by the user or the browser dropped the connection.</p>";
    }, false);

    xhr.open('POST', 'https://tilde-submissions.s3-eu-west-1.amazonaws.com/', true); //MUST BE LAST LINE BEFORE YOU SEND

    xhr.send(fd);
}
