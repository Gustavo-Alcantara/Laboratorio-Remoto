var ide = CodeMirror.fromTextArea(document.getElementById('codigo'), {
    styleActiveLine: true,
    smartIdent:true,
    lineNumbers:true,
    lineWrapping: true,
    mode: "text/x-csrc"
});
const linha_atual = (instance)=>{
    document.getElementById('num').innerText = ide.getCursor().line + 1;
}
var estagio = document.getElementById('estagio');
function modificado(){
    estagio.innerText = 'Alterado.'
}
ide.on('cursorActivity', linha_atual);
ide.on('change', modificado);


var botoes = document.getElementsByTagName('Button');
for(let i = 0; i< botoes.length; i++){
    botoes[i].onmouseover= () =>{
        document.getElementById('secao_botoes').innerText = botoes[i].id + '.';
    }
    botoes[i].onmouseleave = () =>{
        document.getElementById('secao_botoes').innerText = '';
    }
}
const btn_arquivo = document.getElementById('Abrir arquivo');
btn_arquivo.onmouseover  = () =>{
    document.getElementById('secao_botoes').innerText = btn_arquivo.id + '.';
}
btn_arquivo.onmouseleave  = () =>{
    document.getElementById('secao_botoes').innerText =  '';
}

var monitor = document.getElementById('lbl_monitor');
monitor.onmouseover  = () =>{
    document.getElementById('span_monitor').innerText = 'Monitor';
}
monitor.onmouseleave  = () =>{
    document.getElementById('span_monitor').innerText =  '';
}

document.getElementById("Abrir").addEventListener("change", (event) => {

    var reader = new FileReader();

    reader.addEventListener('loadend', function() {
      ide.getDoc().setValue(this.result);
      document.getElementById("nome_arquivo").innerText = event.target.files[0].name;
    });

    reader.readAsText(document.querySelector('input').files[0]);

});
const head_monitor = document.getElementById('monitor_head');
const monitor_serial = document.getElementById('serial');
monitor.onclick = () =>{
    if(monitor_serial.style.visibility === 'hidden'){
        monitor_serial.style.visibility = 'visible';
    }
    else{
        monitor_serial.style.visibility = 'hidden';
    }
}

dragElement(monitor_serial);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "_head")) {

    document.getElementById(elmnt.id + "_head").onmousedown = dragMouseDown;
  } else {

    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
    
