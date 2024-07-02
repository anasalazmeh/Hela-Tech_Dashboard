export const isImageTypeSupport: (type: string) => boolean = (type) => {
  return (
    type === 'image/jpg' ||
    type === 'image/jpeg' ||
    type === 'image/png' ||
    type === 'image/bmp' ||
    type === 'image/svg' ||
    type === 'image/webp'
    // type === 'image/gif'
  )
}
