import { useState } from "react"

interface Engine {
  name: string
  url: string
}

const engines: Engine[] = [
  { name: "百度", url: "https://www.baidu.com/s?wd=" },
  { name: "谷歌", url: "https://www.google.com/search?q=" },
  { name: "哔哩哔哩", url: "https://search.bilibili.com/all?keyword=" },
  { name: "知乎", url: "https://www.zhihu.com/search?q=" },
]

export default function Search() {
  const [selected, setSelected] = useState<Engine>(engines[0])
  const [query, setQuery] = useState("")

  const search = () => {
    if (!query.trim()) return
    const target = selected.url + encodeURIComponent(query)
    window.open(target, "_blank")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") search()
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full items-center gap-2 p-4 rounded-2xl bg-primary/10 backdrop-blur-md shadow-lg mb-4">
        {/* 搜索引擎选择 */}
        <select
          value={selected.name}
          onChange={e => setSelected(engines.find(en => en.name === e.target.value)!)}
          className="w-auto px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/30 backdrop-blur-sm text-sm outline-none h-full cursor-pointer"
        >
          {engines.map(item => (
            <option key={item.name} value={item.name} className="text-black">
              {item.name}
            </option>
          ))}
        </select>

        {/* 输入框 */}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-transparent border border-primary/30 focus:border-primary/60 outline-none cursor-text"
        />

        {/* 搜索按钮 */}
        <button
          type="button"
          onClick={search}
          className="px-4 py-2 min-w-20 rounded-lg bg-primary/10 hover:bg-primary/30 transition h-full cursor-pointer"
        >
          搜索
        </button>
      </div>
    </div>
  )
}
