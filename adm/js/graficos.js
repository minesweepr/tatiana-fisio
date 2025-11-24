//exemplo, sera integrado com bdd
const consultasTipos={
    "x": 25,
    "y": 40,
    "z": 15
};

//exemplo, sera integrado com bdd
const consultasDias={
    "Seg": 4,
    "Ter": 6,
    "Qua": 3,
    "Qui": 5,
    "Sex": 2
};


//pizza
new Chart(document.getElementById("graficoPizza"), {
    type: "pie",
    data: {
        labels: Object.keys(consultasTipos),
        datasets: [{
            data: Object.values(consultasTipos),
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
new Chart(document.getElementById("graficoBarra"), {
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