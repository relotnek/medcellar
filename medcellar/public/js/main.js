var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "meds"              : "list",
        "meds/page/:page"	: "list",
        "meds/add"          : "addMed",
        "meds/:id"          : "medDetails",
        "about"             : "about",
        "login"             : "login",
        "register"          : "register",
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);

        /*
        Backbone._sync = Backbone.sync;
        // override original sync method to make header request contain csrf token
        Backbone.sync = function(method, model, options, error){
            options.beforeSend = function(xhr){
                xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-param']").attr('content'));
            };
            return Backbone._sync(method, model, options, error);
        };
        */
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var medList = new MedCollection();
        medList.fetch({success: function(){
            $("#content").html(new MedListView({model: medList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    medDetails: function (id) {
        var med = new Med({_id: id});
        med.fetch({success: function(){
            $("#content").html(new MedView({model: med}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addMed: function() {
        var med = new Med();
        med.fetch({success: function(){
            $("#content").html(new MedView({model: med}).el);
        }});
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

    login: function() {
        if (!this.loginView) {
            this.loginView = new LoginView();
        }
        $('#content').html(this.loginView.el);
        $('#csrf').html("<input type=hidden name=_csrf value=" + Backbone.CSRFToken + "></input>");
    },

    register: function() {
        if (!this.registerView) {
            this.registerView = new RegisterView();
        }
        $('#content').html(this.registerView.el);
        $('#csrf').html("<input type=hidden name=_csrf value=" + Backbone.CSRFToken + "></input>");
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'MedView', 'MedListItemView', 'AboutView','LoginView', 'RegisterView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});