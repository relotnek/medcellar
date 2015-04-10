window.Med = Backbone.Model.extend({

    urlRoot: "/meds",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.description = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a description"};
        };
        // add csrf for ajax requests
        // var CSRF_HEADER = 'X-CSRF-Token';
        // $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        //     options.xhrFields = {
        //         withCredentials: false
        //     };
        //     if (Backbone.CSRFToken) {
        //         jqXHR.setRequestHeader(CSRF_HEADER, Backbone.CSRFToken);
        //     }
        // });

        // // // CSRF - Method 2
        // // Backbone._sync = Backbone.sync;
        // // Backbone.sync = function(method, model, options, error) {
        // //     options.beforeSend = function(xhr) {
        // //         xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
        // //     };
        // //     /* proxy the call to the old sync method */
        // //     return Backbone._sync(method, model, options, error);
        // // };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        name: "No Name",
        classification: "Unclassified",
        description: "",
        picture: "genbottle.jpg",
        indication: "No Indications",
        directions: "No Directions",
        warnings: "No Warnings",
        interactions: "No Interactions",
        supply: "No Supply",
        isPrescription: false,
        price: 0
    }
});

window.MedCollection = Backbone.Collection.extend({

    model: Med,

    url: "/meds"

});