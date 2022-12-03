<template>
    <div>
        <div class="wrapper">
            <div class="card-inner">
                <a href="#">
                    <a-avatar :size="70" style="border: 1px solid #E5F2FE;margin-top:10px">
                        <img  src="https://kano.guahao.cn/4PK2675026_image140.jpg?timestamp=1634914492116" alt="">
                    </a-avatar>
                </a>
                <p class="doctor-name">
                    李善群
                    <i>主任医师</i>
                </p>
                <p> 男 55 </p>
                <p>
                    复旦大学附属中山医院
                </p>
                <p class="doctor-consult">
                    <span class="star">评分 
                        <em>9.3</em>
                    </span>
                    
                    <span>医龄 </span>
                    <i>25</i>
                </p>
                <p class="doctor-good">
                    擅长：1、慢阻肺康复及鼾症的诊治；2、气管支气管炎、肺巴拉巴拉      
                </p>
                <div class="doctor-service">
                    <a-button :loading="loading2" @click="handleClick2" class="infos">
                        <template #icon>
                            <icon-language />
                        </template>
                        图文问诊
                    </a-button>
                    <a-button :loading="loading2" @click="handleClick2" class="infos">
                        <template #icon>
                            <icon-video-camera />
                        </template>
                        视频问诊
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.card-inner .doctor-service .infos {
    color: #888;
    float: left;
    padding: 8px 0;
    height: 100%;
    width: 50%;
    text-align: center;
    font-size: 12px;
}
.card-inner .doctor-service {
    overflow: hidden;
    background-color: #f8f8f8;
    border-top: 1px solid #e4e4e4;
    margin-top: 10px;
}
.card-inner .doctor-good {
    text-align: left;
    margin: 15px 10px 10px;
    padding-top: 10px;
    border-top: 1px dotted #e4e4e4;
    height: 30px;
    line-height: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.doctor-consult em {
    font-weight: 400;
    color: #f9a821;
}
.doctor-consult .star {
    margin-right: 30px;
}
.card-inner .doctor-consult {
    position: relative;
    display: block;
    text-align: center;
}
.wrapper {
    float: left;
    list-style: none;
    position: relative;
    width: 199px;
    margin-left: 23px;
    margin-bottom: 25px;
    text-align: center;
    color: #888;
    padding-top: 0;
    max-height: 315px;
    cursor:pointer;
    padding-top:10px;
}

.wrapper:hover{
    /* margin-top:0px; */
    transform: translateY(-10px);
    transition: transform 0.2s;
    box-shadow: 10px 10px 5px #888888;
    /* margin-bottom: 10px; */
}
.doctor-name i {
    display: inline-block;
    font-style: normal;
    margin-left: 5px;
}
.doctor-name {
    display: block;
    font-size: 14px;
    color: #333;
}
.card-inner {
    border: 1px solid #e4e4e4;
    color: #888;
}
</style>