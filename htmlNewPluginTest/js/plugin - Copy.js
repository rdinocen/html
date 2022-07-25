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
        // Attributes
        resizeMode: 'fit',
        gripDragClass: '',
        gripInnerHtml: '',
        
        minWidth: 40,
        maxWidth: null,

        store: null,

        // Custom Events
        emitEvents: true,

        // Callbacks
        onDrag: null,
        onResize: null
    };


    class PointerData {
        constructor() {
            this.x = null;
            this.isDoubleClick = false;
        }
    }

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
    var privateFunction = function (prefix) {
        // Helper function, not directly acessible by instance object
        console.log(prefix);
        console.log(this.options);
    };

    /**
     * Plugin Object
     * @param {Object} options User options
     * @constructor
     */
    class Plugin {
        hi ='hi';

        constructor(table, options) {
            this.table = table
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
            console.log(this.table)
            console.log(someData);
        }

        doSomething2() {
            privateFunction.call(this, ">>");
        }
    }

    return Plugin;
});