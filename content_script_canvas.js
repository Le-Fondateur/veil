// content_script_canvas.js

(function() {
  // Override canvas.toDataURL to return a consistent, non-identifying value
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w+GDAAAmwFm3/4zYqAAAAABJRU5ErkJggg==';
  };

  // Override canvas.toBlob to return a consistent, non-identifying value
  const originalToBlob = HTMLCanvasElement.prototype.toBlob;
  HTMLCanvasElement.prototype.toBlob = function(callback, type, quality) {
    callback(new Blob([''], {type: 'image/png'}));
  };

  // Override canvas.getContext to prevent fingerprinting via context creation
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(contextType, ...args) {
    if (contextType === '2d' || contextType === 'webgl' || contextType === 'webgl2') {
      return null; // Or return a mock context
    }
    return originalGetContext.call(this, contextType, ...args);
  };
})();