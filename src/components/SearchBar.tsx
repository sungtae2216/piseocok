import { useState } from 'react'
import type { FormEvent } from 'react'
import { SearchIcon } from '@/components/icons'

interface SearchBarProps {
  onSearch?: (keyword: string) => void
  placeholder?: string
}

export function SearchBar({
  onSearch,
  placeholder = '가고 싶은 피서지를 검색해보세요',
}: SearchBarProps) {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch?.(keyword)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="flex items-center gap-2 rounded-full bg-white px-4 py-3.5 text-slate-500 shadow-[0_2px_10px_rgba(15,23,42,0.08)] focus-within:ring-2 focus-within:ring-sky-400">
        <SearchIcon className="h-5 w-5 shrink-0 text-slate-400" />
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
      </label>
    </form>
  )
}
