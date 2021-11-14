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
export const sendEmail = (req, res, roomId, email) => {
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
                "html": `The meeting has started! Please join the meeting by clicking on this link: http://localhost:3000/videoCall/${roomId}`,
                "text": "Example text content",
                "subject": "example subject",
                "from_email": "noreply@rapidemail.rmlconnect.net",
                "from_name": "Example Name",
                "to": email,
                "headers": {
                    "Reply-To": "noreply@rapidemail.rmlconnect.net",
                    "X-Unique-Id": "id "
                }
            }
        }


    };

    return NotificationService.sendEmail(options)
}


export const sendSms = (phone) => {
    var phone = phone
    var message = "The meeting has started. Please check your email to join the meeting!"
    var options = {
        'method': 'GET',
        'url': `https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username=${process.env.USERNAME}&password=${process.env.PASSWORD}&type=0&dlr=0&destination=${phone}&source=RMLPRD&message=${message}`,
        'headers': {
        }
    };
    return NotificationService.sendSms(options)

}


export const sendViaWhatsapp = (phone) => {
    var options = {
        'method': 'POST',
        'url': 'https://rapidapi.rmlconnect.net/wbm/v1/message',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `${process.env.WHATSAPP_TOKEN}`
        },
        json: true,
        body: {
            "phone": phone,
            "media": {
                "type":
                    "media_template",
                "template_name":
                    "admission_confirmation",
                "lang_code": "en",
                "body": [
                    {
                        "text": `Dear `
                    },
                    {
                        "text": "text"
                    },
                    {
                        "text": "date"
                    },
                    {
                        "text": "date"
                    },
                    {
                        "text": "text"
                    }
                ]
            }
        }

    };
    return NotificationService.sendViaWhatsapp(options)

}