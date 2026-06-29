import CustomFooter from "../../components/customFooter"
const VideoLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
        <>
          {children}
          <CustomFooter />
        </>
    )
  }

export default VideoLayout