class MyTerrain extends CGFobject{

	constructor(scene, nrDivs, altimetry) 
	{
        super(scene);
        
		this.nrDivs = nrDivs;
		this.minS = 0;
		this.maxS = 1;
		this.minT = 0;
		this.maxT = 1;
		this.terrain = new Plane(this.scene, this.nrDivs, altimetry, this.minS, this.maxS, this.minT, this.maxT);
        


        /*Material for the floor */
       

		this.terrainAppearance = new CGFappearance(this.scene);
		this.terrainAppearance.loadTexture("../resources/images/terrain.png");
		this.terrainAppearance.setAmbient(0,0,0,1);
		this.terrainAppearance.setDiffuse(0.9,0.9,0.4,1);
		this.terrainAppearance.setSpecular(0.1,0.1,0.1,1);
		this.terrainAppearance.setShininess(0);
	}
	display(){
		this.scene.pushMatrix();		
		this.scene.translate(7.5, 0, 7.5);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.scale(100, 100, 1);
        this.terrainAppearance.apply();
        this.terrain.display();
		this.scene.popMatrix();
	}
    

};