import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Background from "./components/Background"

function FullscreenCard({ title, value, suffix, gradient }) {
  return (
    <section
      className={`h-screen flex items-center justify-center relative overflow-hidden ${gradient}`}
    >
      {/* 背景光晕 */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="
          absolute
          w-[600px]
          h-[600px]
          rounded-full
          bg-white
          blur-[160px]
        "
      />

      {/* 内容 */}
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 text-center px-6"
      >
        <p className="text-xl md:text-3xl text-white/70 mb-6">
          {title}
        </p>

        <h1 className="text-7xl md:text-[180px] font-bold text-white">
          {value}
        </h1>

        <p className="text-2xl md:text-4xl mt-4 text-white/80">
          {suffix}
        </p>
      </motion.div>
    </section>
  )
}

function ImageCard({ title, description, image, gradient }) {
  return (
    <section className={`h-screen relative flex items-center justify-center px-6 ${gradient}`}>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="
          absolute
          w-[700px]
          h-[700px]
          rounded-full
          bg-white
          blur-[180px]
        "
      />

      <div className="relative z-10 w-full max-w-5xl">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6">
          {title}
        </h2>

        <p className="text-lg md:text-2xl text-white/70 mb-12">
          {description}
        </p>

        <img
          src={image}
          className="w-full rounded-[40px] shadow-2xl border border-white/10"
        />
      </div>
    </section>
  )
}

export default function App() {
  const [keywords, setKeywords] = useState([])
  const [meme, setMeme] = useState([])
  const [stats, setStats] = useState(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetch("/data/stats.json")
      .then((res) => res.json())
      .then(setStats)
    fetch("/data/keywords.json").then(r => r.json()).then(setKeywords)
    fetch("/data/meme.json").then(r => r.json()).then(setMeme)
  }, [])

  // 👉 滚轮控制切屏（关键）
  useEffect(() => {
  let lock = false

  const handleWheel = (e) => {
    if (lock) return
    lock = true

    setTimeout(() => (lock = false), 800) // 防抖关键

    if (e.deltaY > 0) {
      setPage((p) => Math.min(p + 1, 19))
    } else {
      setPage((p) => Math.max(p - 1, 0))
    }
  }

  window.addEventListener("wheel", handleWheel, { passive: false })

  return () => window.removeEventListener("wheel", handleWheel)
}, [])

  if (!stats) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="relative bg-black text-white overflow-hidden">
      <Background />

      <AnimatePresence mode="wait">

        {/* 0 */}
        {page === 0 && (
          <motion.div
            key="p0"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 1.2 }}
          >
            <FullscreenCard
              title="你们已经聊天了"
              value={stats.chat_days}
              suffix="天"
              gradient="bg-gradient-to-br from-purple-900 via-black to-pink-900"
            />
          </motion.div>
        )}

        {/* 1 */}
        {page === 1 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 1.2 }}
          >
            <FullscreenCard
              title="这一年里"
              value={stats.total_messages}
              suffix="条消息"
              gradient="bg-gradient-to-br from-blue-900 via-black to-cyan-900"
            />
          </motion.div>
        )}

        {/* 2 */}
        {page === 2 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 1.2 }}
          >
            <FullscreenCard
              title="你们互相说了"
              value={stats.baby_count}
              suffix='次 “宝宝”'
              gradient="bg-gradient-to-br from-pink-900 via-black to-rose-900"
            />
          </motion.div>
        )}

        {/* 3 */}
        {page === 3 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 1.2 }}
          >
            <FullscreenCard
              title="深夜消息"
              value={stats.late_night_messages}
              suffix="条"
              gradient="bg-gradient-to-br from-indigo-900 via-black to-slate-900"
            />
          </motion.div>
        )}

        {/* 4 */}
        {page === 4 && (
          <motion.div key="p4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ImageCard
              title="聊天频率的变化"
              description="有些月份，你们几乎每天都在聊天。"
              image="/images/monthly_trend.png"
              gradient="bg-gradient-to-br from-slate-900 via-black to-zinc-900"
            />
          </motion.div>
        )}

        {/* 5 */}
        {page === 5 && (
          <motion.div key="p5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ImageCard
              title="那些聊到深夜的日子"
              description="有些夜晚，你们聊到了凌晨。"
              image="/images/monthly_heatmap.png"
              gradient="bg-gradient-to-br from-indigo-950 via-black to-slate-900"
            />
          </motion.div>
        )}

        {/* 6 */}
        {page === 6 && (
          <motion.div key="p6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ImageCard
              title="“宝宝”变成了习惯"
              description="某个时间之后，这个称呼开始频繁出现。"
              image="/images/baby_trend.png"
              gradient="bg-gradient-to-br from-pink-950 via-black to-rose-900"
            />
          </motion.div>
        )}

        {/* 7 */}
        {page === 7 && (
          <motion.div key="p7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ImageCard
              title="这一年的语言"
              description="这些词，组成了你们的记忆。"
              image="/images/year_wordcloud.png"
              gradient="bg-gradient-to-br from-purple-950 via-black to-fuchsia-900"
            />
          </motion.div>
        )}

        {page === 8 && (
          <motion.div key="p8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <FullscreenCard
      title="你们创造的语言系统"
      value={keywords.length}
      suffix="种表达"
      gradient="bg-gradient-to-br from-zinc-900 via-black to-neutral-900"
    />
  </motion.div>
)}

