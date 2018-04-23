class MyClockHand extends CGFobject
{
	constructor(scene, height, angle){
		super(scene);
		this.angle = angle || 90;
		this.cylinder = new MyCylinder(this.scene);
		this.height = height || 0.05;
	}

	setAngle(angle){
	    this.angle = angle;
	}

	display()
	{
	    var degToRad = Math.PI / 180.0;

	    this.scene.pushMatrix();
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.scene.rotate(this.angle * degToRad,0,1,0);
        this.scene.scale(0.002, 0.002, this.height);
	    this.cylinder.display();
	    this.scene.popMatrix();
	}
};