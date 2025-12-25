import { Music } from "lucide-react";
import type { MusicClipsSettings } from "../domain/channel";
import { FieldHelpIcon } from "./aiAssistant/FieldHelpIcon";

interface ChannelBaseSettingsMusicClipsProps {
  settings: MusicClipsSettings;
  onChange: (settings: MusicClipsSettings) => void;
  channelName?: string;
}

const ChannelBaseSettingsMusicClips = ({
  settings,
  onChange,
  channelName
}: ChannelBaseSettingsMusicClipsProps) => {
  const handleStyleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    onChange({ ...settings, styleTags: tags });
  };

  const handlePlatformToggle = (platform: "youtube" | "tiktok" | "instagram") => {
    onChange({
      ...settings,
      platforms: {
        ...settings.platforms,
        [platform]: !settings.platforms?.[platform]
      }
    });
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Suno Prompt */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <Music size={16} className="text-brand" />
          <span>Промпт для Suno *</span>
          <FieldHelpIcon
            fieldKey="musicClipsSettings.sunoPrompt"
            page="channelEdit"
            channelContext={{
              name: channelName || "",
              type: "music_clips",
              sunoPrompt: settings.sunoPrompt
            }}
            currentValue={settings.sunoPrompt}
            label="Промпт для Suno"
          />
        </label>
        <textarea
          value={settings.sunoPrompt}
          onChange={(e) => onChange({ ...settings, sunoPrompt: e.target.value })}
          required
          rows={6}
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/40 hover:border-white/20 resize-y"
          placeholder="Опишите желаемую музыку: жанр, настроение, инструменты, текст. Например: 'Upbeat electronic track with synthesizers, energetic and modern, perfect for tech videos'"
        />
        <p className="text-xs text-slate-400">
          Основной текст запроса для генерации музыкального трека через Suno API
        </p>
      </div>

      {/* Style Tags */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <span>Теги стиля (через запятую)</span>
          <FieldHelpIcon
            fieldKey="musicClipsSettings.styleTags"
            page="channelEdit"
            channelContext={{
              name: channelName || "",
              type: "music_clips",
              styleTags: settings.styleTags
            }}
            currentValue={settings.styleTags?.join(", ") || ""}
            label="Теги стиля"
          />
        </label>
        <input
          type="text"
          value={settings.styleTags?.join(", ") || ""}
          onChange={(e) => handleStyleTagsChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/40 hover:border-white/20"
          placeholder="Например: electronic, ambient, cinematic, upbeat"
        />
        <p className="text-xs text-slate-400">
          Дополнительные теги для уточнения стиля музыки
        </p>
        {settings.styleTags && settings.styleTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {settings.styleTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 rounded-full bg-brand/20 border border-brand/30 px-3 py-1 text-xs text-brand"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    const newTags = settings.styleTags?.filter((_, i) => i !== index) || [];
                    onChange({ ...settings, styleTags: newTags });
                  }}
                  className="text-brand hover:text-white transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Параметры длительности */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span>Целевая длительность видео (сек) *</span>
            <FieldHelpIcon
              fieldKey="musicClipsSettings.targetDurationSec"
              page="channelEdit"
              channelContext={{
                name: channelName || "",
                type: "music_clips",
                targetDurationSec: settings.targetDurationSec
              }}
              currentValue={settings.targetDurationSec}
              label="Целевая длительность"
            />
          </label>
          <input
            type="number"
            value={settings.targetDurationSec}
            onChange={(e) =>
              onChange({
                ...settings,
                targetDurationSec: Math.max(10, parseInt(e.target.value, 10) || 0)
              })
            }
            min={10}
            required
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/40 hover:border-white/20"
          />
          <p className="text-xs text-slate-400">
            Хронометраж итогового клипа после склейки всех сегментов
          </p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span>Длительность сегмента (сек) *</span>
            <FieldHelpIcon
              fieldKey="musicClipsSettings.clipSec"
              page="channelEdit"
              channelContext={{
                name: channelName || "",
                type: "music_clips",
                clipSec: settings.clipSec
              }}
              currentValue={settings.clipSec}
              label="Длительность сегмента"
            />
          </label>
          <input
            type="number"
            value={settings.clipSec}
            onChange={(e) =>
              onChange({
                ...settings,
                clipSec: Math.max(5, parseInt(e.target.value, 10) || 0)
              })
            }
            min={5}
            required
            disabled
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/40 hover:border-white/20 opacity-60 cursor-not-allowed"
          />
          <p className="text-xs text-slate-400">
            Длительность одного видео-сегмента (по умолчанию 10 сек, фиксировано)
          </p>
        </div>
      </div>

      {/* Параметры пайплайна */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span>Задержка между генерациями (сек) *</span>
            <FieldHelpIcon
              fieldKey="musicClipsSettings.segmentDelayMs"
              page="channelEdit"
              channelContext={{
                name: channelName || "",
                type: "music_clips",
                segmentDelayMs: settings.segmentDelayMs
              }}
              currentValue={settings.segmentDelayMs}
              label="Задержка между генерациями"
            />
          </label>
          <input
            type="number"
            value={Math.floor(settings.segmentDelayMs / 1000)}
            onChange={(e) =>
              onChange({
                ...settings,
                segmentDelayMs: Math.max(0, parseInt(e.target.value, 10) || 0) * 1000
              })
            }
            min={0}
            required
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/40 hover:border-white/20"
          />
          <p className="text-xs text-slate-400">
            Задержка между запусками генерации сегментов (в секундах)
          </p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span>Макс. параллельных сегментов *</span>
            <FieldHelpIcon
              fieldKey="musicClipsSettings.maxParallelSegments"
              page="channelEdit"
              channelContext={{
                name: channelName || "",
                type: "music_clips",
                maxParallelSegments: settings.maxParallelSegments
              }}
              currentValue={settings.maxParallelSegments}
              label="Макс. параллельных сегментов"
            />
          </label>
          <input
            type="number"
            value={settings.maxParallelSegments}
            onChange={(e) =>
              onChange({
                ...settings,
                maxParallelSegments: Math.max(1, parseInt(e.target.value, 10) || 0)
              })
            }
            min={1}
            required
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/40 hover:border-white/20"
          />
          <p className="text-xs text-slate-400">
            Максимальное количество сегментов, генерируемых одновременно
          </p>
        </div>
      </div>

      {/* Retry Policy */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span>Макс. попыток повтора *</span>
            <FieldHelpIcon
              fieldKey="musicClipsSettings.maxRetries"
              page="channelEdit"
              channelContext={{
                name: channelName || "",
                type: "music_clips",
                maxRetries: settings.maxRetries
              }}
              currentValue={settings.maxRetries}
              label="Макс. попыток повтора"
            />
          </label>
          <input
            type="number"
            value={settings.maxRetries}
            onChange={(e) =>
              onChange({
                ...settings,
                maxRetries: Math.max(0, parseInt(e.target.value, 10) || 0)
              })
            }
            min={0}
            required
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/40 hover:border-white/20"
          />
          <p className="text-xs text-slate-400">
            Количество попыток повтора при ошибке генерации сегмента
          </p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span>Задержка повтора (сек) *</span>
            <FieldHelpIcon
              fieldKey="musicClipsSettings.retryDelayMs"
              page="channelEdit"
              channelContext={{
                name: channelName || "",
                type: "music_clips",
                retryDelayMs: settings.retryDelayMs
              }}
              currentValue={settings.retryDelayMs}
              label="Задержка повтора"
            />
          </label>
          <input
            type="number"
            value={Math.floor(settings.retryDelayMs / 1000)}
            onChange={(e) =>
              onChange({
                ...settings,
                retryDelayMs: Math.max(0, parseInt(e.target.value, 10) || 0) * 1000
              })
            }
            min={0}
            required
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/40 hover:border-white/20"
          />
          <p className="text-xs text-slate-400">
            Задержка между попытками повтора (в секундах)
          </p>
        </div>
      </div>

      {/* Платформы для публикации */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <span>Платформы для публикации</span>
          <FieldHelpIcon
            fieldKey="musicClipsSettings.platforms"
            page="channelEdit"
            channelContext={{
              name: channelName || "",
              type: "music_clips",
              platforms: settings.platforms
            }}
            currentValue={JSON.stringify(settings.platforms)}
            label="Платформы для публикации"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {(["youtube", "tiktok", "instagram"] as const).map((platformKey) => (
            <button
              key={platformKey}
              type="button"
              onClick={() => handlePlatformToggle(platformKey)}
              className={`rounded-xl border px-4 py-3 text-center transition-all duration-200 ${
                settings.platforms?.[platformKey]
                  ? "border-brand bg-brand/10 text-white shadow-md shadow-brand/20"
                  : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-brand/40 hover:bg-slate-900/80"
              }`}
            >
              {platformKey.charAt(0).toUpperCase() + platformKey.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Выберите платформы, на которые будут публиковаться готовые клипы
        </p>
      </div>
    </div>
  );
};

export default ChannelBaseSettingsMusicClips;

