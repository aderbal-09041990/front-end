$('.teste').on('click', function(e) {
  console.log("clicou")
  if($(e.target).is('a')) return true;
  alert('Click');
  return false;
});
