/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-0.5, -0.5, -0.5,
				0.5, -0.5, -0.5,
				0.5, 0.5, -0.5,
				-0.5, 0.5, -0.5,
				-0.5, -0.5, 0.5,
				0.5, -0.5, 0.5,
                0.5, 0.5, 0.5,
                -0.5,0.5,0.5
				];

		this.indices = [
				2, 1, 0, 
                2, 0, 3,
              	4, 5, 6,
                7, 4, 6,
                2,3,7,
                6,2,7,
                1,2,6,
                5,1,6,
                4,0,1,
                4,1,5,
                7,3,0,
                7,0,4

                
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
