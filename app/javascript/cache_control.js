window.onunload = function() {};
window.addEventListener("pageshow", function(event){
  if (event.persisted) {
    window.location.reload();
  }
});