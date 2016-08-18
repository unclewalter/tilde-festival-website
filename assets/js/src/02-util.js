var readPDF = function(inputElement) {
  var deferred = $.Deferred();

  var files = inputElement.get(0).files;
  if (files && files[0]) {
    var fr = new FileReader();
    fr.onload = function(e) {
      deferred.resolve(e.target.result);
    };
    fr.readAsDataURL(files[0]);
  } else {
    deferred.resolve(undefined);
  }

  return deferred.promise();
}

var base64MimeType = function(encoded) {
  var result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}
