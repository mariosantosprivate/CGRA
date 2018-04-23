/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
 const rad =  Math.PI/180;

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad=new MyQuad(this.scene);
		this.quad.initBuffers();
		
	};

	display(){
	

    // Frente 
    this.scene.pushMatrix();
    this.scene.translate(0,0,0.5);
    this.quad.display();
	this.scene.popMatrix();
	
	// Tras 
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI,1,0,0);
	 this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

    // Baixo 
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();



     // Cima
    this.scene.pushMatrix();
    this.scene.rotate(3*Math.PI/2,1,0,0);
     this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();

     // Esquerda
	 this.scene.pushMatrix();
	 this.scene.rotate(3*Math.PI/2,0,1,0);
	 this.scene.translate(0,0,0.5);
	 this.quad.display();
	 this.scene.popMatrix();
	
    /* Direita */
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();

	

	}


};
