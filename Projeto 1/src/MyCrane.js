/* 
* MyCrane
*/
var degToRad = Math.PI / 180.0;
var moving = 0;

class MyCrane extends CGFobject
{
    constructor(scene, x, y, z)
    {
        super(scene);

        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.mx = 0;
        this.my = 0;
        this.mz = 1;
        this.horizontalAngle = 0;
		this.verticalAngle = 0;
        this.mainArm = new MyCubeM(this.scene);
        this.secondArm = new MyCubeM(this.scene);
		this.stringArm = new MyCubeM(this.scene);
        this.magnet = new MyCylinder(this.scene, 20, 1);
        this.magnetTop = new MyCircle(this.scene, 20);
        this.magnetBottom = new MyCircle(this.scene, 20);
        
        // Materials

        this.materialDefault = new CGFappearance(this.scene);
        
        this.craneAppearance = new CGFappearance(this.scene);
        this.craneAppearance.loadTexture('../resources/images/crane.png');
		this.craneAppearance.setAmbient(1,1,1,1);
		this.craneAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.craneAppearance.setSpecular(0.8,0.8,0.8,1);	
		this.craneAppearance.setShininess(200);

		this.magnetAppearance = new CGFappearance(this.scene);
        this.magnetAppearance.loadTexture('../resources/images/magnet.png');
		this.magnetAppearance.setAmbient(1,1,1,1);
		this.magnetAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.magnetAppearance.setSpecular(0.8,0.8,0.8,1);	
		this.magnetAppearance.setShininess(200);

    };
    
    display()
    {

		this.scene.translate(this.x, this.y, this.z);
        
        this.scene.translate(5,0,5);
        
        this.scene.pushMatrix();
        this.craneAppearance.apply();
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.rotate(4.17*Math.PI/8,1,1,0);
        this.scene.rotate(this.horizontalAngle*Math.PI/8,1,1,0);
        this.scene.scale(2,20,2,1);
        this.mainArm.display();
		

		this.scene.pushMatrix();
		this.scene.translate(0,1,0);
		this.scene.scale(1/2,1/20,1/2,1);
		this.scene.rotate(-3.05*Math.PI/8,0,0,-1);
		this.scene.rotate(this.verticalAngle*Math.PI/8,0,0,-1);
        this.scene.scale(2,20,2,1);
        this.scene.scale(0.6,0.6,0.6,1);
        this.secondArm.display();

        this.scene.pushMatrix();
        this.magnetAppearance.apply();
        this.scene.translate(0,1,0);
        this.scene.pushMatrix()
        this.scene.scale(1/2,1/20,1/2,1);
		this.scene.scale(1/0.6,1/0.6,1/0.6,1);
        this.scene.rotate(3/4*Math.PI,0,0,1);
        this.scene.rotate(-3.05*Math.PI/8,0,0,1);
        this.scene.rotate(this.verticalAngle*Math.PI/8,0,0,1);
        this.scene.scale(2,20,2,1);
        this.scene.scale(0.6,0.6,0.6,1);
        this.scene.scale(0.05,0.5,0.05,1);
        this.stringArm.display();

        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.scene.rotate(1/2*Math.PI,1,0,0);
        this.scene.scale(80,80,0.2,1);
        this.magnet.display();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.magnetTop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.45);
        this.scene.rotate(Math.PI,0,1,0);
        this.magnetTop.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();
             
		this.scene.rotate(-this.tractorAngle, 0, 1, 0);

		//console.log(this.mz);

		this.mx = -10+24*Math.sin(this.horizontalAngle*Math.PI/8)+Math.cos(this.verticalAngle*Math.PI/8);
    	this.my = Math.sin(this.verticalAngle*Math.PI/8);
    	this.mz = 24*Math.cos(this.horizontalAngle*Math.PI/8)+Math.cos(this.verticalAngle*Math.PI/8);

    };

   
    resetCrane(){
		this.horizontalAngle = 0;
		this.verticalAngle = 0;
		this.mx = 0;
		this. my = 0;
		this.mz = 1;

    }

    rotateRight(currTime){
		this.horizontalAngle = this.horizontalAngle - (360/60.0)*(currTime/100.0)
    }

    rotateLeft(currTime){
		this.horizontalAngle = this.horizontalAngle + (360/60.0)*(currTime/100.0)
    }

    rotateUp(currTime){
        if(this.verticalAngle > Math.PI/2)
            this.verticalAngle = Math.PI/2;
        else
		    this.verticalAngle = this.verticalAngle + (360/60.0)*(currTime/100.0)
    	
    }

    rotateDown(currTime){
    if(this.verticalAngle < -Math.PI*0.05)
            this.verticalAngle = -Math.PI*0.05;
        else
		    this.verticalAngle = this.verticalAngle - (360/60.0)*(currTime/100.0)
    }

};

