/*
 * The code theme: navy panels in both site themes, so code reads as the
 * product rather than as a footnote. Token colours are Eazysoft's teal and
 * its tints, with amber and a green tint for the literals. Every colour here
 * is at least 5.5:1 against #0B1B33.
 */
export const NAVY = '#0B1B33';

/** @type {import('@astrojs/starlight/expressive-code').ExpressiveCodeTheme | any} */
export const eazysoftCode = {
    name: 'eazysoft-navy',
    type: 'dark',
    colors: {
        'editor.background': NAVY,
        'editor.foreground': '#EAF0F7',
        'editor.selectionBackground': '#1F3D63',
        'editorLineNumber.foreground': '#8C9BB0',
    },
    tokenColors: [
        {
            scope: ['comment', 'punctuation.definition.comment'],
            settings: { foreground: '#9AA8BB', fontStyle: 'italic' },
        },
        {
            scope: ['keyword', 'storage', 'storage.type', 'keyword.operator.new', 'keyword.control'],
            settings: { foreground: '#3CC6D2' },
        },
        {
            scope: ['entity.name.function', 'support.function', 'meta.function-call'],
            settings: { foreground: '#8FE3EA' },
        },
        {
            scope: ['entity.name.type', 'entity.name.class', 'support.class', 'entity.other.inherited-class'],
            settings: { foreground: '#FFFFFF', fontStyle: 'bold' },
        },
        {
            scope: ['string', 'punctuation.definition.string'],
            settings: { foreground: '#7FD9B3' },
        },
        {
            scope: ['constant.numeric', 'constant.language', 'support.constant'],
            settings: { foreground: '#F7C56B' },
        },
        {
            scope: ['variable', 'variable.other', 'variable.parameter'],
            settings: { foreground: '#C1CBD9' },
        },
        {
            scope: ['entity.name.tag', 'support.type.property-name', 'entity.other.attribute-name'],
            settings: { foreground: '#3CC6D2' },
        },
        {
            scope: ['punctuation', 'keyword.operator', 'meta.brace'],
            settings: { foreground: '#A7B4C6' },
        },
        {
            scope: ['markup.deleted'],
            settings: { foreground: '#FF9E8F' },
        },
        {
            scope: ['markup.inserted'],
            settings: { foreground: '#7FD9B3' },
        },
    ],
};

/** Frame styling shared by every code block on the site. */
export const codeStyles = {
    borderRadius: '10px',
    borderColor: '#1F3350',
    codeFontFamily: "'Geist Mono Variable', 'Cascadia Mono', Consolas, monospace",
    uiFontFamily: "'Geist Variable', 'Segoe UI', system-ui, sans-serif",
    codeFontSize: '0.875rem',
    codeLineHeight: '1.7',
    frames: {
        frameBoxShadowCssValue: '0 18px 36px -18px rgb(11 27 51 / 0.45)',
        editorBackground: NAVY,
        editorTabBarBackground: '#071326',
        editorTabBarBorderBottomColor: '#1F3350',
        editorActiveTabBackground: NAVY,
        editorActiveTabForeground: '#EAF0F7',
        editorActiveTabIndicatorTopColor: '#0FA3B1',
        editorActiveTabIndicatorBottomColor: 'transparent',
        editorActiveTabBorderColor: 'transparent',
        terminalBackground: NAVY,
        terminalTitlebarBackground: '#071326',
        terminalTitlebarForeground: '#A7B4C6',
        terminalTitlebarBorderBottomColor: '#1F3350',
        terminalTitlebarDotsForeground: '#34507A',
        terminalTitlebarDotsOpacity: '1',
        inlineButtonForeground: '#C1CBD9',
        inlineButtonBorder: '#34507A',
        inlineButtonBackground: '#10243F',
        tooltipSuccessBackground: '#0B7C87',
        tooltipSuccessForeground: '#FFFFFF',
    },
};
