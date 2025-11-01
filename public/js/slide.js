//verifica quantidade de imagens a serem visualizadas nos slides.
function renderizarFotos() {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 580) return 2;
    return 1;
}

// Função principal para iniciar slideshows/slider
function iniciarSlideShow(sliderShow, dotsContainer, slideId) {
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
            } else if(visivel === 3) {
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
                btn.addEventListener('click', () => moverSlide(i, slideId));
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
            const slideIndice = Math.min(indice, maxIndice);
            // centraliza quando só há 3 imgs e 2 visíveis
            const offsetExtra = (visivel > 1 && total === 3) ? passo / 2 : 0;
            return -slideIndice * passo + offsetExtra;
        } else {
            const centro = 1;
            return (centro - indice) * passo;
        }
    }

    // slide2: padrão (0, -largura, -2x largura)
    function comportamento_slide2(indice, slideImg, visivel, passo) {
        const total = slideImg.length;
        if (indice === 0) return 0;
        if (visivel >= total) return 0;
        if (visivel === 2 || visivel === 3) {
            const maxIndice = total - visivel;
            const slideIndice = Math.min(indice, maxIndice);
            return -slideIndice * passo;
        }
        return -indice * passo;
    }

    // de fato move as imagens ao clicar no botao dot
    function moverSlide(indice, slideId) {
        const visivel = renderizarFotos();

        let moverX = 0;

        //somente no slide #serv
        if (slideId === 0) {
            if (visivel >= 3) {
                //sem botoes caso seja telas grandes, que caibam 3 fotos.
                dotsContainer.style.visibility = 'hidden';
            }
            else {
                dotsContainer.style.visibility = 'visible';
                moverX = calcularMoverX(indice, slideImg, visivel, comportamento_slide1);
            }
        } else if (slideId === 1) {
            moverX = calcularMoverX(indice, slideImg, visivel, comportamento_slide2);
        }

        //move o slide/img
        sliderShow.style.transform = `translateX(${moverX}px)`;

        // Atualiza visibilidade dos slides
        slideImg.forEach((slide, i) => {
            if (window.innerWidth <= 300) {
                // método antigo → visibilidade só com inactive
                slide.classList.toggle('inactive', i !== indice);
            } else if (visivel === 2 || (visivel === 3)) {
                const maxIndice = slideImg.length - visivel;
                const slideIndice = Math.min(indice, maxIndice);
                slide.classList.toggle('inactive', !(i >= slideIndice && i < slideIndice + visivel));
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
        moverSlide(indiceAtual, slideId);
    });

    // Inicializa
    atualizarDots();
    moverSlide(0, slideId);
}

// Captura todos os grupos de slideshows
const slideshows = document.querySelectorAll('.slide-serv');
const dotsGroups = document.querySelectorAll('section > nav.dots');

// Executa para cada slideshow encontrado
slideshows.forEach((slider, i) => {
    const dotsContainer = dotsGroups[i];
    if (dotsContainer) iniciarSlideShow(slider, dotsContainer, i);
});