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

    /* Material para o tampo das mesas */
    this.scene.tampo = new CGFappearance(this.scene);
        this.scene.tampo.setAmbient(0.33,0.162,0.045,1);
        this.scene.tampo.setDiffuse(0.7,0.3,0.0,1);
        this.scene.tampo.setSpecular(0.05,0.02,0.006,1);
        this.scene.tampo.setShininess(120);

    /* Material para as pernas das mesas */
    this.scene.pernas = new CGFappearance(this.scene);
        this.scene.pernas.setAmbient(0.5,0.5,0.5,1);
        this.scene.pernas.setDiffuse(0.8,0.8,0.8,1);
        this.scene.pernas.setSpecular(0.9,0.9,0.9,1);
        this.scene.pernas.setShininess(120);


    //Tampo
    this.scene.pushMatrix();
    this.scene.translate(0,3.61,0);
    this.scene.scale(5,0.3,3);
    this.scene.tampo.apply();
    this.cube.display();
    this.scene.popMatrix();
       
    
    //Perna do canto inferior esquerdo

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.pernas.apply();
    this.cube.display();
    this.scene.popMatrix();

    //Perna do inferior direito

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.71,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.pernas.apply();
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto superior esquerdo

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.pernas.apply();
    this.cube.display();
    this.scene.popMatrix();

    //Perna do superior direito

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.pernas.apply();
    this.cube.display();
    this.scene.popMatrix();



     

}
}