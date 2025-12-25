# Отчёт: Адаптация страницы редактирования канала для Music Clips

## Выполненные изменения

### 1. Расширены типы для Music Clips

**Файл**: `src/domain/channel.ts`

**Изменения**:
- Добавлены поля в `MusicClipsSettings`:
  - `promptVariants?: ChannelPreferences` - варианты промптов (аналогично shorts)
  - `generationMode?: GenerationMode` - режим генерации для music_clips

### 2. Создан компонент основных настроек для Music Clips

**Новый файл**: `src/components/ChannelBaseSettingsMusicClips.tsx`

**Функциональность**:
- Промпт для Suno (textarea, обязательное поле)
- Теги стиля (input с chips, опционально)
- Параметры длительности:
  - Целевая длительность видео (сек)
  - Длительность сегмента (сек, disabled, по умолчанию 10)
- Параметры пайплайна:
  - Задержка между генерациями (сек, конвертируется из мс)
  - Макс. параллельных сегментов
- Retry Policy:
  - Макс. попыток повтора
  - Задержка повтора (сек, конвертируется из мс)
- Платформы для публикации (YouTube, TikTok, Instagram - checkboxes)

### 3. Создан адаптированный редактор вариантов для Music Clips

**Новый файл**: `src/components/MusicClipsPreferencesVariantsEditor.tsx`

**Функциональность**:
- Переиспользует `PreferencesVariantsEditor` с кастомными лейблами
- Адаптированные тексты:
  - "Логика генерации промптов" вместо "Логика генерации сценариев"
  - "Варианты промптов/пожеланий для трека и клипа" вместо "Варианты дополнительных пожеланий"
  - Адаптированные placeholder'ы и подсказки

### 4. Модифицирован PreferencesVariantsEditor для поддержки кастомных текстов

**Файл**: `src/components/PreferencesVariantsEditor.tsx`

**Изменения**:
- Добавлен prop `labels?: {...}` для кастомных текстов
- Все тексты (title, description, modeLabel, variantsLabel, addButton, placeholder, helpText) теперь настраиваемые
- Обратная совместимость: если labels не передан, используются дефолтные тексты для shorts

### 5. Обновлена страница редактирования канала

**Файл**: `src/pages/ChannelEdit/ChannelEditPage.tsx`

**Изменения**:

#### A) Условный рендеринг блока "Основные настройки канала"
- Если `channel.type === "shorts"` (или не указан): рендерится существующий блок с полями для shorts
- Если `channel.type === "music_clips"`: рендерится `ChannelBaseSettingsMusicClips`

#### B) Условный рендеринг блока "ЛОГИКА ГЕНЕРАЦИИ СЦЕНАРИЕВ/ПРОМПТОВ"
- Если `channel.type === "shorts"`: рендерится `PreferencesVariantsEditor` с дефолтными текстами
- Если `channel.type === "music_clips"`: рендерится `MusicClipsPreferencesVariantsEditor` с адаптированными текстами
- Варианты сохраняются в `channel.musicClipsSettings.promptVariants` для music_clips

#### C) Условный рендеринг блока "Режим генерации"
- Если `channel.type === "shorts"`: 
  - "Сценарий"
  - "Сценарий + промпт для видео"
  - "Промпт для видео"
- Если `channel.type === "music_clips"`:
  - "Только промпт трека" (script)
  - "Промпт трека + промпт клипа" (prompt)
  - "Только промпт клипа" (video-prompt-only)
- Режим сохраняется в `channel.musicClipsSettings.generationMode` для music_clips

#### D) Инициализация musicClipsSettings
- При загрузке канала типа `music_clips` без `musicClipsSettings` автоматически инициализируются дефолтные значения
- При переключении типа канала на `music_clips` инициализируются дефолтные значения

#### E) Валидация при сохранении
- Для shorts: валидация `channel.preferences`
- Для music_clips: валидация `channel.musicClipsSettings.sunoPrompt` (обязательное поле) и `channel.musicClipsSettings.promptVariants` (если есть)

