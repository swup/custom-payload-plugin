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
		this.swup._getPageData = this.swup.getPageData;
		this.swup.getPageData = this.options.generatePageObject;
	}

	unmount() {
		this.swup.getPageData = this.swup._getPageData;
		swup._getPageData = null;
	}
}
