# Руководство по развертыванию

## Требования к окружению

- Node.js >= 20.x
- npm >= 10.x

## Поддерживаемые браузеры

- chrome family >= 96
- firefox >= 95
- safari >= 15

## Установка зависимостей

```bash
npm install
```

## Сборка проекта

```bash
npm run build
```

Эта команда:
1. Выполняет проверку типов TypeScript (`tsc -b`)
2. Собирает оптимизированную production-версию (`vite build`)

## Результат сборки

Готовые файлы находятся в папке `dist/`

## Превью production-сборки

Локальный просмотр собранной версии:

```bash
npm run preview
```

Приложение будет доступно по адресу: `http://localhost:4173`

## Развертывание

Загрузите содержимое папки `dist/` на ваш веб-сервер (Nginx, Apache, или статический хостинг).

### Пример конфигурации Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # MIME-типы
    include /etc/nginx/mime.types;

    # API проксирование
    location /api/ {
        proxy_pass http://backend-server:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
