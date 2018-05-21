var degToRad = Math.PI / 180.0;

var globalVariable ={
	globalTex: 'Main'
}

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	init(application) 
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(54.0/255, 81.0/255, 94.0/255, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.Light0=false; 
		this.Light1=false;  
		this.Light2=false; 
		this.Light3=false; 

		this.speed=3;
		
		this.Axis=true;
		
		this.texture='Main'; 

		this.altimetry= [[ 13.0 , 15.0 , 12.0, 11.0, 12.0, 13.0, 12.0, 13.0],
						[ 14.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 13.0],
						[ 13.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 12.0],
						[ 15.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 13.0],
						[ 13.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 12.0],
						[ 12.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 11.0],
						[ 13.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 14.0],
						[ 14.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 13.0],
						[ 13.0 , 15.0 , 13.0, 12.0, 13.0, 14.0, 13.0, 15.0]
						];

		// Scene elements
		this.ruler = 
		new MyQuad(this, 0, 1, 0, 1);
		this.terrain = new MyTerrain(this, 8 , this.altimetry);
		this.trap = new MyLongTrap(this, 0, 0, 0, 0);
		this.tractor = new MyVehicle(this);
		
		
		//Materials
		this.materialDefault = new CGFappearance(this);

		this.enableTextures(true);
		
		this.setUpdatePeriod(100);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0,0,0,1);

		// Lights positions

		//this.lights[0].setPosition(-2.2, 1, 1.3, 1);
		//this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		//this.lights[1].setPosition(-2.2, 1, 0.7, 1);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(-4, 4, 4, 1);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[3].setPosition(-1,5, 1, 1);
		this.lights[3].setVisible(true);

		// Properties
		
		/*this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1, 1, 0.5, 1.0);
		this.lights[0].setSpecular(1,1,0.5,1);
		this.lights[0].enable(this.Light0);

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1, 1, 0.5, 1.0);
		this.lights[0].setSpecular(1,1,0.5,1);
		this.lights[1].enable(this.Light1);
*/
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(0.2);
		this.lights[2].setQuadraticAttenuation(0);
	//	this.lights[2].enable(this.Light2);

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1,1,0,1);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
	//	this.lights[3].enable(this.Light3);
	};

	updateLights() 
	{
		this.lights[0].enable(this.Light0);
		this.lights[0].setVisible(this.Light0);
		this.lights[1].enable(this.Light1);
		this.lights[1].setVisible(this.Light1);
		this.lights[2].enable(this.Light2);
		this.lights[2].setVisible(this.Light2);
		this.lights[3].enable(this.Light3);
		this.lights[3].setVisible(this.Light3);
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}
	checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;

        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
		}
		
		if (this.gui.isKeyPressed("KeyA")) {
            text+=" A ";
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text+=" D ";
            keysPressed=true;
        }

        if (keysPressed) {
            console.log(text);
        }
    }

	display() 
	{
		// ---- BEGIN Background, camera and axis setup
		globalVariable.globalTex=this.texture;

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.Axis == true){
			this.axis.display();
		}
		this.checkKeys();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		/*// Ruler (to measure tractor)
		this.pushMatrix();
		this.rotate(-90 * degToRad, 0, 1, 0);
		this.scale(1,2,1);
		this.translate(0,1,0);
		this.ruler.display();
		this.popMatrix();*/
		

		// Terrain
		this.pushMatrix();
		this.terrain.display();
		this.popMatrix();

		// Vehicle
		this.pushMatrix();
		this.tractor.display();
		this.popMatrix();
		// ---- END Scene drawing section
	//this.tractor.updateWheels(currTime);
	};

	doSomething()
	{ console.log("Doing something..."); };
};
