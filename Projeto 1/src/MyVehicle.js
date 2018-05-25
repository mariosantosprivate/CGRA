/* 
* MyTractor
*/
var degToRad = Math.PI / 180.0;
var moving = 0;

class MyVehicle extends CGFobject
{
    constructor(scene, x, y, z)
    {
        super(scene);

        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;

        this.tractorAngle = 0.0000000001;
        this.tractorAngleT = 0.0000000001;
        this.bodyAngle= 0.0;
        this.angle = 0.0;
        this.speed = 0.0;

        this.moveLeft = 0;
        this.moveRight = 0;
        this.leftEngineBay = new MyLongTrap(this.scene);
        this.rightEngineBay = new MyLongTrapMirror(this.scene);
        this.side = new MyTrap(this.scene);
        this.front = new MyQuad(this.scene);
        this.light = new MyHalfSphere(this.scene, 100, 100);
        this.sideWindow = new MyQuad(this.scene);
        this.backWheels = new MyWheel(this.scene);
        this.frontWheels = new MyWheel(this.scene);
        // Materials

        this.materialDefault = new CGFappearance(this.scene);
        
        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.loadTexture('../resources/images/tractor.png');
		this.bodyAppearance.setAmbient(1,1,1,1);
		this.bodyAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.bodyAppearance.setSpecular(0.8,0.8,0.8,1);	
		this.bodyAppearance.setShininess(200);

		this.bodyAppearanceRed = new CGFappearance(this.scene);
        this.bodyAppearanceRed.loadTexture('../resources/images/tractorred.png');
		this.bodyAppearanceRed.setAmbient(1,1,1,1);
		this.bodyAppearanceRed.setDiffuse(0.6,0.6,0.6,1);
		this.bodyAppearanceRed.setSpecular(0.8,0.8,0.8,1);	
		this.bodyAppearanceRed.setShininess(200);

		this.bodyAppearanceCow = new CGFappearance(this.scene);
        this.bodyAppearanceCow.loadTexture('../resources/images/tractorcow.png');
		this.bodyAppearanceCow.setAmbient(1,1,1,1);
		this.bodyAppearanceCow.setDiffuse(0.6,0.6,0.6,1);
		this.bodyAppearanceCow.setSpecular(0.8,0.8,0.8,1);	
		this.bodyAppearanceCow.setShininess(200);

		this.bodyAppearanceFace = new CGFappearance(this.scene);
        this.bodyAppearanceFace.loadTexture('../resources/images/tractorface.png');
		this.bodyAppearanceFace.setAmbient(1,1,1,1);
		this.bodyAppearanceFace.setDiffuse(0.6,0.6,0.6,1);
		this.bodyAppearanceFace.setSpecular(0.8,0.8,0.8,1);	
		this.bodyAppearanceFace.setShininess(200);

        this.fenderAppearance = new CGFappearance(this.scene);
        this.fenderAppearance.loadTexture('../resources/images/tractor.png');

        this.tireAppearance = new CGFappearance(this.scene);
        this.tireAppearance.loadTexture('../resources/images/tire2.png');

        this.wheelAppearance = new CGFappearance(this.scene);
        this.wheelAppearance.loadTexture('../resources/images/wheel.png');

        this.grillAppearance = new CGFappearance(this.scene);
        this.grillAppearance.loadTexture('../resources/images/grill.png');

        this.windowAppearance = new CGFappearance(this.scene);
        this.windowAppearance.loadTexture('../resources/images/window.png');
		this.windowAppearance.setAmbient(0.2,0.6,1,1);
		this.windowAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.windowAppearance.setSpecular(0.8,0.8,0.8,1);	
        this.windowAppearance.setShininess(200);
       
        this.hoodAppearance = new CGFappearance(this.scene);
		this.hoodAppearance.setAmbient(0.1,0.1,0.1,1);
		this.hoodAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.hoodAppearance.setSpecular(0.8,0.8,0.8,1);	
        this.hoodAppearance.setShininess(200);
        
        this.lightAppearance = new CGFappearance(this.scene);
		this.lightAppearance.setAmbient(0.9,0.9,0.5,1);
		this.lightAppearance.setDiffuse(0.9,0.9,0.5,1);
		this.lightAppearance.setSpecular(0.9,0.9,0.5,1);	
        this.lightAppearance.setShininess(200);
        this.initLights();
    };
    initLights() 
	{
    this.scene.setGlobalAmbientLight(0.1,0.1,0.1,1);

    // Lights positions
    // Front
    this.scene.lights[0].setPosition(-2.2, 1, 1.3, 1);
    this.scene.lights[0].setVisible(false); // show marker on light position (different from enabled)

    this.scene.lights[1].setPosition(-2.2, 1, 0.7, 1);
    this.scene.lights[1].setVisible(false); // show marker on light position (different from enabled)
   /* // Back
    this.scene.lights[2].setPosition(3, 1, 1.3, 1);
    this.scene.lights[2].setVisible(false); // show marker on light position (different from enabled)

    this.scene.lights[3].setPosition(2.2, 1, 0.7, 1);
    this.scene.lights[3].setVisible(false); // show marker on light position (different from enabled)
    */
    // Properties
    // Front
    this.scene.lights[0].setAmbient(0.2, 0.2, 0.1, 1);
    this.scene.lights[0].setDiffuse(1, 1, 0.5, 1.0);
    this.scene.lights[0].setSpecular(1,1,0.5,1);
    //this.scene.lights[0].enable(this.Light0);

    this.scene.lights[1].setAmbient(0.2, 0.2, 0.1, 1);
    this.scene.lights[1].setDiffuse(1, 1, 0.5, 1.0);
    this.scene.lights[1].setSpecular(1,1,0.5,1);
    //this.scene.lights[1].enable(this.Light1);
    /* 
    // Back
     this.scene.lights[2].setAmbient(0.2, 0, 0, 1);
     this.scene.lights[2].setDiffuse(1, 1, 0.5, 1.0);
     this.scene.lights[2].setSpecular(1,1,0.5,1);
     //this.scene.lights[0].enable(this.Light0);
 
     this.scene.lights[3].setAmbient(0.2, 0, 0, 1);
     this.scene.lights[3].setDiffuse(1, 0, 0, 1.0);
     this.scene.lights[3].setSpecular(1, 0, 0,1);
     //this.scene.lights[1].enable(this.Light1);
*/
    
}

updateLights() 
{
    this.scene.lights[0].enable(this.Light0);
    this.scene.lights[0].setVisible(this.Light0);
    this.scene.lights[1].enable(this.Light1);
    this.scene.lights[1].setVisible(this.Light1);
  /*  this.scene.lights[2].enable(this.Light1);
    this.scene.lights[2].setVisible(this.Light1);
    this.scene.lights[3].enable(this.Light1);
    this.scene.lights[3].setVisible(this.Light1);*/
    for (var i = 0; i < this.scene.lights.length; i++)
        this.scene.lights[i].update();
}

	


