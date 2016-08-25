---
layout: page
title: Fixed Media Submission
permalink: /fixed-media/
---

<div class="form-container">
  <form id="media-upload-form" enctype="multipart/form-data" method="post">
    <div class="row">
      <input type="text" id="name" placeholder="name.." data-validate="required" />
      <input type="email" id="email" placeholder="email.." data-validate="email,required" />
    </div>
    <div class="row">
      <label for="soundfile">Sound file</label>
      <input type="file" name="soundfile" id="soundfile" data-validate="required" />

      <div class="progress-bar-indication">
        <span id="progress-bar-sound" class="meter" style="width: 0%">
            <p>&nbsp;</p>
          </span>
      </div>
    </div>
    <div id="fileName"></div>
    <div id="fileSize"></div>
    <div id="fileType"></div>
  </form>
  <br />
  <div class="row">
    <button onclick="submit()" id="submit-button" value="Upload">Submit</button>
  </div>
</div>
