var degToRad = Math.PI / 180.0;


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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.terrain = new MyQuad(this,0,10,0,12);
		this.trap = new MyLongTrap(this, 0, 0, 0, 0);
		this.tractor = new MyTractor(this);
		//Materials
		/*Textures*/ 
		
		/*Material for the floor */
		this.terrainAppearance = new CGFappearance(this);
		this.terrainAppearance.loadTexture("../resources/images/terrain.png");
		this.terrainAppearance.setAmbient(0.1,0.1,0.1,1);
		this.terrainAppearance.setDiffuse(0.5,0.5,0.5,1);
		this.terrainAppearance.setSpecular(0.7,0.7,0.7,1);
		this.terrainAppearance.setShininess(120);

		this.tractorBodyAppearance = new CGFappearance(this);
		this.tractorBodyAppearance.loadTexture("../resources/images/tractor.png");
		this.tractorBodyAppearance.setAmbient(1,1,1,1);
		this.tractorBodyAppearance.setDiffuse(0.5,0.5,0.5,1);
		this.tractorBodyAppearance.setSpecular(0.7,0.7,0.7,1);
		this.tractorBodyAppearance.setShininess(120);

		this.enableTextures(true);
		
		this.materialDefault = new CGFappearance(this);
		
		this.Light0=true; 
		this.Light1=true;  
		this.Light2=true; 
		this.Light3=true; 
		this.speed=3;
		this.Axis=true;
		this.LightGR=0.2;
		this.LightGG=0.2;
		this.LightGB=0.2;
		this.Light0R=10;
		this.Light0G=1;
		this.Light0B=1;
		this.Light1R=1;
		this.Light1G=1;
		this.Light1B=1;
		this.Light2R=1;
		this.Light2G=1;
		this.Light2B=1;
		this.Light3R=1;
		this.Light3G=1;
		this.Light3B=1;

	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.2,0.2,0.2,1);
		//this.setGlobalAmbientLight(0,0,0,1);
		// Positions for four lights
		this.lights[0].setPosition(4, 4, 4, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)


		this.lights[1].setPosition(4, 4, -4, 1);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(-4, 4, 4, 1);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		
		
		this.lights[3].setPosition(-1,5, 1, 1);
		this.lights[3].setVisible(true);

		// Properties
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1, 1, 1, 1);
		this.lights[0].setSpecular(1,1,0,1);
		this.lights[0].enable(this.Light0);

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable(this.Light1);

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(0.2);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].enable(this.Light2);

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1,1,0,1);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].enable(this.Light3);
	};

	updateLights() 
	{
		if(this.Light0 == true)	this.lights[0].enable(); 
		else this.lights[0].disable();
		this.lights[0].setVisible(this.Light0);
		if(this.Light1 == true)	this.lights[1].enable(); 
		else this.lights[1].disable();
		this.lights[1].setVisible(this.Light1);
		if(this.Light2 == true)	this.lights[2].enable(); 
		else this.lights[2].disable();
		this.lights[2].setVisible(this.Light2);
		if(this.Light3 == true)	this.lights[3].enable(); 
		else this.lights[3].disable();
		this.lights[3].setVisible(this.Light3);
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	display() 
	{
		// ---- BEGIN Background, camera and axis setup

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
		

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Terrain
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(30, 30, 0.2);
			this.terrainAppearance.apply();
			this.terrain.display();
		this.popMatrix();

		this.pushMatrix();
		//this.tractorBodyAppearance.apply();
		this.tractor.display();
		this.popMatrix();
		// ---- END Scene drawing section
	};

	update(currTime)
	{
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;

		this.lastTime = currTime;

		this.clock.update(this.deltaTime);

		this.tractor.update(this.deltaTime);
		
		if(this.deltaTime <= 1000)
		this.plane.update(this.deltaTime);

	}

	doSomething()
	{ console.log("Doing something...");
	console.log(this.Light0R) };
};
