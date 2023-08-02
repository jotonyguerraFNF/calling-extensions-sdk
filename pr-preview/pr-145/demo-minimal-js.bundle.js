/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"answerCall\": () => (/* binding */ answerCall),\n/* harmony export */   \"completeCall\": () => (/* binding */ completeCall),\n/* harmony export */   \"endCall\": () => (/* binding */ endCall),\n/* harmony export */   \"incomingCall\": () => (/* binding */ incomingCall),\n/* harmony export */   \"initialize\": () => (/* binding */ initialize),\n/* harmony export */   \"logIn\": () => (/* binding */ logIn),\n/* harmony export */   \"logOut\": () => (/* binding */ logOut),\n/* harmony export */   \"outgoingCall\": () => (/* binding */ outgoingCall),\n/* harmony export */   \"resizeWidget\": () => (/* binding */ resizeWidget),\n/* harmony export */   \"sendError\": () => (/* binding */ sendError),\n/* harmony export */   \"userAvailable\": () => (/* binding */ userAvailable),\n/* harmony export */   \"userUnavailable\": () => (/* binding */ userUnavailable)\n/* harmony export */ });\n/* harmony import */ var _src_CallingExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/CallingExtensions */ \"../../src/CallingExtensions.js\");\n/* harmony import */ var _src_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/Constants */ \"../../src/Constants.js\");\n\n\n// import CallingExtensions, { Constants } from \"@hubspot/calling-extensions-sdk\";\n// const { errorType, callEndStatus } = Constants;\n\nconst state = {\n  engagementId: 0,\n  phoneNumber: \"+1234\",\n  userAvailable: false,\n};\n\nconst sizeInfo = {\n  width: 400,\n  height: 600,\n};\n\n/** Button IDs */\nconst ANSWER_CALL = \"answercall\";\nconst COMPLETE_CALL = \"completecall\";\nconst END_CALL = \"endcall\";\nconst INCOMING_CALL = \"incomingcall\";\nconst INITIALIZE = \"initialize\";\nconst LOG_IN = \"login\";\nconst LOG_OUT = \"logout\";\nconst OUTGOING_CALL = \"outgoingcall\";\nconst RESIZE_WIDGET = \"resizewidget\";\nconst SEND_ERROR = \"senderror\";\nconst USER_AVAILABLE = \"useravailable\";\nconst USER_UNAVAILABLE = \"userunavailable\";\n\nfunction disableButtons(ids) {\n  ids.forEach(id => {\n    document.querySelector(`#${id}`).setAttribute(\"disabled\", true);\n  });\n}\n\nfunction enableButtons(ids) {\n  ids.forEach(id => {\n    document.querySelector(`#${id}`).removeAttribute(\"disabled\");\n  });\n}\n\nconst cti = new _src_CallingExtensions__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  debugMode: true,\n  eventHandlers: {\n    onReady: () => {\n      cti.initialized({\n        isLoggedIn: false,\n        sizeInfo,\n      });\n      disableButtons([INITIALIZE]);\n      enableButtons([LOG_IN, SEND_ERROR, RESIZE_WIDGET]);\n    },\n    onDialNumber: (data, rawEvent) => {\n      const { phoneNumber } = data;\n      state.phoneNumber = phoneNumber;\n    },\n    onEngagementCreated: (data, rawEvent) => {\n      const { engagementId } = data;\n      state.engagementId = engagementId;\n    },\n    onEndCall: () => {\n      window.setTimeout(() => {\n        cti.callEnded();\n      }, 500);\n    },\n    onVisibilityChanged: (data, rawEvent) => {},\n    onCreateEngagementSucceeded: (data, rawEvent) => {\n      const { engagementId } = data;\n      state.engagementId = engagementId;\n    },\n    onCreateEngagementFailed: (data, rawEvent) => {},\n  },\n});\n\nfunction initialize() {\n  cti.initialized({\n    isLoggedIn: false,\n  });\n  disableButtons([INITIALIZE]);\n  enableButtons([LOG_IN, SEND_ERROR, RESIZE_WIDGET]);\n}\n\nfunction logIn() {\n  cti.userLoggedIn();\n  disableButtons([LOG_IN, INITIALIZE]);\n  enableButtons([LOG_OUT, OUTGOING_CALL]);\n  if (state.userAvailable) {\n    disableButtons([USER_AVAILABLE]);\n    enableButtons([INCOMING_CALL, USER_UNAVAILABLE]);\n  } else {\n    disableButtons([INCOMING_CALL, USER_UNAVAILABLE]);\n    enableButtons([USER_AVAILABLE]);\n  }\n}\n\nfunction logOut() {\n  cti.userLoggedOut();\n  disableButtons([\n    LOG_OUT,\n    OUTGOING_CALL,\n    INCOMING_CALL,\n    ANSWER_CALL,\n    END_CALL,\n    COMPLETE_CALL,\n    USER_AVAILABLE,\n    USER_UNAVAILABLE,\n  ]);\n  enableButtons([LOG_IN]);\n}\n\nfunction userAvailable() {\n  cti.userAvailable();\n  state.userAvailable = true;\n  disableButtons([USER_AVAILABLE]);\n  enableButtons([INCOMING_CALL, USER_UNAVAILABLE]);\n}\n\nfunction userUnavailable() {\n  cti.userUnavailable();\n  state.userAvailable = false;\n  disableButtons([INCOMING_CALL, USER_UNAVAILABLE]);\n  enableButtons([USER_AVAILABLE]);\n}\n\nfunction incomingCall() {\n  window.setTimeout(() => {\n    cti.incomingCall({\n      createEngagement: \"true\",\n      fromNumber: \"+123\",\n      toNumber: state.phoneNumber,\n    });\n  }, 500);\n  disableButtons([OUTGOING_CALL, INCOMING_CALL, USER_UNAVAILABLE]);\n  enableButtons([ANSWER_CALL, END_CALL]);\n}\n\nfunction outgoingCall() {\n  window.setTimeout(() => {\n    cti.outgoingCall({\n      createEngagement: \"true\",\n      phoneNumber: state.phoneNumber,\n    });\n  }, 500);\n  disableButtons([OUTGOING_CALL, INCOMING_CALL, USER_UNAVAILABLE]);\n  enableButtons([ANSWER_CALL, END_CALL]);\n}\n\nfunction answerCall() {\n  cti.callAnswered();\n  disableButtons([ANSWER_CALL]);\n}\n\nfunction endCall() {\n  cti.callEnded({\n    callEndStatus: _src_Constants__WEBPACK_IMPORTED_MODULE_1__.callEndStatus.INTERNAL_COMPLETED,\n  });\n  disableButtons([ANSWER_CALL, END_CALL]);\n  enableButtons([COMPLETE_CALL]);\n}\n\nfunction completeCall() {\n  cti.callCompleted({\n    engagementId: state.engagementId,\n    hideWidget: false,\n  });\n  disableButtons([COMPLETE_CALL]);\n  enableButtons([OUTGOING_CALL, INCOMING_CALL, USER_UNAVAILABLE]);\n}\n\nfunction sendError() {\n  cti.sendError({\n    type: _src_Constants__WEBPACK_IMPORTED_MODULE_1__.errorType.GENERIC,\n    message: \"This is an error alert shown in the Hubspot UI\",\n  });\n}\n\nfunction resizeWidget() {\n  sizeInfo.width += 20;\n  sizeInfo.height += 20;\n  cti.resizeWidget({\n    width: sizeInfo.width,\n    height: sizeInfo.height,\n  });\n}\n\n\n//# sourceURL=webpack://calling-extensions-sdk-demo-minimal-js/./index.js?");

