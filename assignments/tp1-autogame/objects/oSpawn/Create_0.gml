/// @description Insert description here
// You can write your code in this editor
if(global.dificuldade == "Facil"){
	spawn_amount = 5;
	spawn_count = 0;
	spawn_rate = 1 * room_speed;

	alarm[0] = 1;
	alarm[1] = room_speed*5;

	global.hp = 80;
	global.spd = 1;
	global.level = 1;
	global.coins = 100

}else if(global.dificuldade == "Normal"){
	spawn_amount = 7;
	spawn_count = 0;
	spawn_rate = 1 * room_speed;

	alarm[0] = 1;
	alarm[1] = room_speed*5;

	global.hp = 120;
	global.spd = 1.5;
	global.level = 5;
	global.coins = 150
}else{
	spawn_amount = 10;
	spawn_count = 0;
	spawn_rate = 1 * room_speed;

	alarm[0] = 1;
	alarm[1] = room_speed*5;

	global.hp = 200;
	global.spd = 1.7;
	global.level = 8;
	global.coins = 350

}
