import React from "react"
import { Image, ImageProps } from "antd"

const Img: React.FC<ImageProps> = (props) => {
  return (
    <Image
      preview={{
        mask: null,
      }}
      style={{ cursor: "pointer" }}
      {...props}
    />
  )
}

export default Img
