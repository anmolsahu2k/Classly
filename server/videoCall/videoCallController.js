import * as VideoCallService from './videoCallService.js'

export const getRoom = (req, res) => {
    const roomId = req.params.id

    let options = {
        'method': 'GET',
        'url': `https://api.daily.co/v1/rooms/${roomId}`,
        'headers': {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY,
        },
    };

    VideoCallService.getRoom(options).then((room) => {
        if (room.error) {
            options = {
                'method': 'POST',
                'url': `https://api.daily.co/v1/rooms`,
                'headers': {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + process.env.DAILY_API_KEY,
                },
                'body': JSON.stringify({
                    name: roomId,
                    properties: {
                        enable_screenshare: true,
                        enable_chat: true,
                        start_video_off: true,
                        start_audio_off: false,
                        lang: "en",
                    },
                }),
            };
            VideoCallService.createRoom(options).then((newRoom) => {
                res.status(200).send(newRoom, { status: 200 });
            })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({ message: "Something went wrong!" })
                })

        } else {
            res.status(200).send(room, { status: 200 });
        }
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
}

