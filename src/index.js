import Plugin from '@swup/plugin';

export default class CustomPayloadPlugin extends Plugin {
	name = 'CustomPayloadPlugin';

	constructor(options) {
		super();

		if (!options || typeof options.generatePageObject !== 'function') {
			throw Error("Option 'getPageData' must be defined and must be a function.");
		}

		this.options = options;
	}

	mount() {
		this.originalGetPageData = this.swup.getPageData;
		this.swup.getPageData = this.options.generatePageObject;
	}

	unmount() {
		this.swup.getPageData = this.originalGetPageData;
		this.swup.originalGetPageData = null;
	}
}
