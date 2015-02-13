var H5P = H5P || {};

/**
 * Standard Page module
 * @external {jQuery} $ H5P.jQuery
 */
H5P.StandardPage = (function ($) {
  // CSS Classes:
  var MAIN_CONTAINER = 'h5p-standard-page';

  /**
   * Initialize module.
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @returns {Object} StandardPage StandardPage instance
   */
  function StandardPage(params, id) {
    this.$ = $(this);
    this.id = id;

    // Set default behavior.
    this.params = $.extend({}, {
      taskDescription: 'Title',
      elementList: [],
      helpText: 'Help text'
    }, params);
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  StandardPage.prototype.attach = function ($container) {
    var self = this;
    this.$inner = $container.addClass(MAIN_CONTAINER);
    this.pageInstances = [];

    this.params.elementList.forEach(function (element) {
      var $elementContainer = $('<div>', {
      }).appendTo(self.$inner);

      var elementInstance = H5P.newRunnable(element, self.id);
      elementInstance.attach($elementContainer);

      self.pageInstances.push(elementInstance);
    });
  };

  /**
   * Retrieves input array.
   */
  StandardPage.prototype.getInputArray = function () {
    var inputArray = [];
    this.pageInstances.forEach(function (elementInstance) {
      if (elementInstance instanceof H5P.TextInputField) {
        inputArray.push(elementInstance.getInput());
      }
    });

    return inputArray;
  };

  return StandardPage;
})(H5P.jQuery);