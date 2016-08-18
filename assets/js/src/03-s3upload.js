var uploads = [];
var submitButton = document.getElementById('submit-button');

function uploadFile(file, name, email, kind, date) {
    var fd = new FormData();

    console.log("Upload");

    var key = "uploads/" + date + "_" + email + "_" + name + "/${filename}";


    // Populate the Post parameters.
    fd.append('key', key);
    fd.append('AWSAccessKeyId', 'AKIAJSK33JUGBWFOZ2YQ');
    fd.append('acl', 'private');
    fd.append('policy', "eyJleHBpcmF0aW9uIjogIjIwMTYtMjQtMDFUMDA6MDA6MDBaIiwgICJjb25kaXRpb25zIjogWyAgICAgeyJidWNrZXQiOiAidGlsZGUtZml4ZWQtbWVkaWEtMiJ9LCAgICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgInVwbG9hZHMvIl0sICAgIHsiYWNsIjogInByaXZhdGUifSwgICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLCAgXX0=");
    fd.append('signature', "1NwsqVGnXDX5PYoixDZc9XH7R2o=");
    fd.append('content-type', '');
    fd.append("file", file);

    var xhr = new XMLHttpRequest();

    var progressBar = document.getElementById('progress-bar-' + kind);

    uploads.push(false);

    var uploadsIndex = uploads.length - 1;

    xhr.upload.addEventListener("progress", function(evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.ceil(evt.loaded * 100 / evt.total);
            progressBar.innerHTML = "<p>" + percentComplete.toString() + '%</p>';
            progressBar.style.width = percentComplete.toString() + '%';
        } else {
            progressBar.innerHTML = "<p>unable to compute</p>";
        }
    }, false);

    submitButton.innerHTML = 'Uploading...';  
    submitButton.disabled = true;


    xhr.addEventListener("load", function(evt) {
        /* This event is raised when the server send back a response */
        progressBar.innerHTML = "<p>Done! " + evt.target.responseText + "</p>";

        uploads[uploadsIndex] = true;

        var done = true;
        for (var i = 0; i < uploads.length; i++) {
          if (!uploads[i]) {
            done = false;
          }
        }

        if (done) {
          submitButton.innerHTML = "Submission successful!";
        }

    }, false);

    xhr.addEventListener("error", function(evt) {
        progressBar.innerHTML = "<p>There was an error attempting to upload the file." + evt + "</p>";
    }, false);

    xhr.addEventListener("abort", function uploadCanceled(evt) {
        progressBar.innerHTML = "<p>The upload has been cancelled by the user or the browser dropped the connection.</p>";
    }, false);

    xhr.open('POST', 'https://tilde-fixed-media-2.s3-eu-west-1.amazonaws.com/', true); //MUST BE LAST LINE BEFORE YOU SEND 

    xhr.send(fd);
}

function submit() {
    var soundfile = document.getElementById('soundfile').files[0];
    // var biofile   = document.getElementById('biofile').files[0];
    var name      = document.getElementById('name').value.replace(/ /g, '-').toLowerCase();
    var email     = document.getElementById('email').value.toLowerCase();
    var now       = Date.now().valueOf();

    console.log($("#media-upload-form").validate());

    uploadFile(soundfile, name, email, "sound", now);
    // uploadFile(biofile, name, email, "bio", now);
};