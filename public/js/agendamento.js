function enviarWhatsApp(numeroWhatsApp) {

    // A ser modificado caso tenhamos um modificar numero do ADM
    //formato só de numero ex: 5521988888888
    // const numeroWhatsApp = "5521964156474" ou - melhor como parametro da função;

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const motivo = document.getElementById("motivo").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    const mensagem = `Olá! Gostaria de agendar uma consulta.%0A%0A
    *Nome:* ${nome}%0A%0A
    *E-mail:* ${email}%0A%0A
    *Telefone:* ${telefone}%0A%0A
    *Motivo da consulta:* ${motivo}%0A%0A
    *Data desejada:* ${data}%0A%0A
    *Horário preferencial:* ${hora}%0A%0A
    Aguardo confirmação, obrigada!`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(url, "_blank");

}