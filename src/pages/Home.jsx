import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Zap, RefreshCw, Lock, Share2, Cloud } from 'lucide-react'

const Card = ({ title, description, image, bgColor, isFullGif }) => {
  const controls = useAnimation()
  const cardRef = useRef(null)

  const handleHover = (event) => {
    const card = cardRef.current
    if (card) {
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      controls.start({
        x: (x - rect.width / 2) / 20,
        y: (y - rect.height / 2) / 20,
        transition: { duration: 0.2 },
      })
    }
  }

  const handleHoverEnd = () => {
    controls.start({ x: 0, y: 0, transition: { duration: 0.2 } })
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center lg:p-4 sm:p-2">
      <motion.div
        ref={cardRef}
        className={`w-full max-w-sm mx-auto h-[400px] rounded-3xl overflow-hidden ${
          isFullGif ? '' : 'p-8 flex flex-col justify-between'
        } ${bgColor}`}
        animate={controls}
        whileHover={{ scale: 1.05 }}
        onMouseMove={handleHover}
        onMouseLeave={handleHoverEnd}
      >
        {isFullGif ? (
          <div className="relative w-full h-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="p-4">
                <h3 className="text-2xl font-bold text-white mb-2 text-shadow">
                  {title}
                </h3>
                <p className="text-white text-shadow">{description}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
              <p className="text-white mb-6">{description}</p>
            </div>
            <img
              src={image}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />
          </>
        )}
      </motion.div>
    </div>
  )
}

const HighlightedText = ({ text }) => {
  const controls = useAnimation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const highlightVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="relative inline-block"
      initial="hidden"
      animate={controls}
    >
      <span className="relative z-10">{text}</span>
      <svg
        className="absolute -bottom-2 left-0 w-full h-8 z-0"
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M5 15 Q50 5 100 15 T200 15 T300 15"
          fill="none"
          stroke="#FFEB3B"
          strokeWidth="6"
          variants={highlightVariants}
        />
      </svg>
    </motion.div>
  )
}

const FeatureCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)
  const constraintsRef = useRef(null)
  const cards = [
    {
      title: "End-to-End Encryption",
      description: "Secure your files with CryptoJS encryption",
      image: "https://media.giphy.com/media/tNdcrrDxRoYSV6k2QR/giphy.gif?cid=790b7611fmcmr25xpqwma156w28qk8qwdhoapi7pu68ff6jg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
      bgColor: "bg-gradient-to-b from-purple-400 to-indigo-600",
      isFullGif: true,
    },
    {
      title: "Resumable Transfers",
      description: "Never lose progress with Resumable.js",
      image: "https://media.giphy.com/media/dDCy1VKsop5N22Nulf/giphy.gif?cid=790b7611qjer241ezpur4d0ysg715osh9gny8pb3xllhzewf&ep=v1_gifs_search&rid=giphy.gif&ct=g",
      bgColor: "bg-gradient-to-b from-green-400 to-teal-600",
      isFullGif: true,
    },
    {
      title: "Fast Transfers",
      description: "Lightning-fast file transfers, even on slow connections",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHQ1b3k4YTVlY2Y2YWFpYXp2NDlncHd4dW02Y3BhbXd2Z3N3aHk3MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Emb1u5OKSGqtQixcEV/giphy.gif",
      bgColor: "bg-gradient-to-b from-yellow-400 to-orange-600",
      isFullGif: true,
    },
    {
      title: "Secure Sharing",
      description: "Share files securely with customizable permissions",
      image: "https://media.giphy.com/media/9r73dCeJarx5kdXmu2/giphy.gif?cid=790b7611j7r0cesyfrasvkpfcmd6robhgy1exzpqtu0y80e3&ep=v1_gifs_search&rid=giphy.gif&ct=g",
      bgColor: "bg-gradient-to-b from-red-400 to-pink-600",
      isFullGif: true,
    },
    {
      title: "Cloud Integration",
      description: "Seamlessly integrate with popular cloud storage services",
      image: "https://media.giphy.com/media/3oFyD2RpK1Qs4Cl9rq/giphy.gif?cid=790b7611zh5es36523gupnek7rrxx0dlq0qyfyana2hiuoc0&ep=v1_gifs_search&rid=giphy.gif&ct=g",
      bgColor: "bg-gradient-to-b from-indigo-400 to-purple-600",
      isFullGif: true,
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth >= 1024 ? 3 : 1)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextCard = () =>
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, cards.length - visibleCards)
    )
  const prevCard = () =>
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      prevCard()
    } else if (info.offset.x < -100) {
      nextCard()
    }
  }

  const isFirstCard = currentIndex === 0
  const isLastCard = currentIndex === cards.length - visibleCards

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            <HighlightedText text="What do we have in store for you?"/>
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={prevCard}
              className={`rounded-full p-2 transition-colors duration-300 ${
                isFirstCard
                  ? "bg-gray-600 text-gray-400"
                  : "bg-indigo-600 text-white"
              }`}
              aria-label="Previous card"
              disabled={isFirstCard}
            >
              ←
            </button>
            <button
              onClick={nextCard}
              className={`rounded-full p-2 transition-colors duration-300 ${
                isLastCard
                  ? "bg-gray-600 text-gray-400"
                  : "bg-indigo-600 text-white"
              }`}
              aria-label="Next card"
              disabled={isLastCard}
            >
              →
            </button>
          </div>
        </div>
        <div ref={constraintsRef} className="overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={constraintsRef}
            onDragEnd={handleDragEnd}
            animate={{ x: `${-currentIndex * (100 / visibleCards)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-2 ${
                  visibleCards === 1 ? "w-full" : "w-1/3"
                }`}
              >
                <Card {...card} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const reviews = [
  { id: 1, name: "John Doe", company: "Tech Co", review: "glitchdrop. has revolutionized our file transfer process. It's secure and reliable!" },
  { id: 2, name: "Jane Smith", company: "Data Corp", review: "The resumable transfers feature has saved us countless hours of work. Highly recommended!" },
  { id: 3, name: "Mike Johnson", company: "Secure Inc", review: "We feel confident transferring sensitive documents with this end-to-end encrypted solution." }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to glitchdrop.</h1>
          <p className="text-xl text-gray-600 mb-8">Secure file transfers, even on unreliable connections</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </section>

        <FeatureCards />

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-lg"
                style={{
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #4facfe 0%, #00f2fe 100%) border-box',
                  border: '2px solid transparent'
                }}
              >
                <p className="text-gray-600 mb-4">"{review.review}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}