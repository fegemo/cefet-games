module.exports = function() {
  var cheet = require('cheet.js'),
    commandPanelEl = document.createElement('aside');

  commandPanelEl.id = 'easter-egg-panel';
  document.getElementById('presentation-container').appendChild(commandPanelEl);

  cheet('↑ ↑ ↓ ↓ ← → ← → b a', {
      next: function(str, key, num, seq) {
        commandPanelEl.classList.add('active');
        commandPanelEl.innerHTML += ' <span class="easter-egg-key">' + key + '</span> ';
        var lastAddedKeyEl = commandPanelEl.querySelectorAll('.easter-egg-key:last-child')[0];
        lastAddedKeyEl.classList.add('active');
      },
      fail: function() {
        commandPanelEl.classList.remove('active');
        commandPanelEl.innerHTML = '';
      },
      done: function() {
        // super mario audio from: http://themushroomkingdom.net/media/smw/wav
        var soundNames = ['1-up', 'coin', 'egg_hatching'],
          soundPath = 'audio/smw_' + soundNames[Math.floor(Math.random()*soundNames.length)] + '.wav',
          audio = new Audio(soundPath);

        audio.play();

        commandPanelEl.classList.remove('active');
        setTimeout(function() {
          commandPanelEl.innerHTML = '';
        }, 200);
      }
    }
  );

  return function() {};
};