    display()
    {
        this.scene.pushMatrix();
		this.scene.translate(0,0,-1);	
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle*degToRad, 0, 1, 0);
        
                // Left Front Wheel
                
                this.scene.pushMatrix();
                    this.scene.scale(0.6,0.6,0.6);
                    this.scene.translate(-2.2,1.1,3.5);
                    this.frontWheels.display();
                this.scene.popMatrix();
                
                // Right Front Wheel
                this.scene.pushMatrix();
                    this.scene.scale(0.6,0.6,0.6);
                    this.scene.translate(-2.2,1.1,-0.3);
                    this.frontWheels.display();
                this.scene.popMatrix();
            

				// Left Back Wheel
				this.scene.pushMatrix();
					this.scene.translate(1,1.1,2);
					this.backWheels.display();
				this.scene.popMatrix();
                            
				// Right Back Wheel
				this.scene.pushMatrix();
					this.scene.translate(1,1.1,-0.1);
					this.backWheels.display();
				this.scene.popMatrix(); 

        //Engine Bay
           
            this.texhere = globalVariable.globalTex;
            //Right Engine Bay
            this.scene.pushMatrix();
				//ligeiro offset para evitar "z fighting"
				this.scene.translate(0,0.5,0.01);
				this.scene.scale(2,1,0);
				this.scene.translate(0,0.9,0);
				if(this.texhere == 'Cow') this.bodyAppearanceCow.apply();
				if(this.texhere == 'Face') this.bodyAppearanceFace.apply();
				if(this.texhere == 'Red') this.bodyAppearanceRed.apply();
				if(this.texhere == 'Main') this.bodyAppearance.apply();
				this.rightEngineBay.display();
            this.scene.popMatrix();

