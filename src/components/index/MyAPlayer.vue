<template>
    <!--    v-if延迟加载
    如果不延迟加载会加载musicId的初始值，且不会在musicId获得新值后重新渲染
    -->
    <meting-js server="netease" type="playlist" :id=form.musicId volume="0.1" lrc-type="0"
               fixed="true" theme="#25CCF7" v-if="form.isOk"></meting-js>
</template>

<script>
import {getAbout} from "@/api/about";
	export default {
		name: "MyAPlayer",
        data(){
            return{
                form: {
                    musicId: 7492288721,
                    isOk: false         //标记musicId初始化完成
                },
            }
        },
        mounted() {
            this.getData()
        },
        methods:{
            getData() {
                getAbout().then(res => {
                    if (res.code === 200) {
                        this.form.musicId = res.data.musicId
                        this.form.isOk = true
                        console.log(this.form.musicId)
                        this.msgSuccess(res.msg)
                    } else {
                        this.msgError(res.msg)
                    }
                }).catch(() => {
                    this.msgError("请求失败")
                })
            },
        }
	}
</script>

<style scoped>

</style>