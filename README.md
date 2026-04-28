# Harmonogram 

Prosty projekt zaliczeniowy: aplikacja do zarządzania zadaniami w podziale na dni tygodnia.

Projekt składa się z:

- frontendu w Angularze,
- backendu w Kotlinie i Spring Boot,
- bazy danych PostgreSQL,
- konfiguracji Docker Compose z Caddy jako reverse proxy.

## Uruchomienie w Dockerze

Wymagania:

- Docker,
- Docker Compose.

Uruchomienie aplikacji:

```bash
docker compose up --build
```

Po starcie aplikacja będzie dostępna pod adresem:

```text
http://localhost:3000
```

Port można zmienić przez zmienną środowiskową `APP_PORT`, np.:

```bash
APP_PORT=8080 docker compose up --build
```

## Struktura projektu

```text
.
├── backend/      # API REST w Kotlinie i Spring Boot
├── frontend/     # aplikacja webowa w Angularze
├── compose.yml   # konfiguracja usług Docker Compose
├── Caddyfile     # reverse proxy dla frontendu i API
└── .github/      # konfiguracja GitHub Actions
```

## Backend

Backend udostępnia API dla zadań pod ścieżką:

```text
/api/todos
```

Lokalne zbudowanie backendu:

```bash
cd backend
./gradlew build --no-daemon
```

## Frontend

Frontend wyświetla zadania w kolumnach odpowiadających dniom tygodnia. Umożliwia dodawanie, edycję i usuwanie zadań.

Lokalne zbudowanie frontendu:

```bash
cd frontend
npm ci
npm run build
```

## CI

Projekt zawiera workflow GitHub Actions, który sprawdza:

- build backendu,
- build frontendu,
- konfigurację i build obrazów Docker Compose.

Workflow uruchamia się dla `push` oraz `pull_request`.