/***/ }),

/***/ "../../src/CallingExtensions.js":
/*!**************************************!*\
  !*** ../../src/CallingExtensions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _IFrameManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IFrameManager */ \"../../src/IFrameManager.js\");\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ \"../../src/Constants.js\");\n\"use es6\";\n\n\n\n\n/**\n * @typedef {Object} EventHandlers\n * @property {function} onReady - Called when HubSpot is ready to receive messages.\n * @property {function} onDialNumber - Called when the HubSpot sends a dial number from the contact.\n * @property {function} onEngagementCreated - Called when HubSpot creates an engagement\n * for the call.\n * @property {function} onVisibilityChanged - Called when the call widget's visibility changes.\n */\n\n/**\n * @typedef {Object} Options\n * @property {boolean} debugMode - Whether to log various inbound/outbound debug messages\n * to the console.\n * @property {EventHandlers} eventHandlers - Event handlers handle inbound messages.\n */\n\n/*\n * CallingExtensions allows call providers to communicate with HubSpot.\n */\nclass CallingExtensions {\n  /**\n   * @param {Options} options\n   */\n  constructor(options) {\n    if (!options || !options.eventHandlers) {\n      throw new Error(\"Invalid options or missing eventHandlers.\");\n    }\n\n    this.options = options;\n\n    this.iFrameManager = new _IFrameManager__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      debugMode: options.debugMode,\n      onMessageHandler: event => this.onMessageHandler(event),\n    });\n  }\n\n  initialized(userData) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.INITIALIZED,\n      data: { ...userData },\n    });\n  }\n\n  userAvailable() {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.USER_AVAILABLE,\n    });\n  }\n\n  userUnavailable() {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.USER_UNAVAILABLE,\n    });\n  }\n\n  userLoggedIn() {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.LOGGED_IN,\n    });\n  }\n\n  userLoggedOut() {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.LOGGED_OUT,\n    });\n  }\n\n  incomingCall(callDetails) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.INCOMING_CALL,\n      data: callDetails,\n    });\n  }\n\n  outgoingCall(callDetails) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.OUTGOING_CALL_STARTED,\n      data: callDetails,\n    });\n  }\n\n  callAnswered() {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.CALL_ANSWERED,\n    });\n  }\n\n  callData(data) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.CALL_DATA,\n      data,\n    });\n  }\n\n  callEnded(engagementData) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.CALL_ENDED,\n      data: engagementData,\n    });\n  }\n\n  callCompleted(callCompletedData) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.CALL_COMPLETED,\n      data: callCompletedData,\n    });\n  }\n\n  sendError(errorData) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.ERROR,\n      data: errorData,\n    });\n  }\n\n  resizeWidget(sizeInfo) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.RESIZE_WIDGET,\n      data: sizeInfo,\n    });\n  }\n\n  sendMessage(message) {\n    this.iFrameManager.sendMessage(message);\n  }\n\n  onMessageHandler(event) {\n    const { type, data } = event;\n    const { eventHandlers } = this.options;\n    let handler;\n    switch (type) {\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.READY: {\n        const { onReady } = eventHandlers;\n        handler = onReady;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.DIAL_NUMBER: {\n        const { onDialNumber } = eventHandlers;\n        handler = onDialNumber;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.ENGAGEMENT_CREATED: {\n        const { onEngagementCreated } = eventHandlers;\n        handler = onEngagementCreated;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.END_CALL: {\n        const { onEndCall } = eventHandlers;\n        handler = onEndCall;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.VISIBILITY_CHANGED: {\n        const { onVisibilityChanged } = eventHandlers;\n        handler = onVisibilityChanged;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.SET_CALL_STATE: {\n        const { onSetCallState } = eventHandlers;\n        handler = onSetCallState;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.CREATE_ENGAGEMENT_SUCCEEDED: {\n        const { onCreateEngagementSucceeded } = eventHandlers;\n        handler = onCreateEngagementSucceeded;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.CREATE_ENGAGEMENT_FAILED: {\n        const { onCreateEngagementFailed } = eventHandlers;\n        handler = onCreateEngagementFailed;\n        break;\n      }\n      default: {\n        // Send back a message indicating an unknown event is received\n        this.sendMessage({\n          type: _Constants__WEBPACK_IMPORTED_MODULE_1__.messageType.ERROR,\n          data: {\n            type: _Constants__WEBPACK_IMPORTED_MODULE_1__.errorType.UNKNOWN_MESSAGE_TYPE,\n            data: {\n              originalMessage: event,\n            },\n          },\n        });\n        break;\n      }\n    }\n    handler = handler || eventHandlers.defaultEventHandler;\n    if (handler) {\n      handler(data, event);\n    } else {\n      console.error(\n        `No event handler is available to handle message of type: ${type}`,\n      );\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CallingExtensions);\n\n\n//# sourceURL=webpack://calling-extensions-sdk-demo-minimal-js/../../src/CallingExtensions.js?");

