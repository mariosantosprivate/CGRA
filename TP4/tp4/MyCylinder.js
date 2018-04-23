/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{
	constructor(scene){
		super(scene);
		this.slices = 20;
		this.stacks = 8;
		this.initBuffers();
	}

	initBuffers(){
		
		 var angulo = 2*Math.PI/this.slices;
		 var a = 0;
		 var b = 0; 
	
		this.vertices=[];
		this.normals=[];
		this.texCoords = [];
		
			for(var i = 0; i < this.stacks+1;i++){
				for(var j = 0; j < this.slices;j++){
					/* As normais passam a ser iguais as coordenadas dos pontos */
					this.vertices.push(Math.cos(j*angulo),Math.sin(j*angulo),i/this.stacks);
					this.normals.push(Math.cos(j*angulo),Math.sin(j*angulo),0);
					this.texCoords.push(a,b);
					a+=1/this.stacks;
				}
				a = 0;
				b +=1/this.stacks;
			}
		 
	
		 for(var i = 0; i < this.stacks+1;i++){
			 for(var j = 0; j < this.slices;j++){
				 /* As normais passam a ser iguais as coordenadas dos pontos */
				 this.vertices.push(Math.cos(j*angulo),Math.sin(j*angulo),i/this.stacks);
				 this.normals.push(Math.cos(j*angulo),Math.sin(j*angulo),0);
			 }
		 }
	
		 this.indices=[];
	
		for(var i=0; i < this.stacks;i++){
			for(var j=0; j < this.slices;j++){
				this.indices.push(i*this.slices+j,i*this.slices+((j+1)%this.slices),(i+1)*this.slices+(j+1)%this.slices);
				this.indices.push(i*this.slices+j,(i+1)*this.slices+((j+1)%this.slices),(i+1)*this.slices+j);
			}
		}
	
		 this.primitiveType = this.scene.gl.TRIANGLES;
		 this.initGLBuffers();
	};

};
