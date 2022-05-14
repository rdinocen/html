(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], () => factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.PluginNameHere = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (window) => {
    'use strict';

    var defaults = {
        selector: '.yourSelector',
        someDefaultOption: 'foo',
        classToAdd: "new-class-name"
    };
    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function (target, options) {
        var prop, extended = {};
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };

    /**
     * Helper Functions
     @private
        */
    var privateFunction = function () {
        // Helper function, not directly acessible by instance object
    };

    /**
     * Plugin Object
     * @param {Object} options User options
     * @constructor
     */
    class Plugin {
        constructor(options) {
            this.options = extend(defaults, options);
            this.init(); // Initialization Code Here
        }
        /**
         * Plugin prototype
         * @public
         * @constructor
         */
        init() {
            // find all matching DOM elements.
            // makes `.selectors` object available to instance.
            this.selectors = document.querySelectorAll(this.options.selector);
            for (var i = 0; i < this.selectors.length; i++) {
                var selector = this.selectors[i];
                // Do something w/ each matched selector node.
                selector.classList.add(this.options.classToAdd);
                // do something
            }
        }
        /**
         * Plugin prototype
         * @public
         * @constructor
         */
        destroy() {
            // Remove any event listeners and undo any "init" actions here...
        }
        /**
         * Plugin prototype
         * @public
         * @constructor
         */
        doSomething(someData) {
            console.log(someData);
        }
    }

    return Plugin;
});