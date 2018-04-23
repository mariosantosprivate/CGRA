/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube=new MyUnitCubeQuad(this.scene);
		this.cube.initBuffers();
		
	};

display(){

    //Perna do canto inferior esquerdo

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna do inferior direito

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.71,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto superior esquerdo

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna do superior direito

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();



    //Tampo
    this.scene.pushMatrix();
    this.scene.translate(0,3.61,0);
    this.scene.scale(5,0.3,3);
    this.cube.display();
    this.scene.popMatrix();    

}
}