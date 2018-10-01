if(instance_number(oEnemies) <= 0){
		spawn_count = 0;
		spawn_amount+=3;
		global.level++;
		global.hp += 35;
		global.spd += 0.3;
		spawn_rate -= 3.0;
		alarm[0] = spawn_rate;
}

alarm[1] = room_speed*7;