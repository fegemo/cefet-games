draw_self();

if(mouseOver(x, y, sprite_width, sprite_height)){
	draw_circle(x, y, range, true);
}

var a = instance_nearest(x, y, oEnemies);
if(a != noone){
	if(point_distance(x, y, a.x, a.y) <= range+15){
		if(!shooting){
			alarm[0] = 1;
			shooting = true;
		}
		objectToShoot = a;
		if(mouseOver(x, y, sprite_width, sprite_height)){
			draw_line(x, y, a.x, a.y);
		}
	}else{
		shooting = false;
		objectToShoot = noone;
	}
}