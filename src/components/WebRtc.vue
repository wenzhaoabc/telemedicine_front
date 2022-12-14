<template>
    <div>
        <video class="video" id="videoself" ref="self"></video>
    </div>
    <div>
        <video class="video" ref="videoself"></video>
    </div>
</template>

<script>

export default {
    data() {
        return {
            localStream: null, // 本地视频流
            peerA: new RTCPeerConnection({ url: "stun:stun.l.google.com:19302" }), //RTCPeer实例
            peerB: new RTCPeerConnection({ url: "stun:stun.l.google.com:19302" })
        }
    },
    methods: {
        captureVideo() {
            let that = this
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    // width: { min: 128, ideal: 1280, max: 1920 },
                    // height: { min: 724, ideal: 720, max: 1080 },
                    mediaSource: 'screen'
                }
            })
                .then(stream => {
                    let video = that.$refs.self
                    // video = document.getElementById("videoself")
                    video.srcObject = stream
                    video.onloadedmetadata = function (e) {
                        video.play()
                    }
                    console.log(stream)
                }).catch(err => {
                    alert("error")
                })
            let peer = new RTCPeerConnection([
                { url: "stun:stun.l.google.com:19302" },
                {
                    url: "turn:***",
                    username: '***', // 用户名
                    credential: '***' // 密码
                }
            ])
            let socket = new WebSocket()
        },
        async createMedia() {
            this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            let video = that.$refs.self
            video.srcObject = this.localStream
            this.initPeer()
        },
        initPeer() {
            this.peerA = new RTCPeerConnection({ url: "stun:stun.l.google.com:19302" })
            this.peerB = new RTCPeerConnection({ url: "stun:stun.l.google.com:19302" })
            this.peerA.addTrack(this.localStream)
            new RTCPeerConnection().onicecandidate = (event) => {
                if (event.candidate) {
                    this.peerB.addIceCandidate(event.candidate)
                }
            }
        }
    },
    mounted() {
        this.captureVideo()
    }
}
</script>

<style  scoped>
.video {
    width: 400px;
    height: 400px;
    border: 1px solid #000;
    display: inline;
}
</style>