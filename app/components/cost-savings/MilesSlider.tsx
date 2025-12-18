interface MilesSliderProps {
  value: number;
  onChange: (miles: number) => void;
  label: string;
}

export default function MilesSlider({ value, onChange, label }: MilesSliderProps) {
  const min = 5;
  const max = 150;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {label}
        </label>
        <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {value} miles/day
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ '--value': `${percentage}%` } as React.CSSProperties}
      />
    </div>
  );
}
