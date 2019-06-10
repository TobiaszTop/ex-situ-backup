if(document.querySelector('main#examples')){
  var numberOfButtons = document.querySelectorAll('#examples button').length;

  for(var i=1; i<numberOfButtons+1; i++){
    var button = document.querySelector(`#examples button:nth-of-type(${i})`);
    button.setAttribute('name', i);
    button.addEventListener('click', function(){
      for(var i=1; i<numberOfButtons+1; i++){
        var section = document.querySelector(`#examples div.ex:nth-of-type(${i})`);
        var button = document.querySelector(`#examples button:nth-of-type(${i})`);
        section.classList.remove('show');
        button.classList.remove('show');
      }
      var n = this.getAttribute('name');
      document.querySelector(`#examples button:nth-of-type(${n})`).classList.add('show');
      document.querySelector(`#examples div.ex:nth-of-type(${n})`).classList.add('show');
    });
  }
}

var numberOfLinks = document.querySelectorAll('nav.top li').length;
for(var i=2; i<numberOfLinks+1; i++){
  var link = document.querySelector(`nav.top li:nth-of-type(${i}) a`);

  if(window.location.href.indexOf(link.getAttribute('href'))>1){
    link.classList.add('current');
    break;
  }
  else if(i===numberOfLinks){
    document.querySelector('nav.top li:first-child a').classList.add('current');
    break;
  }
}
