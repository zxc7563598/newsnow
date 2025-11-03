import { useState } from "react"

export default function DailyMurmurs() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [result] = useState("")

  const commit = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const url = import.meta.env.VITE_ADD_URL

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: query }),
      })

      if (!res.ok) throw new Error(`请求失败: ${res.status}`)

      setQuery("")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full items-center gap-2 p-4 rounded-2xl bg-primary/10 backdrop-blur-md shadow-lg mb-4">

        {/* 输入框 */}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
          className="flex-1 px-3 py-2 rounded-lg bg-transparent border border-primary/30 focus:border-primary/60 outline-none cursor-text"
        />

        {/* 提交按钮 */}
        <button
          type="button"
          onClick={commit}
          className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/30 transition h-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "提交中..." : "进行记录"}
        </button>
      </div>

      {/* 提交结果展示 */}
      {result && <div className="mt-2 text-sm text-gray-600">{result}</div>}
    </div>
  )
}
