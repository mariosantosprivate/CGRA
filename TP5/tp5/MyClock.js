/**
 * MyClock
*/


class MyClock extends CGFobject
{
    constructor(scene)
    {
        super(scene);

        this.materialDefault = new CGFappearance(this.scene);

        this.clockFace = new MyCircle(this.scene);
		this.clockBody = new MyCylinder(this.scene);
		this.hourHand = new MyClockHand(this.scene, 0.03, 90);
        this.minHand = new MyClockHand(this.scene, 0.055, 180);
        this.secHand = new MyClockHand(this.scene, 0.05, 270);


        this.faceAppearance = new CGFappearance(this.scene);
        this.faceAppearance.loadTexture('../resources/images/clock.png');

    };

    display()
    {
        //body
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.clockBody.display();
        this.scene.popMatrix();

        //face
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.translate(0,0,1);
        this.faceAppearance.apply();
        this.clockFace.display();
        this.scene.popMatrix();

        //hands
        this.scene.pushMatrix();
        this.materialDefault.apply();
        this.scene.translate(0,0,0.1);
        this.secHand.display();
        this.minHand.display();
        this.hourHand.display();
        this.scene.popMatrix();

    };

    update(currTime) {

        let time = currTime/1000; //working with ms

        let secAngle = (this.seconds.angle + time*360/60)%360;
        let minAngle = (this.minutes.angle + time*360/60/60)%360;
        let hourAngle = (this.hours.angle + time*360/60/60/12)%360;

        this.seconds.setAngle(secAngle);
        this.minutes.setAngle(minAngle);
        this.hours.setAngle(hourAngle);

    }

    update(currTime)
	{
		this.secHand.setAngle(this.secHand.angle + (360/60.0)*(currTime/1000.0));
		this.minHand.setAngle(this.minHand.angle + (360/3600.0)*(currTime/1000.0));
		this.hourHand.setAngle(this.hourHand.angle + (360.0/(60*60*12))*(currTime/1000.0));
	}
};