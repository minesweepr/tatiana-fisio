<?php
header('Content-Type: application/json');
include __DIR__ . '/conexao.php';

$response = [];

// 1) Total de clientes e ativos
$sql = "SELECT 
            COUNT(*) AS total_clientes,
            SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS clientes_ativos
        FROM clientes";
$result = $conn->query($sql);
$data = $result->fetch_assoc();
$response['qtdcliente'] = (int)$data['total_clientes'];
$response['qtdAtivos'] = (int)$data['clientes_ativos'];

// 2) Consultas da próxima semana
$sql = "SELECT COUNT(*) AS qtd_prox_semana
        FROM clientes
        WHERE status = 1
          AND data BETWEEN
              DATE_ADD(CURDATE(), INTERVAL (8 - DAYOFWEEK(CURDATE())) DAY)
              AND DATE_ADD(CURDATE(), INTERVAL (14 - DAYOFWEEK(CURDATE())) DAY)";
$result = $conn->query($sql);
$response['proxSemana'] = (int)($result->fetch_assoc()['qtd_prox_semana'] ?? 0);

// 3) Consultas por turno
$sql = "SELECT 
            CASE 
                WHEN hora < '12:00:00' THEN 'Manhã'
                WHEN hora < '18:00:00' THEN 'Tarde'
                ELSE 'Noite'
            END AS periodo,
            COUNT(*) AS quantidade
        FROM clientes
        GROUP BY periodo";
$result = $conn->query($sql);
$response['consultasTurno'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// 4) Consultas por dia da semana
$sql = "SELECT 
            dias.nome AS dia_semana,
            COALESCE(c.quantidade,0) AS quantidade
        FROM (
            SELECT 'Segunda' AS nome, 0 AS idx UNION ALL
            SELECT 'Terça', 1 UNION ALL
            SELECT 'Quarta', 2 UNION ALL
            SELECT 'Quinta', 3 UNION ALL
            SELECT 'Sexta', 4 UNION ALL
            SELECT 'Sábado', 5 UNION ALL
            SELECT 'Domingo', 6
        ) AS dias
        LEFT JOIN (
            SELECT WEEKDAY(data) AS idx, COUNT(*) AS quantidade
            FROM clientes
            GROUP BY WEEKDAY(data)
        ) AS c
        ON dias.idx = c.idx
        ORDER BY dias.idx";
$result = $conn->query($sql);
$response['qtdDiaDaSemana'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// 5) Consultas recentes (2 últimas)
$sql = "SELECT id, nome, status, data, hora
        FROM clientes
        ORDER BY data DESC, hora DESC
        LIMIT 2";
$result = $conn->query($sql);
$response['consultasRecentes'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// 6) Clientes recentes (2 últimos cadastrados)
$sql = "SELECT id, nome 
        FROM clientes
        ORDER BY id DESC
        LIMIT 2";
$result = $conn->query($sql);
$response['clientesRecentes'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Retorna JSON
echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
?>
