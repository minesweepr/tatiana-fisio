
const menuBtn = document.querySelector('.menu-btn');
const menuAberto = document.querySelector('.menu');

function AcionarMenu() {
    // abre e fecha menu de telas pequenas
    menuAberto.classList.toggle("menu-toggle");
    menuBtn.classList.toggle("btn-toggle");
    
    if(menuBtn.classList.contains("btn-toggle"))
    {   
        menuBtn.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #ffffff; font-size: 28px;"></i>`;
    }
    else{
        menuBtn.innerHTML = `<i class="fa-solid fa-bars" style="color: #000000; font-size: 20px;">`;
    }
}

let estavaAberto;

window.addEventListener('resize', () => {
    // força fechamento de menu caso aba esteja aberta durante redimensionamento

    if (window.innerWidth >= 900)
    {
        if(!(menuAberto.classList.contains("menu-toggle")) && menuBtn.classList.contains("btn-toggle")) {
           AcionarMenu();

           menuAberto.classList.add("menu-toggle");
           menuBtn.classList.remove("btn-toggle");
        }
 
    }
});