{page === 9 && (
  <motion.div key="p9">
    <FullscreenCard
      title="最频繁的词"
      value={keywords[0]?.word}
      suffix={`${keywords[0]?.count} 次`}
      gradient="bg-gradient-to-br from-purple-900 via-black to-pink-900"
    />
  </motion.div>
)}

{page === 10 && (
  <motion.div key="p10">
    <FullscreenCard
      title="情绪爆发词"
      value="哈哈哈哈"
      suffix="是你们的笑声"
      gradient="bg-gradient-to-br from-yellow-900 via-black to-orange-900"
    />
  </motion.div>
)}

{page === 11 && (
  <motion.div key="p11">
    <FullscreenCard
      title="哭的次数"
      value="流泪"
      suffix="也是你们的一部分"
      gradient="bg-gradient-to-br from-blue-900 via-black to-indigo-900"
    />
  </motion.div>
)}

{page === 12 && (
  <motion.div key="p12">
    <FullscreenCard
      title="你们的暗号"
      value="susuyu"
      suffix={`${meme.find(i => i.word === "susuyu")?.count || 0} 次出现`}
      gradient="bg-gradient-to-br from-cyan-900 via-black to-sky-900"
    />
  </motion.div>
)}

{page === 13 && (
  <motion.div key="p13">
    <FullscreenCard
      title="互动行为"
      value="拍了拍"
      suffix={`${meme.find(i => i.word === "拍了拍")?.count || 0} 次`}
      gradient="bg-gradient-to-br from-green-900 via-black to-emerald-900"
    />
  </motion.div>
)}

{page === 14 && (
  <motion.div key="p14">
    <FullscreenCard
      title="关系确认词"
      value="OK"
      suffix={`${meme.find(i => i.word === "OK")?.count || 0} 次`}
      gradient="bg-gradient-to-br from-gray-900 via-black to-slate-900"
    />
  </motion.div>
)}

{page === 15 && (
  <motion.div key="p15">
    <FullscreenCard
      title="最特别的人名"
      value="梁梓煜"
      suffix={`${meme.find(i => i.word === "梁梓煜")?.count || 0} 次被提及`}
      gradient="bg-gradient-to-br from-fuchsia-900 via-black to-pink-900"
    />
  </motion.div>
)}

{page === 16 && (
  <motion.div key="p16">
    <FullscreenCard
      title="好想你"
      value="情绪表达"
      suffix={`${meme.find(i => i.word === "好想你")?.count || 0} 次`}
      gradient="bg-gradient-to-br from-rose-900 via-black to-red-900"
    />
  </motion.div>
)}

{page === 17 && (
  <motion.div key="p17">
    <FullscreenCard
      title="这一年你们说过"
      value="318,112"
      suffix="句对话"
      gradient="bg-gradient-to-br from-indigo-900 via-black to-blue-900"
    />
  </motion.div>
)}

{page === 18 && (
  <motion.div key="p18">
    <FullscreenCard
      title="不是聊天记录"
      value="是习惯"
      suffix="是存在"
      gradient="bg-gradient-to-br from-purple-900 via-black to-black"
    />
  </motion.div>
)}

{page === 19 && (
  <motion.div key="p19">
    <FullscreenCard
      title="这一年"
      value="603天"
      suffix="没有中断"
      gradient="bg-gradient-to-br from-pink-900 via-black to-black"
    />
  </motion.div>
)}

      </AnimatePresence>
    </div>
  )
}