import CustomFooter from "../../components/customFooter"
const VideoLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
      <html lang="en">
        <body>
          {children}
          <CustomFooter />
        </body>
      </html>
    )
  }

export default VideoLayout