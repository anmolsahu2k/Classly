import * as VideoCallService from './videoCallService.js'
import * as NotificationController from '../notification/notificationController.js'
export const getRoom = (req, res) => {
    const roomId = req.params.id
    console.log(roomId)
    let options = {
        'method': 'GET',
        'url': `https://api.daily.co/v1/rooms/${roomId}`,
        'headers': {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.DAILY_API_KEY,
        },
    };

    VideoCallService.getRoom(options).then(async (room) => {
        if (room.error) {
            console.log("bye")
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
                NotificationController.sendEmail(req, res, roomId)
                res.status(200).send(newRoom, { status: 200 });
            })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({ message: "Something went wrong!" })
                })

        } else {
            console.log("hi")
            var options = {
                'method': 'POST',
                'url': 'https://rapidemail.rmlconnect.net/v1.0/messages/sendMail',
                'headers': {
                    'Reply-To': 'message.reply@example.com',
                    'X-Unique-Id': 'id'
                },
                'body': {
                    "owner_id": "46875227",
                    "token": "aZ4Voo7ssZNwnCdXxwWc0uwk",
                    "smtp_user_name": "smtp56728640",
                    "message": {
                        "html": `The meeting has started. You can join the meeting by clicking on this link: http:/localhost:3000/videoCall/${roomId}`,
                        "text": "Example text content",
                        "subject": "example subject",
                        "from_email": "noreply@rapidemail.rmlconnect.net",
                        "from_name": "Example Name",
                        "to": [
                            {
                                "email": "harshpandey011@gmail.com",
                                "name": "Recipient Name",
                                "type": "to"
                            }
                        ],
                        "headers": {
                            "Reply-To": "noreply@rapidemail.rmlconnect.net",
                            "X-Unique-Id": "id "
                        }
                    }
                }
            };

            NotificationController.sendEmail(req, res, roomId)

            NotificationController.sendSms()
            console.log("hhhh")
            res.status(200).send({ status: 200, room });
        }
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
}

