/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
class MyPrism extends CGFobject
{
	constructor(scene,slices,stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    
    initBuffers() {
    
    this.vertices=[];
    this.normals=[];
    this.indices=[];

    var angulo = 2*Math.PI/this.slices;

    for(var i = 0; i < this.stacks+1;i++){
        for(var j = 0; j < this.slices;j++){
            this.vertices.push(Math.cos(j*angulo),Math.sin(j*angulo),i/this.stacks);
            this.normals.push(Math.cos(angulo/2)+j*angulo,Math.sin(angulo/2)+j*angulo,0);
            this.vertices.push(Math.cos((j+1)*angulo),Math.sin((j+1)*angulo),i/this.stacks);
            this.normals.push(Math.cos(angulo/2)+j*angulo,Math.sin(angulo/2),0);
        }
    }

    for(var i=0; i < this.stacks;i++){
        for(var j=0; j < this.slices;j++){
            this.indices.push(i*(this.slices*2)+j*2,i*(this.slices*2)+j*2+1,(i+1)*(this.slices*2)+j*2+1);
            this.indices.push(i*(this.slices*2)+j*2,(i+1)*(this.slices*2)+j*2+1,(i+1)*(this.slices*2)+j*2);
       }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    };
};