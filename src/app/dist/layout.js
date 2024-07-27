"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var google_1 = require("next/font/google");
var nextjs_1 = require("@clerk/nextjs");
require("./globals.css");
var theme_provider_1 = require("@/components/theme/theme-provider");
var react_1 = require("@vercel/analytics/react");
var inter = google_1.Inter({ subsets: ["latin"] });
exports.metadata = {
    title: "Whale",
    description: "Gobbling up the old web infrastructure one application at a time"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement(nextjs_1.ClerkProvider, null,
        React.createElement("html", { lang: "en" },
            React.createElement("body", { className: inter.className },
                React.createElement(theme_provider_1.ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, disableTransitionOnChange: true },
                    children,
                    React.createElement(react_1.Analytics, null))))));
}
exports["default"] = RootLayout;
