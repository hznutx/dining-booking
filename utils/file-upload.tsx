'use client'

import { useState } from 'react'

export const useUploadFile = () => {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File): Promise<string> => {
    try {
      setUploading(true)

      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IMG_HOST_URL}?key=${process.env.NEXT_PUBLIC_IMG_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        },
      )

      const result = await response.json()

      if (!result.success) {
        throw new Error('Upload failed')
      }

      return result.data.url
    } finally {
      setUploading(false)
    }
  }

  return {
    onLoadingPicture: uploading,
    uploadFile,
  }
}
