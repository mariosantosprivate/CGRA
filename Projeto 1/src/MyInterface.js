 
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	 initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
		}
		processKeyDown(event) {
			this.activeKeys[event.code]=true;
		};
		processKeyUp(event) {
			this.activeKeys[event.code]=false;
		};
		isKeyPressed(keyCode) {
			return this.activeKeys[keyCode] || false;
		};


	init(application) {
		super.init(application);

		this.gui = new dat.GUI();

		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

		this.gui.add(this.scene, 'doSomething');	

		var Lgroup=this.gui.addFolder("Lights");
		//Lgroup.open();

		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// e.g. this.option1=true; this.option2=false;

		Lgroup.add(this.scene, 'Light0');
		Lgroup.add(this.scene, 'Light1');
		Lgroup.add(this.scene, 'Light2');
		Lgroup.add(this.scene, 'Light3');

		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

		this.gui.add(this.scene, 'texture', [ 'Main', 'Red', 'Cow', 'Face' ] );
		this.gui.add(this.scene, 'speed', -5, 5);
		this.gui.add(this.scene, 'Axis');
		this.initKeys();
		return true;
	}
}


