/**
 * Default Options
 */
export default {
  /**
   * URL where the file will be send
   */
  uploadUrl: 'upload_attachment.php',

  /**
   * Which method will be used to send the file to the upload URL
   */
  uploadMethod: 'POST',

  /**
   * Name in which the file will be placed
   */
  uploadFieldName: 'file',

  /**
   * Extension which will be used when a file extension could not
   * be detected
   */
  defaultExtension: 'png',

  /**
   * JSON field which refers to the uploaded file URL
   */
  jsonFieldName: 'filename',

  /**
   * Allowed MIME types
   */
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif'
  ],

  /**
   * Text which will be inserted when dropping or pasting a file.
   * Acts as a placeholder which will be replaced when the file is done with uploading
   */
  progressText: '![Uploading file...]()',

  /**
   * When a file has successfully been uploaded the progressText
   * will be replaced by the urlText, the {filename} tag will be replaced
   * by the filename that has been returned by the server
   */
  urlText: "![file]({filename})",

  /**
   * Text which will be used when uploading has failed
   */
  errorText: "Error uploading file",

  /**
   * Extra parameters which will be send when uploading a file
   */
  extraParams: {},

  /**
   * Extra headers which will be send when uploading a file
   */
  extraHeaders: {},

  /**
   * Before the file is send
   */
  beforeFileUpload: function() {
    return true;
  },

  /**
   * Triggers when a file is dropped or pasted
   */
  onFileReceived: function() {},

  /**
   * Custom upload handler
   *
   * @return {Boolean} when false is returned it will prevent default upload behavior
   */
  onFileUploadResponse: function() {
    return true;
  },

  /**
   * Custom error handler. Runs after removing the placeholder text and before the alert().
   * Return false from this function to prevent the alert dialog.
   *
   * @return {Boolean} when false is returned it will prevent default error behavior
   */
  onFileUploadError: function() {
    return true;
  },

  /**
   * When a file has succesfully been uploaded
   */
  onFileUploaded: function() {}
}