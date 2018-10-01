if(global.coins >= cost){
	instance_create_depth(mouse_x, mouse_y, -9, oTower2D)
	global.coins -= cost;
}