            //Left Engine Bay
            this.scene.pushMatrix();
				//ligeiro offset para evitar "z fighting"
				this.scene.translate(0,0.5,2.0);
				this.scene.scale(2,1,0);
				this.scene.translate(0,0.9,0);
				if(this.texhere == 'Cow') this.bodyAppearanceCow.apply();
				if(this.texhere == 'Face') this.bodyAppearanceFace.apply();
				if(this.texhere == 'Red') this.bodyAppearanceRed.apply();
				if(this.texhere == 'Main') this.bodyAppearance.apply();
				this.leftEngineBay.display();
            this.scene.popMatrix();

        //Sides
            
            //Right Side
            
            this.scene.pushMatrix();
				this.scene.rotate(degToRad*180,0,1,0);
				this.scene.translate(-1,0.7,0);
				this.scene.scale(1,1.5,1);
				this.scene.translate(0,0.6,0);
				if(this.texhere == 'Cow') this.bodyAppearanceCow.apply();
				if(this.texhere == 'Face') this.bodyAppearanceFace.apply();
				if(this.texhere == 'Red') this.bodyAppearanceRed.apply();
				if(this.texhere == 'Main') this.bodyAppearance.apply();
				this.side.display();
            this.scene.popMatrix();

            //Left Side
            
            this.scene.pushMatrix();
				this.scene.translate(1,0.7,1.99);
				this.scene.scale(1,1.5,1);
				this.scene.translate(0,0.6,0);
				if(this.texhere == 'Cow') this.bodyAppearanceCow.apply();
				if(this.texhere == 'Face') this.bodyAppearanceFace.apply();
				if(this.texhere == 'Red') this.bodyAppearanceRed.apply();
				if(this.texhere == 'Main') this.bodyAppearance.apply();
				this.side.display();
            this.scene.popMatrix();

        //Front
			this.scene.pushMatrix();
                this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
                this.scene.translate(1.0,0.49,2);
                this.scene.scale(2.05,1,2.0);
                this.scene.translate(0,0.9,0);
                this.front.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
                this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
                this.scene.translate(1.0,0.49,2.02);
                this.scene.scale(1,1,2.0);
                this.scene.translate(0,0.9,0);
                this.grillAppearance.apply();
                this.front.display();
			this.scene.popMatrix();

			//Roof
			this.scene.pushMatrix();
                this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
                this.scene.rotate(degToRad*90 + Math.PI,1,0,0);
                this.scene.translate(1,1,2.2);
                this.scene.scale(2.02,1.0,2.0);
                this.scene.translate(0,0,0.45);
                if(this.texhere == 'Cow') this.bodyAppearanceCow.apply();
                    if(this.texhere == 'Face') this.bodyAppearanceFace.apply();
                    if(this.texhere == 'Red') this.bodyAppearanceRed.apply();
                    if(this.texhere == 'Main') this.bodyAppearance.apply();
                this.front.display();
                this.scene.popMatrix();

			//Hood
			this.scene.pushMatrix();
                this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
                this.scene.rotate(degToRad*90 + Math.PI,1,0,0);
                this.scene.rotate(degToRad*10,1,0,0);
                this.scene.translate(1.01,-0.55,1.3);
                this.scene.translate(0,0.15,0.9);
                this.scene.scale(2.01,2.5,2.0);
                if(this.texhere == 'Cow') this.bodyAppearanceCow.apply();
                    if(this.texhere == 'Face') this.bodyAppearanceFace.apply();
                    if(this.texhere == 'Red') this.bodyAppearanceRed.apply();
                    if(this.texhere == 'Main') this.bodyAppearance.apply();
                this.front.display();
			this.scene.popMatrix();

			//Back
			this.scene.pushMatrix();
                this.scene.rotate(degToRad*90,0,1,0);
                this.scene.rotate(degToRad*-12.5,1,0,0);
                this.scene.translate(-1,0.55, 1.925);
                this.scene.scale(2.02,2.3,2.0);
                this.scene.translate(0,0.45,0.1);
                if(this.texhere == 'Cow') this.bodyAppearanceCow.apply();
                    if(this.texhere == 'Face') this.bodyAppearanceFace.apply();
                    if(this.texhere == 'Red') this.bodyAppearanceRed.apply();
                    if(this.texhere == 'Main') this.bodyAppearance.apply();
                this.front.display();
			this.scene.popMatrix();

