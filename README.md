# SHRI Analytics Interface

Интерфейс Сервиса межгалактической аналитики, реализованный на React + TypeScript с использованием Vite, Zustand и CSS Modules.

## Функциональность

- Загрузка таблиц через `Uploader` и получение аналитики в реальном времени (стриминг)
- Генерация тестовых таблиц
- История загрузок, сохранённая в LocalStorage
- Навигация по разделам (Аналитика, Генерация, История)
- Модальные окна с подробной аналитикой

## Технологии

- **React + TypeScript**
- **Vite** — сборка
- **Zustand** — управление состоянием
- **CSS Modules** — стилизация
- **react-router-dom** — роутинг
- **Fetch API** — запросы к бэкенду
- **React Portals** — модальные окна
- **ESLint + Prettier** — линтинг и автоформатирование
- **LocalStorage** — история загрузок

## Архитектура проекта

```
src/
├── api/                  # Запросы на бэкэнд
├── ui/
    ├── components/       # Переиспользуемые UI-компоненты
        ├── Component/    # Пример компонента
            ├── Component.tsx
            ├── Component.module.css
            ├── Component.types.ts
    ├── pages/            # Страницы: Analysis, History, Generate
├── store/                # Zustand-хранилище
├── assets/               # svg-иконки
├── utils/                # Утилиты: преобразаование даты
├── shared/types          # Глобальные типы
├── App.tsx               # Главный компонент с роутингом
└── main.tsx              # Точка входа
```

Каждая страница реализует один раздел интерфейса:

- **Analysis Page** — загрузка таблиц и отображение статистики
- - Загрузка csv-файла через компонент Uploader и парсинг файла в реальном времени при нажатии на кнопку "Отправить"
- **Generate Page** — генерация тестовых таблиц
- - Генерация csv-файла при нажатии кнопки "Сгенерировать файл"
- **History Page** — история загрузок (данные хранятся в `LocalStorage`)
- - Просмотр истории отправленных для парсинга файлов, возможность просмотра результата парсинга при нажатии на загрузку. Очистка элементов истории и истории полностью, кнопка с редиректом на генерацию файлов.

Состояние обрабатывается через `Zustand`, данные передаются по стриму с сервера и накапливаются на фронте для плавного отображения прогресса.

## Запуск проекта

### 1. Клонировать репозиторий

```bash
git clone https://github.com/dorokhinvitaliy/SHRI.git
cd SHRI
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Запустить dev-сервер

```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

> Бэкенд должен быть предварительно запущен (см. задание по Node.js).

## Структура истории (LocalStorage)

Записи об истории загрузок хранятся в `localStorage` в виде массива объектов, содержащих:

- название файла
- дата загрузки
- статус загрузки
- подробные данные для модального окна

## Проверка

- Реализована drag\&drop загрузка таблицы
- Плавное обновление аналитики по мере получения стрима
- Обработка ошибок загрузки и запроса
- История доступна даже после перезагрузки
- Поддержка модальных окон и роутинга
- Соответствие дизайн-макетам

## Скрипты

| Скрипт             | Назначение                        |
| ------------------ | --------------------------------- |
| `npm run dev`      | запуск dev-сервера                |
| `npm run build`    | сборка проекта                    |
| `npm run lint`     | проверка кода с помощью ESLint    |
| `npm run lint:fix` | линтинг и автоформатирование кода |

> Prettier встроен через `eslint-plugin-prettier` и `eslint-config-prettier`. Используйте `lint:fix` для форматирования.

---

## Автор

Виталий Дорохин — [GitHub](https://github.com/dorokhinvitaliy)
