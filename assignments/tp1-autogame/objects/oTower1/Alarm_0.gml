if(instance_exists(objectToShoot)){
	var bala = instance_create_depth(x, y, -9, oBala)
	bala.speed = 3;
	bala.direction = point_direction(x, y, objectToShoot.x, objectToShoot.y);
	alarm[0] = fire_rate;
}else{
	shooting = false;
}