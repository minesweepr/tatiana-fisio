//links de img pra teste e link de post reais que ficam legais de serem usados.
// com api, isso será substituido por um json ??
const dados = {
  banners: [
    { link: "https://www.instagram.com/p/DN3siA7Qjjs/", img: "../src/galeria-img/a.jpg" },
    { link: "https://www.instagram.com/p/DN6Pwr8ASSx/", img: "../src/galeria-img/b.jpg" },
    { link: "https://www.instagram.com/p/DN-8XfADb4Y/", img: "../src/galeria-img/c.jpg" },
    { link: "https://www.instagram.com/p/DPv75xDDRGg/", img: "../src/galeria-img/d.jpg" }
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