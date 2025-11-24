//verifica quantidade de imagens a serem visualizadas nos slides.
function renderizarFotos() {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 580) return 2;
    return 1;
}

// Função principal para iniciar slideshows/slider
function iniciarSlideShow(sliderShow, dotsContainer, slideIndice) {
    const slideImg = sliderShow.querySelectorAll('section');
    let dots = dotsContainer.querySelectorAll('.dot');
    let indiceAtual = 0;

    // atualiza dinamicamente a quantidade de pontos de navegação do slide (devido ao redimensiomento de tela)
    function atualizarDots() {
        const visivel = renderizarFotos();
        const total = slideImg.length;
        let numDots;

        // Define o número de dots(pontos) conforme a largura da tela
        if (window.innerWidth > 300) {
            if(visivel == 2) {
                numDots = total - 1; // de 2 em 2
            } else if(visivel >= 3) {
                numDots = total - 2 // de 2 dots 3 imgs
            } else {
                numDots = total; // fallback
            }
        }
        else
        {
            numDots = total;
        }

        dotsContainer.innerHTML = '';

        if (numDots > 0) {
            for (let i = 0; i < numDots; i++) {
                const btn = document.createElement('button');
                btn.classList.add('dot');
                btn.dataset.indice = i;
                btn.innerHTML = `<i class="fa-solid fa-circle" style="color: #000000;"></i>`;
                btn.addEventListener('click', () => moverSlide(i, slideIndice));
                dotsContainer.appendChild(btn);
            }

            dots = dotsContainer.querySelectorAll('.dot');
            dots[0]?.classList.add('active');
        } else {
            dots = [];
        }
    }

    // determina largura total da foto a ser pulada, contando espaços extras do css
    function getPasso(slideImg) {
        const container = slideImg[0].parentElement;
        const containerStyle = window.getComputedStyle(container);
        const gap = parseFloat(containerStyle.gap) || 0;
        const larguraSlide = slideImg[0].getBoundingClientRect().width;
        return larguraSlide + gap;
    }

    // Função genérica que calcula moverX, recebe uma função de comportamento
    function calcularMoverX(indice, slideImg, visivel, comportamento) {
        const passo = getPasso(slideImg);
        return comportamento(indice, slideImg, visivel, passo);
    }

    // === comportamentos específicos ===

    // slide1: centraliza em mobile. padrão (largura, 0, -largura)
    function comportamento_slide1(indice, slideImg, visivel, passo) {
        const total = slideImg.length;
        if (visivel === 2) {
            const maxIndice = total - visivel;
            const imgIndice = Math.min(indice, maxIndice);
            // centraliza quando só há 3 imgs e 2 visíveis
            const offsetExtra = (visivel > 1 && total === 3) ? passo / 2 : 0;
            return -imgIndice * passo + offsetExtra;
        } else {
            return (1 - indice) * passo;
        }
    }

    // slide2: padrão (0, -largura, -2x largura)
    function comportamento_slide2(indice, slideImg, visivel, passo) {
        // const total = slideImg.length;
        // if (indice === 0) return 0;
        // if (visivel >= total) return 0;
        // if (visivel === 2 || visivel === 3) {
        //     const maxIndice = total - visivel;
        //     const imgIndice = Math.min(indice, maxIndice);
        //     return -imgIndice * passo;
        // }
        // return -indice * passo;

         const total = slideImg.length;
         console.log(total + " slide length img")
        if (visivel >=4) {
            return 0
        } else if (visivel === 3) {
            const maxIndice = total - visivel;
            const imgIndice = Math.min(indice, maxIndice);
            // centraliza as 3 imgs visíveis
            const offsetExtra = (visivel > 1 && total === 4) ? passo : 0;
            return -imgIndice * passo + offsetExtra * 0.5;
        } else if (visivel === 2) {
            const maxIndice = total - visivel;
            const imgIndice = Math.min(indice, maxIndice);
            // centraliza as 2 imgs visíveis
            const offsetExtra = (visivel > 1 && total === 4) ? passo : 0;
            return -imgIndice * passo + offsetExtra;
        } else {
            // centraliza a 1 visível
            return (1 - indice) * passo + passo/2;
        }
    }

    // de fato move as imagens ao clicar no botao dot
    function moverSlide(indice, slideIndice) {
        const visivel = renderizarFotos();

        let moverX = 0;

        //somente no slide #serv

            if ((visivel >= 3 && slideIndice === 0) || visivel >= 4) {
                //sem botoes caso seja telas grandes, que caibam 3 fotos.
                dotsContainer.style.visibility = 'hidden';
            }
            else {
                dotsContainer.style.visibility = 'visible';

                //indicie
                if (slideIndice === 1) {
                    moverX = calcularMoverX(indice, slideImg, visivel, comportamento_slide2);
                }
                else
                {
                    moverX = calcularMoverX(indice, slideImg, visivel, comportamento_slide1);
                }
            }
        
        
        //move o slide/img
        sliderShow.style.transform = `translateX(${moverX}px)`;

        // Atualiza visibilidade dos slides
        slideImg.forEach((slide, i) => {
            if (window.innerWidth <= 300) {
                slide.classList.toggle('inactive', i !== indice);
            } else if (visivel >= 2) {
                const maxIndice = slideImg.length - visivel;
                const imgIndice = Math.min(indice, maxIndice);
                slide.classList.toggle('inactive', !(i >= imgIndice && i < imgIndice + visivel));
            } else {
                slide.classList.toggle('inactive', i !== indice);
            }
        });

        // Atualiza dots
        dots.forEach((dot, i) => dot.classList.toggle('active', i === indice));
        indiceAtual = indice;
    }


    // Atualiza responsivamente
    window.addEventListener('resize', () => {
        atualizarDots();
        moverSlide(indiceAtual, slideIndice);
    });

    // Inicializa
    atualizarDots();
    moverSlide(0, slideIndice);
}

