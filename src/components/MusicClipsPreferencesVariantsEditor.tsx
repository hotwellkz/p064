import PreferencesVariantsEditor from "./PreferencesVariantsEditor";
import type { ChannelPreferences } from "../domain/channel";

interface MusicClipsPreferencesVariantsEditorProps {
  preferences: ChannelPreferences | undefined;
  onChange: (preferences: ChannelPreferences) => void;
  onValidationChange?: (isValid: boolean) => void;
}

/**
 * Адаптированная версия PreferencesVariantsEditor для Music Clips
 * Переиспользует тот же компонент с кастомными лейблами
 */
const MusicClipsPreferencesVariantsEditor = ({
  preferences,
  onChange,
  onValidationChange
}: MusicClipsPreferencesVariantsEditorProps) => {
  return (
    <PreferencesVariantsEditor
      preferences={preferences}
      onChange={onChange}
      onValidationChange={onValidationChange}
      labels={{
        title: "Логика генерации промптов",
        description: "Настройте режим выбора и варианты дополнительных пожеланий для музыки и клипа",
        modeLabel: "Режим выбора варианта промпта",
        variantsLabel: "Варианты промптов/пожеланий для трека и клипа",
        addButton: "Добавить вариант промпта",
        placeholder: "Дополнительные пожелания к музыке и клипу... Например: «энергичный бит, синтезаторы, современный стиль», особенности визуала, настроение.",
        helpText: "Создайте несколько вариантов промптов для увеличения разнообразия музыки и клипов. Система будет использовать их согласно выбранному режиму."
      }}
    />
  );
};

export default MusicClipsPreferencesVariantsEditor;

