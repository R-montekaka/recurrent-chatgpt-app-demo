import { ViewMode } from '@/app/types/cost-savings';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-slate-300 dark:border-slate-700 p-1">
      <button
        onClick={() => onChange('monthly')}
        className={`px-8 py-3 rounded-full transition-colors font-medium ${
          value === 'monthly'
            ? 'bg-foreground text-background'
            : 'text-foreground hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={`px-8 py-3 rounded-full transition-colors font-medium ${
          value === 'yearly'
            ? 'bg-foreground text-background'
            : 'text-foreground hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        Yearly
      </button>
    </div>
  );
}
