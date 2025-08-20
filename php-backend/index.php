<?php
// Simple PHP JSON backend router for submissions

declare(strict_types=1);

$DB_FILE = __DIR__ . '/db.json';

// CORS (adjust origins as needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$base = trim($uri, '/');
$segments = array_values(array_filter(explode('/', $base)));

if (count($segments) < 2 || $segments[0] !== 'api' || $segments[1] !== 'submissions') {
    sendJson(['error' => 'Not Found'], 404);
}

// helper: read DB safely
function read_db(string $path): array {
    if (!file_exists($path)) {
        file_put_contents($path, json_encode(['submissions' => []], JSON_PRETTY_PRINT));
    }
    $raw = file_get_contents($path);
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return ['submissions' => []];
    }
    return $data;
}

// helper: write DB with lock
function write_db(string $path, array $data): bool {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $fp = fopen($path, 'c+');
    if (!$fp) return false;
    if (!flock($fp, LOCK_EX)) { fclose($fp); return false; }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, $json);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return true;
}

function sendJson($payload, int $code = 200): void {
    http_response_code($code);
    echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// route handling
$id = $segments[2] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
$data = read_db($DB_FILE);
$subs = $data['submissions'] ?? [];

if ($method === 'GET' && $id === null) {
    // list
    sendJson(['submissions' => array_values($subs)]);
}

if ($method === 'GET' && $id !== null) {
    foreach ($subs as $s) {
        if ((string)($s['id'] ?? '') === (string)$id) {
            sendJson($s);
        }
    }
    sendJson(['error' => 'Not Found'], 404);
}

$body = json_decode(file_get_contents('php://input'), true);

if ($method === 'POST' && $id === null) {
    if (!is_array($body)) sendJson(['error' => 'Invalid JSON body'], 400);
    // basic validation (adjust fields as needed)
    $required = ['name', 'email', 'message'];
    foreach ($required as $f) {
        if (empty($body[$f])) sendJson(['error' => "Missing field: $f"], 400);
    }
    // generate id
    $maxId = 0;
    foreach ($subs as $s) { $maxId = max($maxId, intval($s['id'] ?? 0)); }
    $new = [
        'id' => $maxId + 1,
        'name' => strip_tags(trim((string)$body['name'])),
        'email' => filter_var((string)$body['email'], FILTER_SANITIZE_EMAIL),
        'message' => trim((string)$body['message']),
        'created_at' => gmdate('c')
    ];
    $subs[] = $new;
    $data['submissions'] = $subs;
    if (!write_db($DB_FILE, $data)) sendJson(['error' => 'Failed to write DB'], 500);
    sendJson($new, 201);
}

if ($method === 'PUT' && $id !== null) {
    if (!is_array($body)) sendJson(['error' => 'Invalid JSON body'], 400);
    $found = false;
    foreach ($subs as &$s) {
        if ((string)($s['id'] ?? '') === (string)$id) {
            // update allowed fields
            if (isset($body['name'])) $s['name'] = strip_tags(trim((string)$body['name']));
            if (isset($body['email'])) $s['email'] = filter_var((string)$body['email'], FILTER_SANITIZE_EMAIL);
            if (isset($body['message'])) $s['message'] = trim((string)$body['message']);
            $s['updated_at'] = gmdate('c');
            $found = true;
            $updated = $s;
            break;
        }
    }
    if (!$found) sendJson(['error' => 'Not Found'], 404);
    $data['submissions'] = $subs;
    if (!write_db($DB_FILE, $data)) sendJson(['error' => 'Failed to write DB'], 500);
    sendJson($updated);
}

if ($method === 'DELETE' && $id !== null) {
    $newList = [];
    $found = false;
    foreach ($subs as $s) {
        if ((string)($s['id'] ?? '') === (string)$id) { $found = true; continue; }
        $newList[] = $s;
    }
    if (!$found) sendJson(['error' => 'Not Found'], 404);
    $data['submissions'] = $newList;
    if (!write_db($DB_FILE, $data)) sendJson(['error' => 'Failed to write DB'], 500);
    sendJson(['status' => 'deleted']);
}

sendJson(['error' => 'Method Not Allowed'], 405);