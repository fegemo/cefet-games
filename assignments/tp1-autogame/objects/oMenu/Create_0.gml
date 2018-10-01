menu_x = x;
menu_y = y;
global.dificuldade = "Normal";
button_h = 32;



button[0] = "Novo jogo";
button[1] = "Dificuldade: " + string(global.dificuldade);
button[2] = "Sair";

buttons = array_length_1d(button);

menu_index = 0;
last_selected = 0;
