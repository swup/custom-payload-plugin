import Plugin from '@swup/plugin';

export default class SwupCustomPayloadPlugin extends Plugin {
	name = 'SwupCustomPayloadPlugin';

	requires = { swup: '3' };

	constructor(options = {}) {
		super();

		if (typeof options.generatePageObject !== 'function') {
			throw new Error("Option `generatePageObject` must be a function.");
		}

		this.options = options;
	}

	mount() {
		this.originalGetPageData = this.swup.getPageData;
		this.swup.getPageData = this.options.generatePageObject;
	}

	unmount() {
		this.swup.getPageData = this.originalGetPageData;
		this.originalGetPageData = null;
	}
}
