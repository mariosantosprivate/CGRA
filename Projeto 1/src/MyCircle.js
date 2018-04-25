/**
 * MyCircle
 */

class MyCircle extends CGFobject
{
	constructor(scene, slices)
	{
        super(scene);
        this.slices = slices || 12;
		this.initBuffers();
	};

	initBuffers() 
	{

        var angle = 2*Math.PI/this.slices;
        var a = 0;

        this.vertices =[];
        this.indices =[];
        this.normals =[];
        this.texCoords = [];

        


        for(var i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), 0);
            this.normals.push(0, 0, 1);
            this.texCoords.push((-Math.cos(i*angle)+1)/2,(Math.sin(i*angle)+1)/2);
        }

        for(var i=0; i < this.slices-2;i++){
            this.indices.push(0,i+1,i+2);
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};