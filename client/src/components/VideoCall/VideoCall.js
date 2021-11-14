import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { joincall } from "../../actions/videoCall";

const VideoCall = ({ match }) => {
  console.log(window.location.href.split("/")[4])
  const id = window.location.href.split("/")[4];
  const dispatch = useDispatch()

  useEffect(() => {
    const domain = "https://classly.daily.co/";
    dispatch(joincall(id))

    let res = {};
    res['status'] = 200;
    if (res.status === 200) {
      const script = document.createElement("script");
      script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100vh",
              border: "0",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          });`;

      document.body.appendChild(script);
      let start = document.getElementById('start'),
        stop = document.getElementById('stop'),
        mediaRecorder;

      start.addEventListener('click', async function () {
        let stream = await recordScreen();
        let mimeType = 'video/mp4';
        mediaRecorder = createRecorder(stream, mimeType);
        let node = document.createElement("p");
        node.textContent = "Started recording";
        document.body.appendChild(node);
      })

      stop.addEventListener('click', function () {
        mediaRecorder.stop();
        let node = document.createElement("p");
        node.textContent = "Stopped recording";
        document.body.appendChild(node);
      })

      async function recordScreen() {
        return await navigator.mediaDevices.getDisplayMedia({
          audio: true,
          video: { mediaSource: "screen" }
        });
      }

      function createRecorder(stream, mimeType) {
        // the stream data is stored in this array
        let recordedChunks = [];

        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (e) {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };
        mediaRecorder.onstop = function () {
          saveFile(recordedChunks);
          recordedChunks = [];
        };
        mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
        return mediaRecorder;
      }

      function saveFile(recordedChunks) {

        const blob = new Blob(recordedChunks, {
          type: 'video/webm'
        });
        let filename = window.prompt('Enter file name'),
          downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${filename}.webm`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        URL.revokeObjectURL(blob); // clear from memory
        document.body.removeChild(downloadLink);
      }

      setTimeout(() => {
        console.log(document.getElementsByTagName('iframe')[0].getElementsByTagName('a'))
        console.log(document, document.getElementsByClassName('jsx-2122962381'), document.getElementsByTagName('a')[2].innerHTML)
      }, 10000);
    }
    // })
    // .catch((err) => console.log(err));
  }, [id]);

  return <div>
    <button id="start">Start</button>
    <button id="stop">Stop</button>
  </div>;
}

export default VideoCall