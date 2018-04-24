/* 
* MyTractor
*/

class MyTractor extends CGFobject
{
    constructor(scene)
    {
        super(scene);

        this.materialDefault = new CGFappearance(this.scene);

        this.engineBay = new MyLongTrap(this.scene);
        this.side = new MyTrap(this.scene);
	

        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.loadTexture('../resources/images/tractor.png');

    };

    display()
    {
        //Engine Bay
           
            //Left Engine Bay
            this.scene.pushMatrix();
            //ligeiro offset para evitar "z fighting"
            this.scene.translate(0,0.5,-0.01);
            this.scene.scale(2,1,0);
            //this.bodyAppearance.apply();
            this.engineBay.display();
            this.scene.popMatrix();

            //Right Engine Bay
            this.scene.pushMatrix();
            //ligeiro offset para evitar "z fighting"
            this.scene.translate(0,0.5,2.01);
            this.scene.scale(2,1,0);
            //this.bodyAppearance.apply();
            this.engineBay.display();
            this.scene.popMatrix();

        //Sides
            //Left Side
            this.scene.pushMatrix();
            this.scene.translate(1,1,0);
            this.scene.scale(1,2,1);
            //this.bodyAppearance.apply();
            this.side.display();
            this.scene.popMatrix();
            
            //Right Side
            this.scene.pushMatrix();
            this.scene.translate(1,1,2);
            this.scene.scale(1,2,1);
            //this.bodyAppearance.apply();
            this.side.display();
            this.scene.popMatrix();

    };

    update(currTime) {
    }

};