class MyWheel extends CGFobject
{
	constructor(scene, angle){
        
		super(scene);
        this.rotationAngle = 0;
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
    
    setRotation(rotationAngle){
        this.rotationAngle = rotationAngle;
    }

    addRotation(rotationAngle){
        this.rotationAngle += rotationAngle;
    }

	display()
	{
	    var degToRad = Math.PI / 180.0;
         //Back Wheels
         //this.scene.rotate(this.rotationAngle);

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
	}
};