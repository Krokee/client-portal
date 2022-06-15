// Eleventy config file

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// eleventyConfig.addPassthroughCopy("./src/css/");
	// eleventyConfig.addWatchTarget("./src/css/");

	// eleventyConfig.addPassthroughCopy("./src/js/");
	// eleventyConfig.addWatchTarget("./src/js/");

	// eleventyConfig.addPassthroughCopy("src/pics");
	eleventyConfig.addPassthroughCopy("src/favicon");

	// Find and copy any `png` files, maintaining directory structure.
	// eleventyConfig.addPassthroughCopy("src/**/*.png");


	// eleventyConfig.addCollection("principles", function (collectionApi) {
	// 	return collectionApi.getFilteredByTag("principles").sort(function (a, b) {
	// 		return a.data.order - b.data.order;
	// 	});
	// });

	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	return {
		dir: {
			input: "src",
			output: "public",
		},
	};
};