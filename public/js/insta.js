//links de img pra teste e link de post reais que ficam legais de serem usados.
// com api, isso será substituido por um json ??
const dados = {
  banners: [
    { link: "https://www.instagram.com/p/DPXCULsiWw7/", img: "https://file.garden/aSTP81QTr1Qzar74/img6.PNG" },
    { link: "https://www.instagram.com/p/DRSQqfuEQzm/", img: "https://file.garden/aSTP81QTr1Qzar74/img1.PNG" },
    { link: "https://www.instagram.com/p/DRU-M2gCcea/", img: "https://file.garden/aSTP81QTr1Qzar74/img2.PNG" },
    { link: "https://www.instagram.com/p/DPv75xDDRGg/", img: "https://file.garden/aSTP81QTr1Qzar74/img4.PNG" }
  ]
};

let cont = 0;
// Pega todas as seções com a classe 'galeria-insta'
const galeriaSections = document.getElementsByClassName('galeria-insta');

// Para cada seção, adiciona todos os banners/post do insta
// renderizando o html 
Array.from(galeriaSections).forEach((gSection, i) => {
  dados.banners.forEach(item => {
    const section = document.createElement('section');

    const a = document.createElement('a');
    a.href = item.link;
    a.target = "_blank";

    const img = document.createElement('img');
    img.src = item.img;
    img.classList.add('banner');

    // para que a imagem seja carregada mais lentamente
    // impedir travamentos
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    section.appendChild(a);
    a.appendChild(img);

    const ico = document.createElement('i');
    ico.classList.add('fa-brands');
    ico.classList.add('fa-instagram');

    a.appendChild(ico);
    gSection.appendChild(section);
  });
});