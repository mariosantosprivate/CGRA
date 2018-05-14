class Plane extends CGFobject{

	constructor(scene, nrDivs, minS, maxS, minT, maxT) 
	{
		super(scene);

		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.minS=minS;
		this.maxS=maxS;
		this.minT=minT;
		this.maxT=maxT;

		this.initBuffers();
	};

	initBuffers()
	{
		
		// Generate vertices and normals 
		this.vertices = [];
		this.normals = [];
		
		// Uncomment below to init texCoords
		this.texCoords = [];

		var step_t = (this.maxT - this.minT)/this.nrDivs;
		var step_s = (this.maxS - this.minS)/this.nrDivs;

		var yCoord = 0.5;

		for (var j = 0; j <= this.nrDivs; j++) 
		{
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.vertices.push(xCoord, yCoord, 0);
				
				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).
				
				this.normals.push(0,0,1);

				// texCoords should be computed here; uncomment and fill the blanks
				this.texCoords.push(i*step_s, j*step_t);

				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		
		
		this.indices = [];
		var ind=0;


		for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.indices.push(ind);
				this.indices.push(ind+this.nrDivs+1);

				ind++;
			}
			if (j+1 < this.nrDivs)
			{
				// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
				// degenerate triangles will not generate fragments
				this.indices.push(ind+this.nrDivs);
				this.indices.push(ind);
			}
		}
		
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

		this.initGLBuffers();
	};

};

class MyTerrain extends Plane{

	constructor(scene, nrDivs, minS, maxS, minT, maxT) 
	{
		super(scene, nrDivs,minS, maxS, minT, maxT);
        this.initBuffers();
	};
    

};