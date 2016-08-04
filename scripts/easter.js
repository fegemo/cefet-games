module.exports = function() {
  var cheet = require('cheet.js'),
    commandPanelEl = document.createElement('aside');

  commandPanelEl.id = 'easter-egg-panel';
  document.getElementById('presentation-container').appendChild(commandPanelEl);

  cheet('↑ ↑ ↓ ↓ ← → ← → b a', {
    next: function(str, key) {
      commandPanelEl.classList.add('active');
      commandPanelEl.innerHTML += ' <span class="easter-egg-key">' + key + '</span> ';
      var lastAddedKeyEl = commandPanelEl.querySelectorAll('.easter-egg-key:last-child')[0];
      setTimeout(function() {
        lastAddedKeyEl.classList.add('active');
      },0);
    },
    fail: function() {
      commandPanelEl.classList.remove('active');
      commandPanelEl.innerHTML = '';
    },
    done: function() {
      // super mario audio from: http://themushroomkingdom.net/media/smw/wav
      var soundNames = ['1-up', 'coin', 'egg_hatching'],
        chosenSoundName = 'smw_' + soundNames[Math.floor(Math.random()*soundNames.length)] + '.wav',
        chosenSoundPath = (location.pathname.indexOf('/classes/') === 0 ? '../../' : '') + 'audio/' + chosenSoundName,
        audio = new Audio(chosenSoundPath);

      audio.play();

      commandPanelEl.classList.remove('active');
      setTimeout(function() {
        commandPanelEl.innerHTML = '';
      }, 200);
    }
  });

  return function() {};
};
