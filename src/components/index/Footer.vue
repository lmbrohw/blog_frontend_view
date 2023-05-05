<template>
	<footer class="ui inverted vertical segment m-padded-tb-large m-opacity">
		<div class="ui center aligned container">
			<div class="ui inverted divided stackable grid">

				<div class="three wide column">
					<div class="ui link list">
						<h4 class="ui inverted header m-text-thin m-text-spaced">{{ siteInfo.footerImgTitle }}</h4>
						<div class="item">
							<img :src="siteInfo.footerImgUrl" class="ui rounded image" alt="" style="width: 100px">
						</div>
					</div>
				</div>

				<div class="six wide column">
					<h4 class="ui inverted header m-text-thin m-text-spaced">最新博客</h4>
					<div class="ui inverted link list">
						<a href="javascript:;" @click.prevent="toBlog(item)" v-for="item in newBlogList" :key="item.id" class="item m-text-thin m-padded-tb-small">{{ item.title }}</a>
					</div>
				</div>

				<div class="seven wide column">
					<p id="hitokotoText" class="m-text-thin m-text-spaced m-opacity-mini">{{ hitokoto.hitokoto }}</p>
					<p id="hitokotoFrom" class="m-text-thin m-text-spaced m-opacity-mini" style="float: right" v-text="hitokoto.from?`——《${hitokoto.from}》`:''"></p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		name: "Footer",
		props: {
			siteInfo: {
				type: Object,
				required: true
			},
			badges: {
				type: Array,
				required: true
			},
			newBlogList: {
				type: Array,
				required: true
			},
			hitokoto: {
				type: Object,
				required: true
			}
		},
		methods: {
			toBlog(blog) {
				this.$store.dispatch('goBlogPage', blog)
			}
		}
	}
</script>

<style scoped>
	@import "../../assets/css/badge.css";

	.github-badge a {
		color: #fff;
	}

	.beian {
		width: 17px;
		height: 17px;
		margin-bottom: -4px;
		margin-right: 5px;
	}
</style>