<template>
	<div class="site">
		<!--顶部导航-->
		<Nav :blogName="siteInfo.blogName" :categoryList="categoryList"/>
		<!--首页大图 只在首页且pc端时显示-->
		<div class="m-mobile-hide">
			<Header v-if="$route.name==='home'" :blogName="siteInfo.blogName" />
		</div>

		<div class="main">
			<div class="m-padded-tb-big">
				<div class="ui container">
						<div  style="width: 1500px">
							<keep-alive include="Home">
								<router-view/>
							</keep-alive>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getHitokoto, getSite} from '@/api/index'
	import Nav from "@/components/index/Nav";
	import Header from "@/components/index/Header";
	import Footer from "@/components/index/Footer";
	import Introduction from "@/components/sidebar/Introduction";
	import Tags from "@/components/sidebar/Tags";
	import RandomBlog from "@/components/sidebar/RandomBlog";
	import MyAPlayer from "@/components/index/MyAPlayer";
	import Tocbot from "@/components/sidebar/Tocbot";
	import BlogPasswordDialog from "@/components/index/BlogPasswordDialog";
	import {mapState} from 'vuex'
	import {SAVE_CLIENT_SIZE, SAVE_INTRODUCTION, SAVE_SITE_INFO, RESTORE_COMMENT_FORM} from "@/store/mutations-types";

	export default {
		name: "Index",
		components: {Header, BlogPasswordDialog, Tocbot, MyAPlayer, RandomBlog, Tags, Nav, Footer, Introduction},
		data() {
			return {
				siteInfo: {
					blogName: ''
				},
				categoryList: [],
				tagList: [],
				randomBlogList: [],
				badges: [],
				newBlogList: [],
				hitokoto: {},
			}
		},
		computed: {
			...mapState(['focusMode'])
		},
		watch: {
			//路由改变时，页面滚动至顶部
			'$route.path'() {
				this.scrollToTop()
			}
		},
		created() {
			this.getSite()
			this.getHitokoto()
			//从localStorage恢复之前的评论信息
			this.$store.commit(RESTORE_COMMENT_FORM)
		},
		mounted() {
			//保存可视窗口大小
			this.$store.commit(SAVE_CLIENT_SIZE, {clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
			window.onresize = () => {
				this.$store.commit(SAVE_CLIENT_SIZE, {clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
			}
		},
		methods: {
			getSite() {
				getSite().then(res => {
					if (res.code === 200) {
						this.siteInfo = res.data.siteInfo
						this.badges = res.data.badges
						this.newBlogList = res.data.newBlogList
						this.categoryList = res.data.categoryList
						this.tagList = res.data.tagList
						this.randomBlogList = res.data.randomBlogList
						this.$store.commit(SAVE_SITE_INFO, this.siteInfo)
						this.$store.commit(SAVE_INTRODUCTION, res.data.introduction)
						document.title = this.$route.meta.title + this.siteInfo.webTitleSuffix
					}
				})
			},
			//获取一言
			getHitokoto() {
				getHitokoto().then(res => {
					this.hitokoto = res
				})
			}
		}
	}
</script>

<style scoped>
	.site {
		display: flex;
		min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
		flex-direction: column;
	}

	.main {
		margin-top: 40px;
		flex: 1;
	}

	.main .ui.container {
		width: 1400px !important;
		margin-left: auto !important;
		margin-right: auto !important;
	}

	.ui.grid .three.column {
		padding: 0;
	}

	.ui.grid .ten.column {
		padding-top: 0;
	}

	.m-display-none {
		display: none !important;
	}

	.m-display-none {
		display: none !important;
	}
</style>