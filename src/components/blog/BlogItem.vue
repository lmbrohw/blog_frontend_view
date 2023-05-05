<template>
	<div>
		<div class="ui padded attached segment m-padded-tb-large m-margin-bottom-big m-box" v-for="item in blogList" :key="item.id">
			<div class="ui middle aligned mobile reversed stackable">
				<div class="ui grid m-margin-lr">

					<!--标题-->
					<div class="row m-padded-tb-small">
						<h2 class="ui header m-center m-scaleup">
							<a href="javascript:;" @click.prevent="toBlog(item)" class="m-black">{{ item.title }}</a>
						</h2>
					</div>
					<div class="typo m-padded-tb-small line-numbers match-braces rainbow-braces" v-html="item.description"></div>
					<!--阅读全文按钮-->
					<div class="row m-padded-tb-small m-margin-top">
						<a href="javascript:;" @click.prevent="toBlog(item)" class="color-btn">阅读全文</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "BlogItem",
		props: {
			blogList: {
				type: Array,
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

</style>