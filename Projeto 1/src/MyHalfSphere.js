/**
 * MyLamp
 */

class MyLamp extends CGFobject
{
    constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }


    initBuffers()
    {    
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        var ang = Math.PI * 2 / this.slices;
        var angEsf = Math.PI / 2 / this.stacks;

        for (var j = 0; j < this.stacks + 1; j++) {
            for (var i = 0; i < this.slices; i++) {

                this.vertices.push(Math.cos(i * ang) * Math.cos(angEsf * j), Math.sin(i * ang) * Math.cos(angEsf * j), Math.sin(angEsf * j));
                this.normals.push(Math.cos(i * ang) * Math.cos(angEsf * j), Math.sin(i * ang) * Math.cos(angEsf * j), Math.sin(angEsf * j));
            }
        }

        for (var j = 0; j < this.stacks; j++) {
            for (var i = 0; i < this.slices; i++) {
                if (i == this.slices - 1) {
                    this.indices.push(0 + this.slices * j, 0 + this.slices * (j + 1), 0 + i + this.slices * (j + 1));
                    this.indices.push(0 + this.slices * j, 0 + i + this.slices * (j + 1), 0 + i + this.slices * j);
                } else {
                    this.indices.push(0 + i + this.slices * j, 1 + i + this.slices * j, 0 + i + this.slices * (j + 1));
                    this.indices.push(1 + i + this.slices * j, 1 + i + this.slices * (j + 1), 0 + i + this.slices * (j + 1));
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};