class MyCircle extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{

        this.vertices =[];
        this.indices =[];
        this.normals =[];
        this.texCoords = [];

        var angle = 0;
        this.vertices.push(0,0,0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);

        for(var i = 0; i <= 12; i++) {
            this.vertices.push(Math.cos(angle), Math.sin(angle), 0);
            this.texCoords.push(0.5*Math.cos(angle)+0.5, 0.5 - 0.5*Math.sin(angle));

            angle += 2*Math.PI / 12; 
            this.normals.push(0, 0, 1);

        }

        for (var i = 0; i < 11; i++) {
            this.indices.push(0, (i+1), (i+2));
        }

        this.indices.push(12, 1, 0);

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};