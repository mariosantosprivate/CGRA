/* 
* MyTractor
*/
var degToRad = Math.PI / 180.0;

class MyTractor extends CGFobject
{
    constructor(scene)
    {
        super(scene);

        this.materialDefault = new CGFappearance(this.scene);

        this.leftEngineBay = new MyLongTrap(this.scene);
        this.rightEngineBay = new MyLongTrapMirror(this.scene);
        this.side = new MyTrap(this.scene);
        this.front = new MyQuad(this.scene);

        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.loadTexture('../resources/images/tractor.png');
		this.bodyAppearance.setAmbient(1,1,1,1);
		this.bodyAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.bodyAppearance.setSpecular(0.8,0.8,0.8,1);	
		this.bodyAppearance.setShininess(200);

        this.fenderAppearance = new CGFappearance(this.scene);
        this.fenderAppearance.loadTexture('../resources/images/tractor.png');

        this.hoodAppearance = new CGFappearance(this.scene);
		this.hoodAppearance.setAmbient(0.1,0.1,0.1,1);
		this.hoodAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.hoodAppearance.setSpecular(0.8,0.8,0.8,1);	
        this.hoodAppearance.setShininess(200);
        
        this.windowAppearance = new CGFappearance(this.scene);
		this.windowAppearance.setAmbient(0.2,0.6,1,1);
		this.windowAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.windowAppearance.setSpecular(0.8,0.8,0.8,1);	
        this.windowAppearance.setShininess(200);
        
        this.windowAppearance2 = new CGFappearance(this.scene);
		this.windowAppearance2.setAmbient(0.2,0.6,1,1);
		this.windowAppearance2.setDiffuse(0.6,0.6,0.6,1);
		this.windowAppearance2.setSpecular(0.8,0.8,0.8,1);	
		this.windowAppearance2.setShininess(200);
    
    };

    display()
    {
        //Engine Bay
           
            //Right Engine Bay
            this.scene.pushMatrix();
            //ligeiro offset para evitar "z fighting"
            this.scene.translate(0,0.5,-0.01);
            this.scene.scale(2,1,0);
            this.bodyAppearance.apply();
            this.rightEngineBay.display();
            this.scene.popMatrix();

            //Left Engine Bay
            this.scene.pushMatrix();
            //ligeiro offset para evitar "z fighting"
            this.scene.translate(0,0.5,2.01);
            this.scene.scale(2,1,0);
            this.bodyAppearance.apply();
            this.leftEngineBay.display();
            this.scene.popMatrix();

        //Sides

            //Left Side
            this.scene.pushMatrix();
            this.scene.rotate(degToRad*180,0,1,0);
            this.scene.translate(-1,0.7,0);
            this.scene.scale(1,1.5,1);
            this.bodyAppearance.apply();
            this.side.display();
            this.scene.popMatrix();
            
            //Right Side
            this.scene.pushMatrix();
            this.scene.translate(1,0.7,2);
            this.scene.scale(1,1.5,1);
            this.bodyAppearance.apply();
            this.side.display();
            this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
        this.scene.translate(1,0.5,2);
        this.scene.scale(2.02,1.0,2.0);
        this.front.display();
        this.scene.popMatrix();

        //Roof
        this.scene.pushMatrix();
        this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
        this.scene.rotate(degToRad*90 + Math.PI,1,0,0);
        this.scene.translate(1,1,2.2);
        this.scene.scale(2.02,1.0,2.0);
        this.front.display();
        this.scene.popMatrix();

        //Hood
        this.scene.pushMatrix();
        this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
        this.scene.rotate(degToRad*90 + Math.PI,1,0,0);
        this.scene.rotate(degToRad*10,1,0,0);
        this.scene.translate(1.01,-0.55,1.3);
        this.scene.scale(2.01,2.5,2.0);
        this.bodyAppearance.apply();
        this.front.display();
        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();
        this.scene.rotate(degToRad*90,0,1,0);
        this.scene.rotate(degToRad*-12.5,1,0,0);
        this.scene.translate(-1,0.55, 1.925);
        this.scene.scale(2.02,2.02,2.0);
        this.bodyAppearance.apply();
        this.front.display();
        this.scene.popMatrix();

        //Front Window
        this.scene.pushMatrix();
        this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
        this.scene.rotate(degToRad*-12.5,1,0,0);
        this.scene.translate(1,1.75, -0.1);
        this.scene.scale(2.02,1.0,2.0);
        this.bodyAppearance.apply();
        this.front.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(degToRad*90 + Math.PI,0,1,0);
        this.scene.rotate(degToRad*-12.5,1,0,0);
        this.scene.translate(1,1.75, -0.05);
        this.scene.scale(2,1.0,2.0);
        this.windowAppearance.apply();
        this.front.display();
        this.scene.popMatrix();

        
        //Back Window
        this.scene.pushMatrix();
        this.scene.rotate(degToRad*90,0,1,0);
        this.scene.rotate(degToRad*-12.5,1,0,0);
        this.scene.translate(-1,1.48, 1.93);
        this.scene.scale(2,0.7,0);
        this.bodyAppearance.apply()
        this.front.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(degToRad*90,0,1,0);
        this.scene.rotate(degToRad*-12.5,1,0,0);
        this.scene.translate(-1,1.45, 1.931);
        this.scene.scale(1.9,0.7,0);
        this.windowAppearance.apply()
        this.front.display();
        this.scene.popMatrix();





    };

    update(currTime) {
    }

};