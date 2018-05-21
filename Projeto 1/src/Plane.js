class Plane extends CGFobject{

	constructor(scene, nrDivs, altimetry, minS, maxS, minT, maxT) 
	{
		super(scene);

		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;

		this.altimetry = altimetry;

		this.initBuffers(this.altimetry);
	};

	initBuffers(altimetry)
	{
		
		// Generate vertices and normals 
		this.vertices = [];
		this.normals = [];
		
		// Uncomment below to init texCoords
		this.texCoords = [];

		this.altimetry = altimetry;
		
		var step_t = (this.maxT - this.minT)/this.nrDivs;
		var step_s = (this.maxS - this.minS)/this.nrDivs;

		var yCoord = 0.5;

		for (var j = 0; j <= this.nrDivs; j++) 
		{
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.vertices.push(xCoord, yCoord, this.altimetry[i][j]);
				
				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).
				
				this.normals.push(0,0,1);

				// texCoords should be computed here; uncomment and fill the blanks
				this.texCoords.push(this.minS+i*step_s, this.minT + j*step_t);

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
