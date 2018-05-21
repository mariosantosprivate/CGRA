class MyWheel extends CGFobject
{
	constructor(scene, angle){
        
		super(scene);
		this.angle = angle || 90;
        this.tire = new MyCylinder(this.scene, 100 ,100);
        this.wheel = new MyCircle(this.scene,100);
    
        this.tireAppearance = new CGFappearance(this.scene);
        this.tireAppearance.loadTexture('../resources/images/tire2.png');

        this.wheelAppearance = new CGFappearance(this.scene);
        this.wheelAppearance.loadTexture('../resources/images/wheel.png');

    }

	setAngle(angle){
	    this.angle = angle;
	}

	display()
	{
	    var degToRad = Math.PI / 180.0;
         //Back Wheels

            // Left

            this.scene.pushMatrix();
            this.scene.scale(1,1,0.9);
            this.scene.translate(1,1.2,2.2);
            this.tireAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);
            this.tire.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(1,1,0.9);
            this.scene.translate(1,1.2,2.2);
            this.scene.rotate(this.angle * degToRad,0,0,1);
            this.scene.rotate(degToRad*180,1,0,0);
            this.wheelAppearance.apply();
            
            this.wheel.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(1,1,1.08);
            this.scene.translate(1,1.2,2.65);
            this.wheelAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.wheel.display();
            this.scene.popMatrix();
           
            /*// Right
            this.scene.pushMatrix();
            this.scene.scale(1,1,0.9);
            this.scene.translate(1,1.2,-1);
            this.tireAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.tire.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(1,1,1);
            this.scene.translate(1,1.2,-0.9);
            this.scene.rotate(degToRad*180,1,0,0);
            this.wheelAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.wheel.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(1,1,1);
            this.scene.translate(1,1.2,0);
            this.wheelAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.wheel.display();
            this.scene.popMatrix();

        //Front Tires
            // Left
            this.scene.pushMatrix();
            this.scene.scale(0.7,0.7,0.7);
            this.scene.translate(-1.7,1.3,2.9);
            this.tireAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.tire.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.7,0.7,0.5);
            this.scene.translate(-1.7,1.3,5.45);
            this.wheelAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.wheel.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.7,0.7,0.5);
            this.scene.translate(-1.7,1.3,4);
            this.scene.rotate(degToRad*180,1,0,0);
            this.wheelAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.wheel.display();
            this.scene.popMatrix();

            // Right
            this.scene.pushMatrix();
            this.scene.scale(0.7,0.7,0.7);
            this.scene.translate(-1.7,1.3,-1);
            this.tireAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.tire.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.7,0.7,0.7);
            this.scene.translate(-1.7,1.3,0);
            this.wheelAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.wheel.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.7,0.7,0.7);
            this.scene.translate(-1.7,1.3,-1);
            this.scene.rotate(degToRad*180,1,0,0);
            this.wheelAppearance.apply();
            this.scene.rotate(this.angle * degToRad,0,0,1);;
            this.wheel.display();
            this.scene.popMatrix();
        
        */
	}
};