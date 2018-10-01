if(hp <= 0){
	instance_destroy();
}
if(y >= 485){
	show_message_async("Você perdeu!!!!");
	game_restart();
}