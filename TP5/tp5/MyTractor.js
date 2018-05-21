class MyTractor extends CFGObject{
    constructor(scene,x,y,z){
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.tractor = new MyVehicle(this.scene);
        this.initBuffers();        
        this.deltaX = 1;
    
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.tractor.display();
        this.scene.popMatrix();
    }

    update(currTime){
    
             this.x -= this.deltaX;
    }
}