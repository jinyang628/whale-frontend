"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var select_1 = require("@/api/select");
var chat_section_1 = require("@/components/chat/chat-section");
var menu_section_1 = require("@/components/menu/menu-section");
var toaster_1 = require("@/components/ui/toaster");
var use_toast_1 = require("@/components/ui/use-toast");
var application_1 = require("@/types/api/application");
var react_1 = require("react");
var zod_1 = require("zod");
var clerk_react_1 = require("@clerk/clerk-react");
var header_buttons_1 = require("@/components/header/header-buttons");
var update_cache_1 = require("@/types/api/user/update-cache");
var update_cache_2 = require("@/api/user/update-cache");
var get_cache_1 = require("@/api/user/get-cache");
var image_1 = require("next/image");
var react_2 = require("@vercel/analytics/react");
function Home() {
    var _this = this;
    var _a = react_1.useState([]), applicationContentArr = _a[0], setApplicationContentArr = _a[1];
    var _b = react_1.useState([]), selectedApplications = _b[0], setSelectedApplicationNames = _b[1];
    var _c = react_1.useState(""), userId = _c[0], setUserId = _c[1];
    var _d = react_1.useState(true), isBlurred = _d[0], setIsBlurred = _d[1];
    var _e = clerk_react_1.useUser(), user = _e.user, isLoaded = _e.isLoaded;
    var isInitializedRef = react_1.useRef(false);
    var presetApplications = react_1.useCallback(function (userId, userEmail) { return __awaiter(_this, void 0, void 0, function () {
        var parsedGetCacheRequest, response, applicationArr, newApplicationNames_1, newApplicationContents_1, i, selectApplicationResponse, applicationName, applicationContent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isInitializedRef.current)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    parsedGetCacheRequest = {
                        user_id: userId,
                        user_email: userEmail
                    };
                    return [4 /*yield*/, get_cache_1.getCache(parsedGetCacheRequest)];
                case 2:
                    response = _a.sent();
                    applicationArr = response.applications;
                    newApplicationNames_1 = [];
                    newApplicationContents_1 = [];
                    for (i = 0; i < applicationArr.length; i++) {
                        selectApplicationResponse = applicationArr[i];
                        applicationName = selectApplicationResponse.application.name;
                        applicationContent = selectApplicationResponse.application;
                        if (!selectedApplications.includes(applicationName)) {
                            newApplicationNames_1.push(applicationName);
                            newApplicationContents_1.push(applicationContent);
                        }
                    }
                    // Batch update state
                    setSelectedApplicationNames(function (prev) { return __spreadArrays(prev, newApplicationNames_1); });
                    setApplicationContentArr(function (prev) { return __spreadArrays(prev, newApplicationContents_1); });
                    // Mark as initialized
                    isInitializedRef.current = true;
                    setIsBlurred(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [selectedApplications]);
    react_1.useEffect(function () {
        var initializeUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var email, userId_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(isLoaded && user && !isInitializedRef.current)) return [3 /*break*/, 2];
                        if (!((_a = user === null || user === void 0 ? void 0 : user.primaryEmailAddress) === null || _a === void 0 ? void 0 : _a.emailAddress)) return [3 /*break*/, 2];
                        email = user.primaryEmailAddress.emailAddress;
                        userId_1 = user.id;
                        setUserId(userId_1);
                        return [4 /*yield*/, presetApplications(userId_1, email)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        initializeUser();
    }, [isLoaded, user, presetApplications]);
    var handleSelectApplication = function (applicationName) { return __awaiter(_this, void 0, void 0, function () {
        var loadingToast, parsedSelectApplicationRequest, selectApplicationResponse, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loadingToast = use_toast_1.toast({
                        title: "Fetching application",
                        description: "Please wait while we fetch the application...",
                        duration: Infinity
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    parsedSelectApplicationRequest = application_1.selectApplicationRequestSchema.parse({
                        user_id: userId,
                        new_application_name: applicationName,
                        all_application_names: selectedApplications
                    });
                    return [4 /*yield*/, select_1.selectApplication(parsedSelectApplicationRequest)];
                case 2:
                    selectApplicationResponse = _a.sent();
                    if (!selectedApplications.includes(applicationName)) {
                        setSelectedApplicationNames(__spreadArrays(selectedApplications, [applicationName]));
                        setApplicationContentArr(__spreadArrays(applicationContentArr, [selectApplicationResponse.application]));
                    }
                    loadingToast.dismiss();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    if (error_2 instanceof zod_1.ZodError) {
                        console.error("Zod error: ", error_2.flatten());
                    }
                    else {
                        console.error(error_2);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var removeApplication = function (applicationName) { return __awaiter(_this, void 0, void 0, function () {
        var updatedApplications, parsedUpdateCacheRequest, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    updatedApplications = selectedApplications.filter(function (app) { return app !== applicationName; });
                    setSelectedApplicationNames(updatedApplications);
                    setApplicationContentArr(applicationContentArr.filter(function (app) { return app.name !== applicationName; }));
                    parsedUpdateCacheRequest = update_cache_1.updateCacheRequestSchema.parse({
                        user_id: userId,
                        all_application_names: updatedApplications
                    });
                    return [4 /*yield*/, update_cache_2.updateCache(parsedUpdateCacheRequest)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    if (error_3 instanceof zod_1.ZodError) {
                        console.error("Zod error: ", error_3.flatten());
                    }
                    else {
                        console.error(error_3);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "flex flex-col h-screen w-full p-[2%]" },
        React.createElement(header_buttons_1["default"], null),
        React.createElement(clerk_react_1.SignedIn, null,
            React.createElement("div", null,
                React.createElement(menu_section_1["default"], { handleSelectApplication: handleSelectApplication, removeApplication: removeApplication, selectedApplications: selectedApplications, applicationContentArr: applicationContentArr }),
                React.createElement(chat_section_1["default"], { selectedApplications: selectedApplications, userId: userId })),
            isBlurred && (React.createElement("div", { className: "absolute inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-90" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", { className: "relative w-64 h-64 mx-auto mb-4" },
                        React.createElement(image_1["default"], { src: "/assistant.jpg", alt: "Loading", layout: "fill", objectFit: "contain" })),
                    React.createElement("p", { className: "text-lg font-semibold" }, "Preparing the ocean for your whale..."))))),
        React.createElement(toaster_1.Toaster, null),
        React.createElement(react_2.Analytics, null)));
}
exports["default"] = Home;
