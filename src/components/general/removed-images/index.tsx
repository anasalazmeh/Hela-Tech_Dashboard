import { Image, List, Typography } from "antd"
import styles from "./style.module.scss"
import DeleteBtn from "../table-components/actions/delete-btn"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
interface IProps {
  images: string[]
  name: string
}
const RemovedImages: React.FC<IProps> = ({ images, name }) => {
  const [showImages, setShowImages] = useState<string[]>(images)
  const [removedImages, setRemovedImages] = useState<string[]>([])

  const { setValue } = useFormContext()
  return (
    <List
      header={<div>Images to Remove</div>}
      footer={<div>Select an Image to Remove it</div>}
      bordered
      dataSource={showImages}
      renderItem={(item, index) => (
        <List.Item className={styles.list}>
          <div>
            <Image className={styles.image} src={item} />
          </div>
          <DeleteBtn
            onConfirm={async () => {
              let data = [...showImages]
              data.splice(index, 1)
              let removedData = [...removedImages]
              removedData = [...removedData, item]
              setValue(name, removedData)
              setRemovedImages(removedData)
              setShowImages(data)
            }}
          />
        </List.Item>
      )}
    />
  )
}

export default RemovedImages