/***/ }),

/***/ "../../src/Constants.js":
/*!******************************!*\
  !*** ../../src/Constants.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"VERSION\": () => (/* binding */ VERSION),\n/* harmony export */   \"callEndStatus\": () => (/* binding */ callEndStatus),\n/* harmony export */   \"callEndingStatus\": () => (/* binding */ callEndingStatus),\n/* harmony export */   \"callInProgressStatus\": () => (/* binding */ callInProgressStatus),\n/* harmony export */   \"callRingingStatus\": () => (/* binding */ callRingingStatus),\n/* harmony export */   \"callStatus\": () => (/* binding */ callStatus),\n/* harmony export */   \"errorType\": () => (/* binding */ errorType),\n/* harmony export */   \"messageType\": () => (/* binding */ messageType)\n/* harmony export */ });\n\"use es6\";\n\nconst { version } = __webpack_require__(/*! ../package.json */ \"../../package.json\");\nconst VERSION = version;\n\nconst messageType = {\n  CALL_ANSWERED: \"CALL_ANSWERED\",\n  CALL_COMPLETED: \"CALL_COMPLETED\",\n  CALL_DATA: \"CALL_DATA\",\n  CALL_ENDED: \"CALL_ENDED\",\n  DIAL_NUMBER: \"DIAL_NUMBER\",\n  END_CALL: \"END_CALL\",\n  ENGAGEMENT_CREATED: \"ENGAGEMENT_CREATED\",\n  ERROR: \"ERROR\",\n  INCOMING_CALL: \"INCOMING_CALL\",\n  INITIALIZED: \"INITIALIZED\",\n  LOGGED_IN: \"LOGGED_IN\",\n  LOGGED_OUT: \"LOGGED_OUT\",\n  OUTGOING_CALL_STARTED: \"OUTGOING_CALL_STARTED\",\n  READY: \"READY\",\n  RESIZE_WIDGET: \"RESIZE_WIDGET\",\n  SET_CALL_STATE: \"SET_CALL_STATE\",\n  SET_WIDGET_URL: \"SET_WIDGET_URL\",\n  SYNC_ACK_FAILED: \"SYNC_ACK_FAILED\",\n  SYNC_ACK: \"SYNC_ACK\",\n  SYNC: \"SYNC\",\n  UNLOADING: \"UNLOADING\",\n  USER_AVAILABLE: \"USER_AVAILABLE\",\n  USER_UNAVAILABLE: \"USER_UNAVAILABLE\",\n  VISIBILITY_CHANGED: \"VISIBILITY_CHANGED\",\n  CREATE_ENGAGEMENT_SUCCEEDED: \"CREATE_ENGAGEMENT_SUCCEEDED\",\n  CREATE_ENGAGEMENT_FAILED: \"CREATE_ENGAGEMENT_FAILED\",\n};\n\nconst errorType = {\n  UNKNOWN_MESSAGE_TYPE: \"UNKNOWN_MESSAGE_TYPE\",\n  GENERIC: \"GENERIC\",\n};\n\n/** These are potential statuses from the BE client when calling from phone\n * or detecting that a call has ended in the linked engagement */\n\nconst INTERNAL_CONNECTING = \"CONNECTING\";\nconst INTERNAL_CALLING_CRM_USER = \"CALLING_CRM_USER\";\nconst INTERNAL_IN_PROGRESS = \"IN_PROGRESS\";\nconst INTERNAL_CANCELED = \"CANCELED\";\nconst INTERNAL_FAILED = \"FAILED\";\nconst INTERNAL_BUSY = \"BUSY\";\nconst INTERNAL_NO_ANSWER = \"NO_ANSWER\";\nconst INTERNAL_COMPLETED = \"COMPLETED\";\nconst INTERNAL_ENDING = \"ENDING\";\nconst INTERNAL_QUEUED = \"QUEUED\";\nconst INTERNAL_RINGING = \"RINGING\";\n\nconst callStatus = {\n  INTERNAL_CONNECTING,\n  INTERNAL_CALLING_CRM_USER,\n  INTERNAL_IN_PROGRESS,\n  INTERNAL_CANCELED,\n  INTERNAL_FAILED,\n  INTERNAL_BUSY,\n  INTERNAL_NO_ANSWER,\n  INTERNAL_COMPLETED,\n  INTERNAL_ENDING,\n  INTERNAL_QUEUED,\n  INTERNAL_RINGING,\n};\n\nconst callRingingStatus = {\n  INTERNAL_QUEUED,\n  INTERNAL_RINGING,\n  INTERNAL_CONNECTING,\n  INTERNAL_CALLING_CRM_USER,\n};\n\nconst callInProgressStatus = { INTERNAL_IN_PROGRESS };\n\nconst callEndingStatus = { INTERNAL_ENDING };\n\nconst callEndStatus = {\n  INTERNAL_COMPLETED,\n  INTERNAL_FAILED,\n  INTERNAL_CANCELED,\n  INTERNAL_BUSY,\n  INTERNAL_NO_ANSWER,\n};\n\n\n//# sourceURL=webpack://calling-extensions-sdk-demo-minimal-js/../../src/Constants.js?");

