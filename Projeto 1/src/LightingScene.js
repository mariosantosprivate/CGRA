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

		this.Light0=true; 
		this.Light1=true;  
		this.Light2=true; 
		this.Light3=true; 
		this.speed=3;
		this.fall=0;
		this.Axis=false;
		
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
		this.prevTime = 1000;
		new MyQuad(this, 0, 1, 0, 1);
		this.terrain = new MyTerrain(this, 8 , this.altimetry);
		this.trap = new MyLongTrap(this, 0, 0, 0, 0);
		this.tractor = new MyVehicle(this);
		this.pickUpZone = new MyCube(this);
		this.crane = new MyCrane(this, -5, 0, -5);
		this.pillar = new MyCylinder(this,40,40);
		this.pillarTop = new MyCircle(this,40);
		this.pillarBottom = new MyCircle(this,40);

		//Materials
		this.materialDefault = new CGFappearance(this);

		this.bodyPillar = new CGFappearance(this);
        this.bodyPillar.loadTexture('../resources/images/tractorface.png');
		this.bodyPillar.setAmbient(1,1,1,1);
		this.bodyPillar.setDiffuse(0.6,0.6,0.6,1);
		this.bodyPillar.setSpecular(0.8,0.8,0.8,1);	
		this.bodyPillar.setShininess(200);

		this.enableTextures(true);
		
		this.setUpdatePeriod(16);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.5,0.5,0.5,1);

		// Lights positions

		this.lights[0].setPosition(-2.2, 20, 1.3, 1);
		this.lights[1].setPosition(-2.2, 20, 0.7, 1);
		this.lights[2].setPosition(-4, 20, 4, 1);
		this.lights[3].setPosition(-1,20, 1, 1);

		// Properties
		
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1, 1, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0.5,1);

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1, 1, 1.0, 1.0);
		this.lights[1].setSpecular(1,1,0.5,1);

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1);
		this.lights[2].setSpecular(0.5,0.5,1,1);

		this.lights[3].setAmbient(0.3, 0.3, 0.3, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(0.5,0.5,0.5,1);
	};

	updateLights() 
	{
		if(this.Light0) 
			this.lights[0].enable();
		else 
			this.lights[0].disable();
		if(this.Light1) 
			this.lights[1].enable();
		else 
			this.lights[1].disable();
		if(this.Light2) 
			this.lights[2].enable();
		else 
			this.lights[2].disable();
		if(this.Light3) 
			this.lights[3].enable();
		else 
			this.lights[3].disable();
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}
	checkKeys() {
        var text="Keys pressed: ";
		var keysPressed=false;
		
		/* TRACTOR */

		var pressingW = false;
		var pressingS = false;
		var pressingA = false;
		var pressingD = false;

        if (this.gui.isKeyPressed("KeyW")) {
			text+=" W ";
			pressingW = true;			
			//text+="Rot: " + this.tractor.frontWheels.rotationAngle;
			text+="AngleT " + this.tractor.angle;
			text+="Angle " + this.tractor.frontWheels.rotationAngle;
			this.tractor.accelerate(this.speed*3);
		}

		if (this.gui.isKeyPressed("KeyS")) {
			text+=" S ";
			pressingS=true;			
			this.tractor.deccelerate(this.speed*3)
        }
		
		if (this.gui.isKeyPressed("KeyA")) {
			text+=" A ";
			pressingA=true;
			this.tractor.frontWheels.turnLeft(0.1);
        }



        if (this.gui.isKeyPressed("KeyD")) {
			text+=" D ";
			pressingD=true;
			this.tractor.frontWheels.turnRight(0.1);
		}
		
		if(pressingA == false && pressingD == false && this.tractor.frontWheels.rotationAngle > 0.05)
		this.tractor.frontWheels.turnRight(0.03);
		else if(pressingA == false && pressingD == false && this.tractor.frontWheels.rotationAngle < -0.05)
		this.tractor.frontWheels.turnLeft(0.03);

		/*if(pressingW == false && pressingS == false && this.tractor.speed > 0.05)
		this.tractor.speed -= 0.1;
		else if(pressingW == false && pressingS == false && this.tractor.speed < -0.05)
		this.tractor.speed += 0.1;*/

		/* CRANE */

		if (this.gui.isKeyPressed("KeyR")) {
			text+=" R ";
			this.tractor.resetVehicle();
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyL")) {
			text+=" L ";
			this.crane.rotateRight(0.2*this.speed);
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyJ")) {
			text+=" J ";
			this.crane.rotateLeft(0.2*this.speed);
            keysPressed=true;
        }

		if (this.gui.isKeyPressed("KeyI")) {
			text+=" I ";
			this.crane.rotateUp(0.2*this.speed);
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyK")) {
			text+=" K ";
			this.crane.rotateDown(0.2*this.speed);
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyP")) {
			text+=" P ";
			this.crane.resetCrane();
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

		// Crane
		this.pushMatrix();
		this.crane.display();
		this.popMatrix();

		// Terrain
		this.pushMatrix();
		this.terrain.display();
		this.popMatrix();

		// Vehicle
		this.pushMatrix();
		this.translate(10,0,10);
		this.tractor.display();
		this.popMatrix();



		// Pickup Zone
		this.pushMatrix();
		this.translate(1.5, 0, 25);
		this.scale(5,0.2,5);
		this.pickUpZone.display();
		this.popMatrix();

		// Pillar
		this.pushMatrix();
		this.translate(25, 2, 25);
		this.rotate(Math.PI/2,1,0,0);
		this.scale(2,2,5);
		this.bodyPillar.apply();
		this.pillar.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(25, 4.2, 25);
		this.rotate(Math.PI/2,-1,0,0);
		this.scale(2,2,5);
		this.bodyPillar.apply();
		this.pillarTop.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(25, -0.7, 25);
		this.rotate(Math.PI/2,1,0,0);
		this.scale(2,2,5);
		this.bodyPillar.apply();
		this.pillarTop.display();
		this.popMatrix();

		// ---- END Scene drawing section


		if(this.tractor.x > -10 && this.tractor.x < -8 && this.tractor.z > 15 && this.tractor.z < 19 ){
			this.tractor.stucky = true;
		}
		if(this.tractor.stucky){
			
			this.tractor.x = this.crane.mx;
			this.tractor.y = 0.5+10.5*this.crane.my;
			this.tractor.z = this.crane.mz-10;
			this.tractor.speed = 0;
			this.tractor.angle = 0;
			if(this.crane.verticalAngle < 1) this.crane.rotateUp(0.05*this.speed);
			if(this.crane.horizontalAngle > -6)this.crane.rotateRight(0.1*this.speed);
			if(this.crane.verticalAngle >= 1 && this.crane.horizontalAngle <= -6) {
				if(this.fall < 10) this.fall++;
				else if(this.fall < 30) this.fall+=2;
				else if(this.fall < 50) this.fall+=4;
				else if(this.fall < 80) this.fall+=8;
				else {
					this.fall = 80;
					this.tractor.resetVehicle2();
				}
				if(this.tractor.y > 0.05) this.tractor.fall(this.fall);
			}
			else this.tractor.y = 0.5+10.5*this.crane.my;
		} else {
			this.fall = 0;
			if(this.crane.verticalAngle > 0) this.crane.rotateDown(0.05*this.speed);
			if(this.crane.horizontalAngle < 0)this.crane.rotateLeft(0.1*this.speed);
		}
		
		var text = "X: ";
		text += this.tractor.x;
		text += " Z: ";
		text += this.tractor.z;
		text += " VA: ";
		text += this.crane.verticalAngle;
		text += " HA: ";
		text += this.crane.horizontalAngle;
		text += " Fall: ";
		text += this.fall;
		text += " Stucky:"
		text += this.stucky;
		//console.log(text);

	
	};
	update(currTime){
		let delta = currTime - this.prevTime;
		this.prevTime = currTime;

		this.checkKeys();
		this.tractor.update(delta);

	};

	Instructions()
	{ 
	console.log("Press W to go forward. Press S to go back."); 
	console.log("Press A to rotate left. Press D to rotate right.");
	console.log("Press R to reset the tractor's positon.");
	};
};
