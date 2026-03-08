# Snippets Frontend

Фронтенд‑частина застосунку для роботи зі snippets (короткими записами).  
Можливості: створення, перегляд, пошук, фільтрація за тегами, CRUD‑операції, базова валідація форм, інтеграція з API.

---

## 🚀 Запуск локально

1.  Клонувати репозиторій і перейти в нього

```bash
git clone https://github.com/Mykhailenko-Oleksandr/arctic-web-test
cd arctic-web-test
```

2.  Встановити залежності

```bash
npm install
```

3. Запустити dev‑сервер

```bash
npm run dev
```

## 🔍 Перевірка API

Фронтенд працює з бекенд‑ендпоінтами. Для тестування можна використати curl або Postman.

1. Отримати всі snippets

```bash
Postman/curl http://localhost:3000/api/snippets
```

2. Створити snippet

```bash
Postman/curl -X POST http://localhost:3000/api/snippets \
 -H "Content-Type: application/json" \
 -d '{
"title": "Мій перший snippet",
"content": "Це тестовий запис",
"tag": ["Work"],
"type": "Note"
}'
```

## 📦 Білд та запуск у продакшн‑режимі

1. Зібрати застосунок

```bash
npm run build
```

2. Запустити у продакшн‑режимі

```bash
npm run start
```

За замовчуванням застосунок працює на порту 3000.

## 🌐 Тестовий деплой

Демо‑версія доступна за посиланням:

Vercel: ([arctic-web-test.vercel.app](https://arctic-web-test.vercel.app))
