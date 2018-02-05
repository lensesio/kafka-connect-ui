(function() {
  'use strict';

  var LINES = 15;

  /**
   * UI.Ace options factory service
   * @see {@link https://github.com/angular-ui/ui-ace}
   */
  angularAPP.service('uiAceOptionsFactoryService', UiAceOptionsFactoryService);

  function UiAceOptionsFactoryService() {
    var self = this;

    self.getOptions = getOptions;

    /**
     * Returns UI.Ace options
     * @param {Object} [options]
     * @returns {Object}
     */
    function getOptions(options) {
      return angular.extend({
        blockScrolling: Infinity,
        mode: 'json',
        onLoad: onAceLoad,
        showPrintMargin: false,
        useWrapMode: true,
      }, options);
    }

    /**
     * Handler called when Ace editor has been loaded
     * @param {Editor} editor Ace editor instance
     * @see {@link https://ace.c9.io/#nav=api&api=editor}
     */
    function onAceLoad(editor) {
      editor.$blockScrolling = Infinity;
      editor.setOptions({
        minLines: LINES,
        maxLines: LINES,
        highlightActiveLine: false
      });
    }
  }

})();
