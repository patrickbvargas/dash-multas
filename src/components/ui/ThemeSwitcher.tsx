import { Button } from "@components";
import { useDarkMode } from "@hooks";
import { MoonIcon, SunIcon } from "@icons/mini";

const ThemeSwitcher = () => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <div className="flex justify-center">
      <Button
        onClick={() => toggle()}
        variant="theme"
        icon={isDarkMode ? <SunIcon className="h-5" /> : <MoonIcon className="h-5" />}
      />
    </div>
  );
};

export default ThemeSwitcher;
