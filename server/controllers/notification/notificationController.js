import * as NotificationService from './notificationService.js'

export const addUserToSMTP = (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://rapidemail.rmlconnect.net/v1.0/settings/addSmtp',
        'headers': {
        },
        body: `{\r\n    "owner_id": ${process.env.OWNER_ID},\r\n    "token":${process.env.TOKEN},\r\n    "total_limit":1000,\r\n    "hourly_limit":100\r\n}\r\n`

    };

    NotificationService.addUserToSMTP(options).then((data) => {
        res.status(200).json(data)
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
}
export const sendEmail = (req, res, roomId) => {
    var options = {
        'method': 'POST',
        'url': 'https://rapidemail.rmlconnect.net/v1.0/messages/sendMail',
        'headers': {
            'Reply-To': 'message.reply@example.com',
            'X-Unique-Id': 'id'
        },
        json: true,
        body: {
            "owner_id": "46875227",
            "token": "aZ4Voo7ssZNwnCdXxwWc0uwk",
            "smtp_user_name": "smtp56728640",
            "message": {
                "html": "Link is",
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

    NotificationService.sendEmail(options)
}