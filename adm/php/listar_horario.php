<?php
include __DIR__ . '/conexao.php';

$sql = "SELECT * FROM horario_funcionamento ORDER BY id ASC";
$res = $conn->query($sql);

if ($res->num_rows > 0) {
    while ($h = $res->fetch_assoc()) {
        
        $inicio = substr($h['hora_inicio'],0,5);
        $fim    = substr($h['hora_fim'],0,5);

        echo "<tr>
            <td>{$h['dia_semana']}</td>
            <td>$inicio</td>
            <td>$fim</td>
            <td class='acoes'>
                <button class='editar' onclick=\"window.location.href='alterar_dia_de_fechamento.html?id={$h['id']}'\">
                    <i class='fa-solid fa-pen-to-square'></i>
                </button>
            </td>
        </tr>";
    }
} else {
    echo "<tr><td colspan='4'>Nenhum horário cadastrado.</td></tr>";
}
?>
