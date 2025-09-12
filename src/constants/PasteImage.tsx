import React, { useEffect, useState } from 'react'

function PasteImage() {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items

      if (items) {
        for (const item of items) {
          if (item.type.startsWith('image')) {
            const file = item.getAsFile()
            if (file) {
              const reader = new FileReader()
              reader.onload = (e) => {
                setImage(e.target?.result as string)
              }
              reader.readAsDataURL(file)
            }
          }
        }
      }
    }

    window.addEventListener('paste', handlePaste)

    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  return (
    <div>
      <h3>Paste an image (e.g., a screenshot) into this page:</h3>
      {image
        ? (
          <img src={image} alt="Pasted" style={{ maxWidth: '100%' }} />
          )
        : (
          <p>No image pasted yet.</p>
          )}
    </div>
  )
}

export default PasteImage
