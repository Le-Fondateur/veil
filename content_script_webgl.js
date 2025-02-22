// content_script_webgl.js

(function() {
  // Override WebGLRenderingContext.getParameter to return consistent values
  const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
  WebGLRenderingContext.prototype.getParameter = function(p) {
    if (p === this.UNMASKED_VENDOR_WEBGL || p === this.UNMASKED_RENDERER_WEBGL) {
      return 'Generic GPU';
    }
    if (p === this.VERSION) {
      return 'WebGL 1.0';
    }
    if (p === this.SHADING_LANGUAGE_VERSION) {
      return 'WebGL GLSL ES 1.0';
    }
    return originalGetParameter.call(this, p);
  };

  // Override WebGLRenderingContext.getSupportedExtensions to return a limited set
  const originalGetSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
  WebGLRenderingContext.prototype.getSupportedExtensions = function() {
    return []; // Return an empty array to disable extensions
  };
})();