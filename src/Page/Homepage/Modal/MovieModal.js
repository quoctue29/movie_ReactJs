import { Button, Modal } from "antd";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useWindowSize } from "../../../Hook/useWindowSize";

const MovieModal = ({ visible, setVisible, Movie }) => {
  const [playing, setPlaying] = useState(false);
  let windowSize = useWindowSize();

  const widthModal = 0.8 * windowSize.width;
  const heightModal = (widthModal * 9) / 16;
  return (
    <>
      <Modal
        centered
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setPlaying(false);
        }}
        width={widthModal}
        footer={null}
      >
        <ReactPlayer
          width={`${widthModal}px`}
          height={`${heightModal}px`}
          controls={true}
          url={Movie}
          playing={playing}
          onPlay={() => {
            setPlaying(true);
          }}
          onPause={() => {
            setPlaying(false);
          }}
        />
      </Modal>
    </>
  );
};

export default MovieModal;
