import request from '@/utils/request'

export function sendTextMessage(recordId,receiverId,value) {
    return request({
        url: 'inquiry/sendText',
        method: 'post',
        params: {"recordId":recordId,
            "receiverId":receiverId},
        data:value,
    })
}

export function sendPictureMessage(recordId,receiverId,file) {
    return request({
        url: 'inquiry/sendPicture',
        method: 'post',
        params: {"recordId":recordId,
            "receiverId":receiverId},
        data:file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function sendAudioMessage(recordId,receiverId,file) {
    return request({
        url: 'inquiry/sendAudio',
        method: 'post',
        params: {"recordId":recordId,
            "receiverId":receiverId},
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
