/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.initBuffers = function () {
	this.vertices = [
            0, 0, 0,
            0, 1, 0,
            0.5, 0.866, 0,
            0.866, 0.5, 0,
            1, 0, 0,
            0.866, -0.5, 0,
            0.5, -0.866, 0,
            0, -1, 0,
            -0.5, -0.866, 0,
            -0.866, -0.5, 0,
            -1, 0, 0,
            -0.866, 0.5, 0,
            -0.5, 0.866, 0
			];

	this.indices = [
            0, 1, 12, 
			0, 12, 11,
			0, 11, 10,
			0, 10, 9,
			0, 9, 8,
			0, 8, 7,
			0, 7, 6,
			0, 6, 5,
			0, 5, 4,
			0, 4, 3,
			0, 3, 2,
			0, 2, 1,
		];
	
	this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

		this.texCoords = [
			0.5, 0.5 ,
			0.5, 0 ,
			0.75, 0.067 ,
			0.933, 0.25 ,
			1, 0.5 ,
			0.933, 0.75 ,
			0.75, 0.933 ,
			0.5, 1 ,
			0.25, 0.933 ,
			0.067, 0.75 ,
			0, 0.5 ,
			0.067, 0.25 ,
			0.25, 0.067 
		];

		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};