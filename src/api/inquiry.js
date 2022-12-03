import request from '@/utils/request'

export function sendTextMessage(receiverId,value) {
    return request({
        url: 'inquiry/sendText',
        method: 'post',
        params: {"receiverId":receiverId},
        data:value,
    })
}

export function sendPictureMessage(receiverId,file) {
    return request({
        url: 'inquiry/sendPicture',
        method: 'post',
        params: {"receiverId":receiverId},
        data:file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function sendAudioMessage(receiverId,file) {
    return request({
        url: 'inquiry/sendAudio',
        method: 'post',
        params: {"receiverId":receiverId},
        data:file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function getMessage(chaterId) {
    return request({
        url: 'inquiry/getMessage',
        method: 'get',
        params: {"chaterId":chaterId},
    })
}
