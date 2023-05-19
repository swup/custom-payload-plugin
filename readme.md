# Swup Custom Payload Plugin

<!-- swup-docs-ignore-start -->
This is a plugin for [swup](https://swup.js.org/) - complete, flexible, extensible and easy to use page transition library for your web.
<!-- swup-docs-ignore-end -->

Add support for sending custom payloads to swup-powered sites. This allows
sending only the actually updated content as JSON, reducing the payload size and
speeding up page load.

To identify a request requiring a custom payload, check if the
`X-Requested-With` header is set to `swup`.

## Installation

Install the plugin from npm and import it into your bundle.

```bash
npm install @swup/custom-payload-plugin
```

```js
import SwupCustomPayloadPlugin from '@swup/custom-payload-plugin';
```

Or include the minified production file from a CDN:

```html
<script src="https://unpkg.com/@swup/custom-payload-plugin@1"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

Supply a `generatePageObject` function that receives a server response object,
parses the response data and and returns a page object for swup to use.
See below for the required structure of that page object.

```javascript
const swup = new Swup({
  plugins: [
    new SwupCustomPayloadPlugin({
        generatePageObject: (request) => {
            const { title, blocks } = /* parse data from response */;
            return {
                title,  // required - title of page
                blocks, // required - containers on page in correct order (as marked by [data-swup] attributes in DOM)
                pageClass, // not requered - class of body element (but might be required by some plugin like Body Class plugin)
                originalContent,    // not required - whole page html content (but might be required by some plugin)
            };
        }
    })
    ]
});
```

## Payload → Page object

The returned page object must include the new page's title and all its content
blocks. Other properties might be required to ensure proper functioning of
additional plugins in use by the site.

|    Property     | Required |                                                  Contents                                                   |             Notes             |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------- |
| title           | Required | Title of the new page                                                                                       |                               |
| blocks          | Required | Containers of the new page, HTML strings, in the correct order (as marked by [data-swup] attributes in DOM) |                               |
| pageClass       | Optional | Class of the new page's body tag                                                                            | Required by Body Class Plugin |
| originalContent | Optional | Full HTML string of the new page                                                                            | Required by Head Plugin       |

```js
return { title, blocks, pageClass, originalContent }
```
