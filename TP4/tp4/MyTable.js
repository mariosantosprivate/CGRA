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
        
        this.materialDefault = new CGFappearance(this.scene);
        
		this.scene.tableAppearance = new CGFappearance(this.scene);
		this.scene.tableAppearance.loadTexture("../resources/images/table.png");
		this.scene.tableAppearance.setAmbient(0.5,0.5,0.5,1);
		this.scene.tableAppearance.setDiffuse(0.1,0.1,0.1,1);
		this.scene.tableAppearance.setSpecular(0.1,0.1,0.1,1);
		this.scene.tableAppearance.setShininess(20);
    
        this.scene.pernas = new CGFappearance(this.scene);
        this.scene.pernas.setAmbient(0.5,0.5,0.5,1);
        this.scene.pernas.setDiffuse(0.8,0.8,0.8,1);
        this.scene.pernas.setSpecular(0.9,0.9,0.9,1);
        this.scene.pernas.setShininess(120);
    
        this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
    };

display(){

    //tableAppearancemyUnitCubeQuad
    this.scene.pushMatrix();
    this.scene.translate(0,3.61,0);
    this.scene.scale(5,0.3,3);
    this.scene.tableAppearance.apply();
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();
       
    
    //Perna do canto inferior esquerdo

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.pernas.apply();
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    //Perna do inferior direito

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.71,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.pernas.apply();
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    //Perna do canto superior esquerdo

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.pernas.apply();
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    //Perna do superior direito

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.pernas.apply();
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();



     

}
}