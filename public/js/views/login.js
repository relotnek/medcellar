window.LoginView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click .login"   : "goLogin",
        "click .cancel" : "goHome",
    },

    goLogin: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveMed();
        return false;
    },

    goHome: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                app.navigate('meds', false);
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    }

});