class MyTerrain extends CGFobject{

	constructor(scene, nrDivs, altimetry, minS, maxS, minT, maxT) 
	{
        super(scene);
        
        this.minS = minS || 0;
        this.minS = maxS || 1;
        this.minS = minT || 0;
        this.minS = maxT || 1;

		this.terrain = new Plane(this.scene,nrDivs,altimetry, minS, maxS, minT, maxT);
        


        /*Material for the floor */
       

		this.terrainAppearance = new CGFappearance(this.scene);
		this.terrainAppearance.loadTexture("../resources/images/terrain.png");
		this.terrainAppearance.setAmbient(0.8,0.8,0.8,1);
		this.terrainAppearance.setDiffuse(0.4,0.4,0.4,1);
		this.terrainAppearance.setSpecular(0.1,0.1,0.1,1);
		this.terrainAppearance.setShininess(0);
	}
	display(){
		this.scene.pushMatrix();		
		this.scene.translate(7.5, 0, 7.5);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.scale(50, 50, 1);
        this.terrainAppearance.apply();
        this.terrain.display();
		this.scene.popMatrix();
	}
    

};