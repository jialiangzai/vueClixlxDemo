<template>
    <div class="coursemain">
        <div class="main-container">
            <ul class="all">
                <li class="item"><a href="#">综合</a></li>
                <li class="item">|</li>
                <li class="item"><a href="#">最新课程</a></li>
                <li class="item">|</li>
                <li class="item"><a href="#">最多购买</a></li>
                <li class="item">|</li>
                <li class="item">
                    <a href="#">
                        价格
                        <span class="arrow">
                            <img class="up" src="/image/up-arrow8.png" />
                            <img class="down" src="/image/up-arrow8.png" />
                        </span>
                    </a>
                </li>

            </ul>
        </div>
    </div>
</template>

<style scoped>
.coursemain{
    width: 100%;
}
.main-container{
    width: 1300px;
    height: 100%;
    margin: 0 auto;
    /* background: chartreuse; */
}
.all{
    display: flex;
    margin-left: 50px;
    padding-top: 50px;
    font-size: 16px;
    color: #515759;
}
.all .item:first-child{
    margin-right: 20px;
}
.all .item{
    margin:0 15px;
}
.arrow{
    background: chartreuse;
    position: relative;
}
.up{
    position: absolute;
    top: 5px;
    left:2px;
}
.down{
    position: absolute;
    top: 15px;
    left:2px;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg); 	/* IE 9 */
    -moz-transform:rotate(180deg); 	/* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg); 	/* Opera */
}
</style>