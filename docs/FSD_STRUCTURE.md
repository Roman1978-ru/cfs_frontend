# Feature-Sliced Design v2.1 Structure

> Документация написана ИИ

Проект реорганизован согласно методологии Feature-Sliced Design v2.1

## Структура слоев

```
src/
├── app/                    # Слой приложения
│
├── pages/                  # Слой страниц
│   ├── home/
│   └── about/
│
├── widgets/                # Слой виджетов (сложные композиции UI)
│
├── features/               # Слой фич (бизнес-логика)
│
├── entities/               # Слой сущностей (бизнес-сущности)
│
└── shared/                 # Общий код
    ├── api/                # API конфигурация
    │   └── api.ts
    └── и др...
```

## Принципы FSD v2.1

1. **app/** - инициализация приложения, провайдеры, глобальный роутинг
2. **pages/** - страницы приложения, композиция виджетов и фич
3. **widgets/** - крупные самостоятельные блоки UI
4. **features/** - части функциональности приложения (фичи)
5. **entities/** - бизнес-сущности предметной области
6. **shared/** - переиспользуемый код без привязки к бизнес-логике

## Импорты

Используется алиас `@/` для импортов из `src/`:

```typescript
import { App } from '@/app';
import { HomePage } from '@/pages/home';
import { api } from '@/shared/api/api';
import { useAppDispatch } from '@/shared/store/hooks';
```

## Правила зависимостей

- Слой может импортировать только из нижележащих слоев
- shared не знает о других слоях
- pages может импортировать из widgets, features, entities, shared
- widgets может импортировать из features, entities, shared
- features может импортировать из entities, shared
- entities может импортировать только из shared

