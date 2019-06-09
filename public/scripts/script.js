var numberOfLinks = document.querySelectorAll('nav.top li').length;

for(var i = 2; i<numberOfLinks+1; i++){
  var link = document.querySelector(`nav.top li:nth-child(${i}) a`);

  if(window.location.href.indexOf(link.getAttribute('href'))>1){
    link.classList.add('current');
    break;
  }
  else if(i===numberOfLinks){
    document.querySelector('nav.top li:first-child a').classList.add('current');
    break;
  }
}