## Изменённые файлы

1. **src/domain/channel.ts**
   - Добавлены поля `promptVariants` и `generationMode` в `MusicClipsSettings`

2. **src/components/ChannelBaseSettingsMusicClips.tsx** (новый)
   - Компонент для основных настроек Music Clips

3. **src/components/MusicClipsPreferencesVariantsEditor.tsx** (новый)
   - Адаптированный редактор вариантов для Music Clips

4. **src/components/PreferencesVariantsEditor.tsx**
   - Добавлена поддержка кастомных текстов через prop `labels`

5. **src/pages/ChannelEdit/ChannelEditPage.tsx**
   - Условный рендеринг блоков в зависимости от `channel.type`
   - Инициализация и валидация `musicClipsSettings`

## Команды PowerShell

```powershell
# Установка зависимостей (если нужно)
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build
```

## Чеклист проверки

### ✅ Открыть shorts-канал
- [ ] Блок "Основные настройки канала" показывает поля для shorts (платформа, язык, ниша, аудитория, тон)
- [ ] Блок "ЛОГИКА ГЕНЕРАЦИИ СЦЕНАРИЕВ" показывает стандартные тексты
- [ ] Блок "Режим генерации" показывает варианты для shorts
- [ ] Все значения сохраняются и загружаются корректно

### ✅ Открыть music_clips-канал
- [ ] Блок "Основные настройки канала" показывает поля для Music Clips (промпт Suno, теги стиля, параметры длительности, пайплайна, платформы)
- [ ] Блок "ЛОГИКА ГЕНЕРАЦИИ ПРОМПТОВ" показывает адаптированные тексты
- [ ] Блок "Режим генерации" показывает варианты для Music Clips ("Только промпт трека", "Промпт трека + промпт клипа", "Только промпт клипа")
- [ ] Все значения сохраняются в `musicClipsSettings` и загружаются корректно

### ✅ Переключить тип канала
- [ ] При переключении с shorts на music_clips:
  - [ ] Появляется форма Music Clips
  - [ ] Инициализируются дефолтные значения `musicClipsSettings`
  - [ ] Значения shorts не теряются (остаются в state, но не отображаются)
- [ ] При переключении с music_clips на shorts:
  - [ ] Появляется форма Shorts
  - [ ] Значения music_clips не теряются (остаются в state, но не отображаются)
  - [ ] `musicClipsSettings` очищается при сохранении

### ✅ Сохранить music_clips канал
- [ ] После сохранения канал имеет `type: "music_clips"`
- [ ] `musicClipsSettings` сохранены корректно
- [ ] После перезагрузки страницы все значения на месте
- [ ] Валидация работает (промпт Suno обязателен)

## Описание блока "Основные настройки" для music_clips

Блок содержит следующие поля:

1. **Промпт для Suno** (textarea, обязательное)
   - Основной текст запроса для генерации музыкального трека
   - Placeholder: "Опишите желаемую музыку: жанр, настроение, инструменты, текст..."

2. **Теги стиля** (input с chips)
   - Ввод через запятую
   - Отображаются как chips с возможностью удаления
   - Placeholder: "Например: electronic, ambient, cinematic"

3. **Целевая длительность видео** (number, обязательное, min 10)
   - Хронометраж итогового клипа после склейки

4. **Длительность сегмента** (number, disabled, по умолчанию 10)
   - Длительность одного видео-сегмента (фиксировано)

5. **Задержка между генерациями** (number, в секундах)
   - Конвертируется из миллисекунд для удобства ввода

6. **Макс. параллельных сегментов** (number, min 1)

7. **Макс. попыток повтора** (number, min 0)

8. **Задержка повтора** (number, в секундах)
   - Конвертируется из миллисекунд

9. **Платформы для публикации** (checkboxes)
   - YouTube, TikTok, Instagram

Все поля имеют подсказки через `FieldHelpIcon` и валидацию.

