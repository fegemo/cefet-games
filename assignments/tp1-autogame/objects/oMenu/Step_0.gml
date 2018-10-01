movimento = keyboard_check_pressed(vk_down) - keyboard_check_pressed(vk_up); 

menu_index += movimento;
if(menu_index < 0){
	menu_index = buttons - 1;
}

if(menu_index > buttons-1){
	menu_index = 0;
}

if(menu_index != last_selected){
	audio_play_sound(som_menu_item, 1, false);
}

last_selected = menu_index;