// Captura todos os grupos de slideshows
const slideshows = document.querySelectorAll('.slide-serv');
const dotsGroups = document.querySelectorAll('section > nav.dots');

// Executa para cada slideshow encontrado
slideshows.forEach((slider, i) => {
    const dotsContainer = dotsGroups[i];
    if (dotsContainer) iniciarSlideShow(slider, dotsContainer, i);
});

// ======================
// AVALIAÇÕES DE CLIENTES
// ======================

const avaliacoes = [
  {
    nome: "ANA PAULA M.",
    texto: `Meu filho adorava as sessões com a Tati! 
    Ela tem um jeito único de transformar o tratamento 
    em momentos de alegria e aprendizado. A evolução 
    dele foi incrível, e tudo aconteceu de forma leve 
    e acolhedora. Profissional maravilhosa, atenciosa 
    e extremamente dedicada!` 
  },
  {
    nome: "MARIANA E JOÃO V.",
    texto: `Depois da cirurgia do meu filho, 
    a recuperação parecia difícil, mas com a 
    doutora tudo ficou mais leve. Ela fez 
    questão de acompanhar cada progresso e 
    comemorar junto. Me senti segura desde o 
    primeiro atendimento. Recomendo de olhos 
    fechados, eu e meu marido agradecemos muito!`
  },
  {
    nome: "RODRIGO FERREIRA S.",
    texto: `Fisioterapia significa qualidade de vida. 
    E essa profissional realizou a volta dos meus 
    movimentos pós AVC. Eu só tenho a agradecer pelo 
    seu trabalho, dedicação e paciência durante todo 
    o tratamento. Muito obrigado, Doutora Tatiana Fernandes!`  
  }
];

let indiceAv = 0;

function atualizarAvaliacao() {
  const pAv = document.querySelector("#avaliacoes article p");
  const nomeCliente = document.querySelector("#cliente-avaliacao section span");
  
  if (!pAv || !nomeCliente) return; 
  pAv.textContent = `“${avaliacoes[indiceAv].texto}”`;
  nomeCliente.textContent = avaliacoes[indiceAv].nome;
}

function proxima() {
  indiceAv++;
  if (indiceAv >= avaliacoes.length) indiceAv = 0;
  atualizarAvaliacao();
}

function anterior() {
  indiceAv--;
  if (indiceAv < 0) indiceAv = avaliacoes.length - 1;
  atualizarAvaliacao();
}