			//Front Window
			this.scene.pushMatrix();
                this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
                this.scene.rotate(degToRad*-12.5,1,0,0);
                this.scene.translate(1,1.75, -0.1);
                this.scene.scale(1.98,1.0,2.0);
                this.scene.translate(0,0.9,0.09);
                this.bodyAppearance.apply();
                this.front.display();
                this.scene.popMatrix();
                this.scene.pushMatrix();
                this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
                this.scene.rotate(degToRad*-12.5,1,0,0);
                this.scene.translate(1,1.75, -0.05);
                this.scene.scale(1.98,1.0,2.0);
                this.scene.translate(0,0.9,0.09);
                this.windowAppearance.apply();
                this.front.display();
			this.scene.popMatrix();


			//Back Window
			this.scene.pushMatrix();
                this.scene.rotate(degToRad*90,0,1,0);
                this.scene.rotate(degToRad*-12.5,1,0,0);
                this.scene.translate(-1,2.3, 2.15);
                this.scene.scale(2,0.7,0);
                this.bodyAppearance.apply();
                this.front.display();
                this.scene.popMatrix();
                this.scene.pushMatrix();
                this.scene.rotate(degToRad*90,0,1,0);
                this.scene.rotate(degToRad*-12.5,1,0,0);
                this.scene.translate(-1,2.3, 2.16);
                this.scene.scale(1.9,0.7,0);
                this.windowAppearance.apply();
                this.front.display();
			this.scene.popMatrix();

			//Right Side Window
			this.scene.pushMatrix();
                this.scene.rotate(degToRad*180,0,1,0);
                this.scene.translate(-1,1.7,0.01);
                this.scene.scale(0.4,0.45,0.4);
                this.scene.translate(0,2,0);
                this.windowAppearance.apply();
                this.side.display();
			this.scene.popMatrix();

			//Left Side Window
			this.scene.pushMatrix();
                this.scene.translate(1,1.7,2.01);
                this.scene.scale(0.4,0.45,0.4);
                this.scene.translate(0,2,0);
                this.windowAppearance.apply();
                this.side.display();
			this.scene.popMatrix();


			//Lights
			this.scene.pushMatrix();
			this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
			this.scene.translate(0.715,1.15,2);
			this.scene.scale(0.16,0.16,0.06);
			this.lightAppearance.apply();
			this.light.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
			this.scene.translate(1.29,1.15,2);
			this.scene.scale(0.16,0.16,0.06);
			this.lightAppearance.apply();
			this.light.display();
			this.scene.popMatrix();


        

            //Bottom
            this.scene.pushMatrix();
                this.scene.rotate(degToRad*90,0,1,0);
                this.scene.rotate(degToRad*90,1,0,0);
                this.scene.translate(-1,0,-0.9)
                this.scene.scale(2,4,3);
                if(this.texhere == 'Cow') this.bodyAppearanceCow.apply();
                if(this.texhere == 'Face') this.bodyAppearanceFace.apply();
                if(this.texhere == 'Red') this.bodyAppearanceRed.apply();
                if(this.texhere == 'Main') this.bodyAppearance.apply();
                this.front.display();
            this.scene.popMatrix();

        //General

            this.scene.pushMatrix();
            this.scene.scale(1.2,1.2,1);
            this.scene.popMatrix();
    this.scene.popMatrix();



    };

    update(currTime){
        this.updatePosition(currTime);
        this.turnVehicle();
        this.frontWheels.setAngle(this.speed);
        this.backWheels.setAngle(this.speed*3/5);
    };
    
    updatePosition(currTime){
        this.x -= Math.cos(-this.angle*degToRad) * (currTime/1000) * (this.speed);
        this.z -= Math.sin(-this.angle*degToRad) * (currTime/1000) * (this.speed);
    };
    
    turnVehicle(){
        if(this.frontWheels.rotationAngle != 0 && this.speed != 0)
        this.angle = this.angle + ((this.speed/3) * this.frontWheels.rotationAngle/(Math.PI/3));
    };
    
    accelerate(maxSpeed){
        if(this.speed< maxSpeed)
        this.speed += 0.1;
        else {
            this.speed = maxSpeed;
        }
    };
    
    deccelerate(maxSpeed){
        if(this.speed > -maxSpeed)
        this.speed -= 0.1;
        else {
            this.speed = -maxSpeed;
        }
    };

    resetVehicle(){
    	this.x = 0;
    	this.y = 0;
        this.z = 0;
        this.stucky = false;
    	this.angle = 0.0000000001;
    	this.tractorAngleT = 0.0000000001;
        this.bodyAngle= 0.0;
        this.frontWheels.rotationAngle=0;
        this.moveLeft = 0;
        this.moveRight = 0;
        this.speed = 0.0;
    };

};

