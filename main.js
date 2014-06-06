/****************************************************************************
 User Interface Programming II - Doctor vs Bacteria Project
 Group 6
 - Yingjie Chen
 - Huimin Zhang
 - Sercan Caglarca
 - Ignatius Aries Kurniawan

 Spring 2014

 The game structure is composed of Scenes and Layers
 - SceneMain        : The main welcome menu
   - LayerMainBg    : Contains background image
   - LayerMainMenu  : Contains buttons
 - SceneGame        : In-game scene
   - LayerGameCharacter : Contains bacteria, doctors, medicine, and all logic between them
   - LayerGameCoffee    : Contains falling coffee and handles their collection
   - LayerGameMenu      : Contains pause button and HUD
 - SceneOption      : Option menu
   - LayerOptionBg  : Contains background image
   - LayerOptionMenu    : Contains volume controls, etc.
 - SceneAbout       : About page
   - LayerAboutBg   : Contains background image
 - SceneYouWin      : Appear when the game is won
 - SceneGameOver    : Appear when the game is lost
 ****************************************************************************/
var screenType;

var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        // cc.initDebugSetting();
        cc.setup(this.config['tag']); // cc.log("Cocos2d-html5-v2.2.2") aka engineversion is written here
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();
        cc.EGLView.getInstance()._adjustSizeToBrowser();
        var screenSize = cc.EGLView.getInstance().getFrameSize();
        var resourceSize = cc.size(960, 640);
        var designSize = cc.size(960, 640);

        var searchPaths = [];
        var resDirOrders = [];

        searchPaths.push("res");
        cc.FileUtils.getInstance().setSearchPaths(searchPaths);

        var platform = cc.Application.getInstance().getTargetPlatform();

        // Check the platform and select assets accordingly
        if (platform == cc.TARGET_PLATFORM.MOBILE_BROWSER) {
            resDirOrders.push("HD");
            screenType = 2;
        }
        else if (platform == cc.TARGET_PLATFORM.PC_BROWSER) {
            resDirOrders.push("HD");
            screenType = 2;
        }

        cc.FileUtils.getInstance().setSearchResolutionsOrder(resDirOrders);
        director.setContentScaleFactor(resourceSize.width / designSize.width);
        cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);
        cc.EGLView.getInstance().resizeWithBrowserSize(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            director.replaceScene(new this.startScene());
        }, this);
        return true;
    }
});

// The game starts with Main Scene
var myApp = new cocos2dApp(SceneMain);