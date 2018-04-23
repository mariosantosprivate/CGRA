var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

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
		this.table = new MyTable(this);
		this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
		this.floor = new MyQuad(this,0,10,0,12);
		this.prism = new MyPrism(this, 8, 20);
		this.cylinder = new MyCylinder(this, 8, 20);
		this.lamp = new MyLamp(this, 100, 100);
		this.boardA = new Plane(this, BOARD_A_DIVISIONS, 0, 1, 0, 1);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
		this.clock = new MyClock(this);
		this.plane = new MyPaperPlane(this, 14, 4, 8);
		// Materials
		
		/*Textures*/ 
		this.enableTextures(true);
		
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);

		/* Material for the walls */
		this.walls = new CGFappearance(this);
		this.walls.setAmbient(0.125,0.112,0.08375,1);
		this.walls.setDiffuse(0.6,0.3,0.1,1);
		this.walls.setSpecular(0.5,0.447,0.335,1);
		this.walls.setShininess(120);

		/*Material for the floor */
		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.setAmbient(0.1,0.1,0.1,1);
		this.floorAppearance.setDiffuse(0.5,0.5,0.5,1);
		this.floorAppearance.setSpecular(0.7,0.7,0.7,1);
		this.floorAppearance.setShininess(120);
		
		/* Materials left wall */
		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setAmbient(0.125,0.112,0.08375,1);
		this.windowAppearance.setDiffuse(0.25,0.224,0.1675,1);
		this.windowAppearance.setSpecular(0.5,0.447,0.335,1);
		this.windowAppearance.setShininess(120);

		this.slideAppearance = new CGFappearance(this);
		this.slideAppearance.loadTexture("../resources/images/slides.png");
		this.slideAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.slideAppearance.setSpecular(0.3,0.3,0.3,1);
		this.slideAppearance.setShininess(50);
	
		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.setDiffuse(0.2,0.2,0.2,1);
		this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
		this.boardAppearance.setShininess(200);

		this.clockAppearance = new CGFappearance(this);
		this.clockAppearance.loadTexture("../resources/images/clock.png");
		this.clockAppearance.setDiffuse(0.5,0.5,0.5,1);
		this.clockAppearance.setSpecular(0.5,0.5,0.5,1);
		this.clockAppearance.setShininess(200);

		this.paperPlane = new CGFappearance(this,14,4,8);
		this.paperPlane.setDiffuse(1.0,1.0,1.0,1);
		this.paperPlane.setSpecular(0.5,0.5,0.5,1);
		this.paperPlane.setAmbient(1.0,1.0,1.0,1);
		this.paperPlane.setShininess(200);

		this.setUpdatePeriod(100)

	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.5,0.5,0.5,1);
		//this.setGlobalAmbientLight(0,0,0,1);
		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(false); // show marker on light position (different from enabled)


		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(false); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(false); // show marker on light position (different from enabled)
		
		
		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(false);
		this.lights[3].enable(true);

		// Properties
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0,1);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(0.2);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1,1,0,1);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].enable();
	};

	updateLights() 
	{
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
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
			this.floorAppearance.apply();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.windowAppearance.apply();
			this.wall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.walls.apply();
			this.wall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);			
			this.boardAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slideAppearance.apply();
		this.boardB.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(7, 7, 7);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.lamp.display();
		this.popMatrix();

		// Clock
		this.pushMatrix();
		this.boardAppearance.apply();
		this.translate(7.25, 7.25, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.clock.display();
		this.popMatrix();

		// Plane
		this.pushMatrix();
			this.paperPlane.apply();
			this.plane.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};

	update(currTime)
	{
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;

		this.lastTime = currTime;

		this.clock.update(this.deltaTime);

		if(this.deltaTime <= 1000)
		this.plane.update(this.deltaTime);

	}
};
