const getYoutubeId = (url: string) => {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([^&?/]+)/)
  return match ? match[1] : null
}

export { getYoutubeId }
