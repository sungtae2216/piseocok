interface FilterChipOption<T extends string> {
  code: T
  label: string
}

interface FilterChipsProps<T extends string> {
  options: FilterChipOption<T>[]
  selected: T
  onSelect: (code: T) => void
}

export function FilterChips<T extends string>({
  options,
  selected,
  onSelect,
}: FilterChipsProps<T>) {
  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
      {options.map((option) => {
        const isActive = option.code === selected
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => onSelect(option.code)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'border-sky-500 bg-sky-50 text-sky-600'
                : 'border-transparent bg-slate-100 text-slate-600'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
