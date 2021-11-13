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
      setTimeout(() => {
        console.log(document.getElementsByTagName('iframe')[0].getElementsByTagName('a'))
        console.log(document, document.getElementsByClassName('jsx-2122962381'), document.getElementsByTagName('a')[2].innerHTML)
      }, 10000);
    }
    // })
    // .catch((err) => console.log(err));
  }, [id]);

  return <div></div>;
}

export default VideoCall