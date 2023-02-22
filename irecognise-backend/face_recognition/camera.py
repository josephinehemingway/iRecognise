import cv2


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        ret, frame = self.video.read()

        cv2.putText(frame, 'hello',
                    (55,55),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    (0,0,255),
                    2)

        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes()
