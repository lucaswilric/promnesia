/* @flow */
import type {Src} from './common';

// $FlowFixMe
import OptionsSync from 'webext-options-sync';

type SrcMap = {
    [Src]: Src
};

export type Options = {
    host: string;
    token: string;


    verbose_errors_on: boolean;
    contexts_popup_on: boolean;

    highlight_on: boolean;

    dots: boolean;
    // this is kept as string to preserve formatting and comments
    blacklist: string;
    src_map: SrcMap;

    position_css: string;
    extra_css: string;

}

// TODO allow to export settings
// https://github.com/fregante/webext-options-sync/issues/23
function defaultOptions(): Options {
    return {
        host: 'http://localhost:13131',
        token: '',

        verbose_errors_on: false,
        contexts_popup_on: false,

        highlight_on: true,

        dots: true,
        blacklist: '',
        src_map: {},


        /* Change these if you want to reposition the sidebar
         * E.g. to display on bottom, use :root { --bottom 1; --size: 25%; }
         * TODO shit, somehow this was breaking on Android... I guess keep it aside
         */

        // TODO tooltip??

        // TODO do something defensive if value ended up as invalid?..
        // TODO make it literate from test?
        // TODO hmm. not sure if I can get rid of :root thing without relying on JS?
        // TODO would be nice to use true/false, but that prob. won't work
        // TODO add docs on positioning
        // TODO eh, would be nice to make it work with --right: true. right now it doesn't
        position_css: `
#promnesia-sidebar {
    /* you can also use
       --left/--top/--bottom
       to change the sidebar position */
    --right: 1;

    --size: 30%;

    /* you can also use any other valid CSS
       easiest is to experiment in devtools first */
    background-color: rgba(236, 236, 236, 0.8);
}
`.trim(),

/* uncomment this to suppress the notification popup
   (will be more tweakable in the future)
   .toastify {
     display: none !important;
   }
*/
        // I guess
        // TODO not sure why that in background was necessary..  none repeat scroll 0% 0%;
        // TODO add some docs on configuring it...
        extra_css   : `
.src {
    font-weight: bold;
}
/* you can use devtools to find out which CSS classes you can tweak */
`.trim(),
    };
}


// TODO mm. don't really like having global object, but seems that it's easiest way to avoid race conditions
// TODO https://github.com/fregante/webext-options-sync/issues/38 -- fixed now
const _options = new OptionsSync({
    defaults: defaultOptions(),
});


function optSync() {
    return _options;
}

export async function getOptions(): Promise<Options> {
    return await optSync().getAll();
}

// TODO legacy; remove
export async function get_options_async() {
    return await getOptions();
}

/*
function sleeper(ms) {
    return function(x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
}
*/

export async function setOptions(opts: Options) {
    const os = optSync();
    await os.set(opts);
}
