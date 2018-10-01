audio_play_sound(som_menu_item, 1, false);

switch(menu_index){
	
	case 0:
		room_goto(room0);
		break;
	case 1:
		if(global.dificuldade =="Facil"){
			global.dificuldade = "Normal";
		}else if(global.dificuldade =="Normal"){
			global.dificuldade = "Dificil";
		}else if(global.dificuldade =="Dificil"){
			global.dificuldade = "Facil";
		}
		break;
	case 2:
		game_end();
		break;
}