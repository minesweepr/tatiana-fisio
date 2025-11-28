let graficoPizza = null;
let graficoBarra = null;

function atualizarGraficos(consultasTurno, consultasDias) {

    // destruir gráfico anterior se existir
    if (graficoPizza) graficoPizza.destroy();
    if (graficoBarra) graficoBarra.destroy();

    //pizza
    graficoPizza = new Chart(document.getElementById("graficoPizza"), {
        type: "pie",
        data: {
            labels: Object.keys(consultasTurno),
            datasets: [{
                data: Object.values(consultasTurno),
                backgroundColor: ["#27A9E3", "#87b7ca", "#2E3740"]
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        }
    });

    //semana
    graficoBarra = new Chart(document.getElementById("graficoBarra"), {
        type: "bar",
        data: {
            labels: Object.keys(consultasDias),
            datasets: [{
                label: "Consultas por dia",
                data: Object.values(consultasDias),
                backgroundColor: "#27A9E3"
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });

}

function carregarDashboard() {
    fetch('../php/listar_dashboard.php')
        .then(res => res.json())
        .then(dados => {
            console.log(dados);
            
            // 1) Total de clientes
            document.getElementById('totalClientes').textContent = dados.qtdcliente;

            // 2) Clientes ativos
            document.getElementById('clientesAtivos').textContent = dados.qtdAtivos;

            // 3) Consultas da próxima semana
            document.getElementById('consultasSemana').textContent = dados.proxSemana;
            
            // 4) Pizza total consultas por turno

            const consultasTurno = {};
            dados.consultasTurno.forEach(item => {
                consultasTurno[item.periodo] = parseInt(item.quantidade);
            });

            // 5) Lista qtd consulta por dia da semana

            const consultasDias = {};
            dados.qtdDiaDaSemana.forEach(item => {
                consultasDias[item.dia_semana] = parseInt(item.quantidade);
            });

            // envia para os gráficos
            atualizarGraficos(consultasTurno, consultasDias);

            /* 6) Consultas Recentes (2 últimas) */
            const htmlConsultasRecentes = document.getElementById('consultasRecentes');
            htmlConsultasRecentes.innerHTML = "";

            (dados.consultasRecentes || []).forEach(item => {
                const statusClass = item.status == 1 ? "status-ativo" : "status-inativo";
                const statusTexto = item.status == 1 ? "Ativo" : "Inativo";

                htmlConsultasRecentes.innerHTML += `
                    <li>
                        Tipo de consulta
                        <span class="${statusClass}">${statusTexto}</span>
                    </li>
                `;
            });


            /* 7) Clientes Recentes (2 últimos cadastrados) */
            const htmlClientesRecentes = document.getElementById('clientesRecentes');
            htmlClientesRecentes.innerHTML = ""; // limpa antes

            (dados.clientesRecentes || []).forEach(item => {
                htmlClientesRecentes.innerHTML += `
                    <li>
                        ${item.nome}
                        <a href="clientes.html?id=${item.id}" class="ver-mais">ver mais</a>
                    </li>
                `;
            });

        })
        .catch(err => {
            alert('Erro ao carregar dados do dashboard: ' + err);
        });
}

// Quando abrir a página, carrega tudo
window.onload = () => carregarDashboard();
