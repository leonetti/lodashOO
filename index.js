/**
 * Marketplace - Stub
 * Stub for building object based components
 * @author David Gilder
 *
 * Dependencies:
 * jQuery, lodash
 *
 * MP.Stub - Class
 *
 * This is a basic object example that:
 *   Defines a constructor for the object that accpets a config object and defines defaults.
 *   Adds prototype methods for:
 *     getDOMRefs      - Obtaining references to DOM elements
 *     buildTemplates  - Building template processors
 *     callEndpoint    - Requesting data from a standard API endpoint
 *     handlerResponse - Handling the standard endpoint response in a standard way
 *     processResult   - Populating container element with processed result
 *
 *
 * Examples:
 *
 *   // Use defaults
 *   var a_stub = new Stub();
 *
 *   // Pass in config
 *   var a_stub = new Stub({
 *     urls: {'zr_earnings': '/marketplace/v1/org/0ae8fe40/earnings-summary'},
 *     templates: {'main': '[data-template="mp_stub_main"]'},
 *     selectors: {'my_container': '.myContainer';},
 *   });
 *
 */
(function ( $, _ ) {
  'use strict';
;(function ( Stub, undefined ) {
  /**
   * Constructor for Stub object example
   *
   * Options:
   *
   * @param   {Object}      options                                 Optional config object
   * @param   {Object}      options.urls                            Object keyed with url name to url value
   * @param   {Object}      options.selectors                       Object keyed with selector name to selector value
   * @param   {Object}      options.templates                       Object keyed with templates name to selector value
   *
   * @returns {Stub}
   */
  Stub = function(options) {
    this.cfg = _.extend({                           // Extend our default config object with the options passed in (passed values overwrite, not merge)
      urls: {
        'zr_earnings': '/marketplace/v1/org/0ae8fe40/earnings-summary',   // Default example URI for the ZR org
      },
      selectors: {
        'container': '#stub_container',
      },
      templates: {
        'main': '[data-template="mp_stub_main"]',
      },
    }, options);

    // Get Stub.$dom references
    this.getDOMRefs();

    // Build template parsers
    this.buildTemplates();

    // Call the endpoint
    this.callEndpoint();

    // ... Subsequent init or call something interesting ...
  };

  /**
   * Get/update this.$dom with configured jQuery references
   *
   * @returns {Null}
   */
  Stub.prototype.getDOMRefs = function() {
    this.$dom = this.$dom || {};
    _.forOwn(this.cfg.selectors, function(selector, name) {
      this.$dom[name] = $(selector);

      // Display an error if we didn't match an element
      if (!this.$dom[name].length) {
        alert('Element not found');
      }
    }.bind(this));
  };

  /**
   * Build/update this.templates with configured template selectors
   *
   * @returns {Object}
   */
  Stub.prototype.buildTemplates = function() {
    this.templates = this.templates || {};
    _.forOwn(this.cfg.templates, function(selector, name) {
      var $el = $(selector);

      if ($el.length) {
        this.templates[name] = _.template($el.html());
      } else {
        alert('Element not found');
      }
    }.bind(this));
  };

  /**
   * Call the endpoint, if successful pass data to handler, otherwise display an error
   *
   * @returns {Null}
   */
  Stub.prototype.callEndpoint = function() {
    $.getJSON(this.cfg.urls.zr_earnings, {}).done(this.handlerResponse.bind(this)).error(function(){
      alert('An Error Occurred.');
    });
  };

  /**
   * Handle the reponse from the endpoint
   *
   * @returns {Null}
   */
  Stub.prototype.handlerResponse = function(data) {
    // The default response handler will check for standard error content and notify if any are found

    // HANDLE RESPONSE HERE THEN PROCESS RESULT
    this.processResult(data);
  };

  /**
   * Process the resulting data from a successfull call to the endpoint
   *
   * @returns {Null}
   */
  Stub.prototype.processResult = function(result) {
    if (_.isObject(result)) {
      // If the container exists, populate the template with the result and replace the container contents
      if (this.$dom.container.length) {
        this.$dom.container.html(this.templates.main(result));
      }
    }
  };

})(window.Stub = window.Stub || {});
})(window.jQuery, window._);