/***/ }),

/***/ "../../src/IFrameManager.js":
/*!**********************************!*\
  !*** ../../src/IFrameManager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ \"../../src/Constants.js\");\n\"use es6\";\n\n\n\nconst prefix = `[calling-extensions-sdk@${_Constants__WEBPACK_IMPORTED_MODULE_0__.VERSION}]`;\n/*\n * IFrameManager abstracts the iFrame communication between the IFrameHost and an IFrame\n * An IFrameManager instance can act as part of the IFrameHost and an IFrame depending on\n * the options.\n */\nclass IFrameManager {\n  constructor(options) {\n    this.options = options;\n    const { iFrameOptions, onMessageHandler, debugMode } = options;\n\n    this.onMessageHandler = onMessageHandler;\n    if (!this.onMessageHandler) {\n      throw new Error(\"Invalid options: onMessageHandler is not defined\");\n    }\n    this.isIFrameHost = !!iFrameOptions;\n    this.debugMode = debugMode;\n\n    // Keeps track of all the callbacks\n    this.callbacks = {};\n\n    this.instanceId = Date.now();\n    this.instanceRegexp = new RegExp(`^${this.instanceId}`);\n    this.isReady = false;\n\n    this.messageHandler = event => this.onMessage(event);\n    window.addEventListener(\"message\", this.messageHandler);\n\n    if (iFrameOptions) {\n      this.iFrame = IFrameManager.createIFrame(iFrameOptions, () => {\n        this.firstSyncSent = Date.now();\n        this.isReady = false;\n        this.sendSync();\n      });\n    }\n\n    this.destinationWindow = iFrameOptions\n      ? this.iFrame.contentWindow\n      : window.parent;\n\n    this.destinationHost = IFrameManager.getDestinationHost(iFrameOptions);\n  }\n\n  /*\n   * Creates a new message id\n   */\n  static createMessageId(instanceId) {\n    return `${instanceId}_${Date.now()}`;\n  }\n\n  /*\n   * Gets the html element that hosts the iFrame\n   */\n  static getHostElement(hostElementSelector) {\n    const hostElement = document.querySelector(hostElementSelector);\n    if (!hostElement) {\n      throw new Error(\n        `hostElement not found. Selector - ${hostElementSelector}`,\n      );\n    }\n    return hostElement;\n  }\n\n  static extractHostFromUrl(url) {\n    const a = document.createElement(\"a\");\n    a.href = url;\n    return `${a.protocol}//${a.host}`;\n  }\n\n  static getDestinationHost(iFrameOptions) {\n    const url = iFrameOptions ? iFrameOptions.src : document.referrer;\n    return IFrameManager.extractHostFromUrl(url);\n  }\n\n  static createIFrame(iFrameOptions, onLoadCallback) {\n    const {\n      src, width, height, hostElementSelector,\n    } = iFrameOptions;\n\n    if (!src || !width || !height || !hostElementSelector) {\n      throw new Error(\n        \"iFrameOptions is missing one of the required properties - {src, width, height, hostElementSelector}.\",\n      );\n    }\n\n    const iFrame = document.createElement(\"iFrame\");\n    iFrame.onload = onLoadCallback;\n    iFrame.onerror = this.handleLoadError;\n    iFrame.src = src;\n    iFrame.width = width;\n    iFrame.height = height;\n    iFrame.allow = \"microphone; autoplay\";\n    iFrame.id = \"hubspot-calling-extension-iframe\";\n\n    const element = IFrameManager.getHostElement(hostElementSelector);\n    element.innerHTML = \"\";\n    element.appendChild(iFrame);\n\n    return element.querySelector(\"iFrame\");\n  }\n\n  handleLoadError() {\n    this.onMessageHandler({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_0__.messageType.SYNC_ACK_FAILED,\n    });\n  }\n\n  updateIFrameSize(sizeInfo) {\n    const { width, height } = sizeInfo;\n    const formatSize = size => (typeof size === \"number\" ? `${size}px` : size);\n    if (width) {\n      this.iFrame.setAttribute(\"width\", formatSize(width));\n    }\n    if (height) {\n      this.iFrame.setAttribute(\"height\", formatSize(height));\n    }\n  }\n\n  onReady() {\n    this.isReady = true;\n    this.onMessageHandler({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_0__.messageType.READY,\n    });\n  }\n\n  /*\n   * Unload the iFrame\n   */\n  remove() {\n    window.removeEventListener(\"message\", this.messageHandler);\n\n    if (this.iFrame) {\n      const element = IFrameManager.getHostElement(\n        this.options.iFrameOptions.hostElementSelector,\n      );\n      element.innerHTML = \"\";\n\n      this.isReady = false;\n      this.iFrame = null;\n      this.options = null;\n    }\n  }\n\n  /*\n   * Send a message to the destination window.\n   */\n  sendMessage(message, callback) {\n    const { type } = message;\n    if (type !== _Constants__WEBPACK_IMPORTED_MODULE_0__.messageType.SYNC && !this.isReady) {\n      // Do not send a message unless the iFrame is ready to receive.\n      console.warn(prefix, \"iFrame not initialized to send a message within HubSpot\", message);\n      return;\n    }\n\n    let { messageId } = message;\n    if (!messageId) {\n      // Initiating a new message\n      messageId = IFrameManager.createMessageId(this.instanceId);\n      if (callback) {\n        // Keep track of the callback\n        this.callbacks[messageId] = callback;\n      }\n    }\n\n    const newMessage = Object.assign({}, message, {\n      messageId,\n    });\n\n    this.logDebugMessage(prefix, \"To HubSpot\", type, message);\n    this.destinationWindow.postMessage(newMessage, this.destinationHost);\n  }\n\n  onMessage(event) {\n    const { data, origin } = event;\n    const { type } = event.data;\n    if (type === _Constants__WEBPACK_IMPORTED_MODULE_0__.messageType.SYNC) {\n      // The iFrame host can send this message multiple times, don't respond more than once\n      if (!this.isReady) {\n        this.isReady = true;\n\n        const message = Object.assign({}, event.data, {\n          type: _Constants__WEBPACK_IMPORTED_MODULE_0__.messageType.SYNC_ACK,\n          debugMode: this.debugMode,\n          version: _Constants__WEBPACK_IMPORTED_MODULE_0__.VERSION,\n          iFrameUrl: IFrameManager.extractHostFromUrl(window.location.href),\n        });\n\n        const { hostUrl } = event.data;\n        this.destinationHost = hostUrl || this.destinationHost;\n        this.sendMessage(message);\n        this.onReady();\n      }\n      return;\n    }\n\n    if (this.destinationHost !== origin) {\n      // Ignore messages from an unknown origin\n      return;\n    }\n\n    if (type === _Constants__WEBPACK_IMPORTED_MODULE_0__.messageType.SET_WIDGET_URL) {\n      const { iFrameUrl } = data;\n      this.destinationHost = iFrameUrl || this.destinationHost;\n      return;\n    }\n\n    const { messageId } = data;\n\n    if (!messageId || !type) {\n      return;\n    }\n\n    this.logDebugMessage(prefix, \"From HubSpot\", type, { data });\n    if (this.instanceRegexp.test(messageId)) {\n      // This is a response to some message generated by HubSpot\n      const callBack = this.callbacks[messageId];\n      if (callBack) {\n        callBack(data);\n        delete this.callbacks[messageId];\n      }\n      return;\n    }\n\n    // This is a new message, let the handler handle it.\n    this.onMessageHandler(data);\n  }\n\n  sendSync() {\n    // No SYNC_ACK message after 30sec results in a failure\n    if (Date.now() - this.firstSyncSent > 30000) {\n      this.onMessageHandler({\n        type: _Constants__WEBPACK_IMPORTED_MODULE_0__.messageType.SYNC_ACK_FAILED,\n      });\n      return;\n    }\n\n    this.sendMessage(\n      {\n        type: _Constants__WEBPACK_IMPORTED_MODULE_0__.messageType.SYNC,\n        hostUrl: IFrameManager.extractHostFromUrl(window.location.href),\n      },\n      eventData => {\n        const { iFrameUrl } = eventData;\n        this.destinationHost = iFrameUrl || this.destinationHost;\n        this.onReady();\n        this.debugMode = eventData && eventData.debugMode;\n      },\n    );\n\n    // In cases where the call widget loads the calling extensions asynchronously, message\n    // handlers may not be set up - retry until a response from the iFrame\n    window.setTimeout(() => {\n      if (this.iFrame && !this.isReady) {\n        this.sendSync();\n      }\n    }, 100);\n  }\n\n  logDebugMessage(...args) {\n    if (this.debugMode) {\n      console.log.call(null, args);\n      return;\n    }\n    console.debug.call(null, args);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IFrameManager);\n\n\n//# sourceURL=webpack://calling-extensions-sdk-demo-minimal-js/../../src/IFrameManager.js?");

/***/ }),

/***/ "../../package.json":
/*!**************************!*\
  !*** ../../package.json ***!
  \**************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"name\":\"@hubspot/calling-extensions-sdk\",\"version\":\"0.1.7\",\"description\":\"HubSpot calling extensions sdk for call widget integration.\",\"publishConfig\":{\"access\":\"public\"},\"scripts\":{\"build\":\"webpack\",\"build:test\":\"npm run build && npm run test\",\"cover\":\"open coverage/lcov-report/index.html\",\"eslint\":\"eslint src --ext .js\",\"eslint:fix\":\"eslint src .js --fix\",\"preversion\":\"npm run build:test\",\"postversion\":\"git push --follow-tags\",\"publish:alpha\":\"npm version prerelease --preid alpha && npm publish --access public --tag next\",\"publish:beta\":\"npm version prerelease --preid beta && npm publish --access public --tag beta\",\"publish:patch\":\"npm version patch && npm publish --access public\",\"publish:minor\":\"npm version minor && npm publish --access public\",\"publish:major\":\"npm version major && npm publish --access public\",\"publish:preminor\":\"npm version preminor && npm run publish:alpha\",\"publish:premajor\":\"npm version premajor && npm run publish:alpha\",\"test:build\":\"npx webpack --config webpack-test.config.js --mode development\",\"test:watch\":\"npx webpack --config webpack-test.config.js --mode development --watch\",\"test:serve\":\"cross-env NODE_ENV=test npm run test:watch & jasmine-browser-runner serve --config=test/support/jasmine-browser.json\",\"test\":\"cross-env NODE_ENV=test npm run test:build && jasmine-browser-runner runSpecs --config=test/support/jasmine-browser.json --browser=headlessChrome\"},\"main\":\"./dist/main.js\",\"files\":[\"dist/\",\"src/\",\"index.js\"],\"module\":\"./index.js\",\"author\":\"\",\"license\":\"MIT\",\"engines\":{\"node\":\">=14\"},\"devDependencies\":{\"@babel/cli\":\"^7.21.0\",\"@babel/core\":\"^7.4.5\",\"@babel/preset-env\":\"^7.21.4\",\"@typescript-eslint/eslint-plugin\":\"^5.59.7\",\"@typescript-eslint/parser\":\"^5.59.7\",\"babel-loader\":\"^8.0.6\",\"cross-env\":\"^7.0.3\",\"eslint\":\"^8.41.0\",\"eslint-config-airbnb\":\"^19.0.4\",\"eslint-plugin-import\":\"^2.27.5\",\"eslint-plugin-jsx-a11y\":\"^6.7.1\",\"eslint-plugin-react\":\"^7.32.2\",\"eslint-plugin-react-hooks\":\"^4.6.0\",\"jasmine-browser-runner\":\"^1.3.0\",\"jasmine-core\":\"^4.6.0\",\"prettier\":\"^2.8.8\",\"typescript\":\"^5.0.4\",\"webpack\":\"^5.77.0\",\"webpack-cli\":\"^5.0.1\"}}');\n\n//# sourceURL=webpack://calling-extensions-sdk-demo-minimal-js/../../package.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});