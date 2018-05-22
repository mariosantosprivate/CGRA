class MyWheel extends CGFobject
{
	constructor(scene, angle){
        
		super(scene);
        this.rotationAngle = 0;
        this.angle = angle || 90;
        this.adjustment = 0.0;
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
        //this.scene.translate(0,0,-0.45);
         this.scene.rotate(-this.rotationAngle,0,1,0);

            // Left
                
                this.scene.pushMatrix();
                this.tireAppearance.apply();
                this.scene.rotate(this.angle * degToRad,0,0,1);
                this.tire.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(0,0,0.45)
                this.scene.rotate(this.angle * degToRad,0,0,1);
                this.wheelAppearance.apply();
                this.wheel.display();
                this.scene.popMatrix();
                
                this.scene.pushMatrix();
                this.scene.rotate(this.angle * degToRad,0,0,1);
                this.scene.rotate(degToRad*180,1,0,0);
                this.scene.translate(0,0,0.45)
                this.wheelAppearance.apply();
                this.wheel.display();
                this.scene.popMatrix();
            

        }
};