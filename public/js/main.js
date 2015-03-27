var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "meds"	: "list",
        "meds/page/:page"	: "list",
        "meds/add"         : "addMed",
        "meds/:id"         : "medDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
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
        $('#content').html(new MedView({model: med}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'MedView', 'MedListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});