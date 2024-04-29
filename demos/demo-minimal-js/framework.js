/* eslint-disable vars-on-top */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-var */
// FRAMEWork from Genesys
var contactSearchCallback;
window.Framework = {
    config: {
        name:"FNHW_Hubspot",
        clientIds: {
            "usw2.pure.cloud": "3532a127-7444-44a5-b5ea-9f0e705ad65a",
        },
        customInteractionAttributes: ["PT_URLPop", "PT_SearchValue", "PT_TransferContext"],
        settings: {
            embedWebRTCByDefault: true,
            hideWebRTCPopUpOption: false,
            enableCallLogs: true,
            enableTransferContext: true,
            hideCallLogSubject: true,
            hideCallLogContact: false,
            hideCallLogRelation: false,
            dedicatedLoginWindow: true,
            enableServerSideLogging: true,
            searchTargets: ["people", "queues", "frameworkcontacts"],
            theme: {
                primary: "#FF5733",
                text: "#0b5394",
            },
        },
    },

    initialSetup() {
        window.PureCloud.subscribe([
            {
                type: "Interaction",
                callback(category, interaction) {
                    window.parent.postMessage(JSON.stringify({ type:"interactionSubscription", data:{ category, interaction } }), "*");
                    // if interaction.state = connected
                    // else if interaction.state = "DIALING" trigger Hubspot event.
                },
            },
            {
                type: "UserAction",
                callback(category, data) {
                    window.parent.postMessage(JSON.stringify({ type:"userActionSubscription", data:{ category, data } }), "*");
                },
            },
            {
                type: "Notification",
                callback(category, data) {
                    window.parent.postMessage(JSON.stringify({ type:"notificationSubscription", data:{ category, data } }), "*");
                },
            },
        ]);

        window.addEventListener("message", event => {
            try {
                // eslint-disable-next-line vars-on-top
                var message = JSON.parse(event.data);
                if (message) {
                    if (message.type == "clickToDial") {
                        // console.log(message);
                        // console.log(message.data);
                        // console.log(message.data.autoPlace);
                        message.data.autoPlace = true;
                        // console.log(message.data);
                        setTimeout(() => {
                            console.log("in the time out", message.data);
                            window.PureCloud.clickToDial(message.data);
}, 100);
                        // console.log(message.data);
                        // console.log("after timeout");

                    } else if (message.type == "addAssociation") {
                        window.PureCloud.addAssociation(message.data);
                    } else if (message.type == "addAttribute") {
                        window.PureCloud.addCustomAttributes(message.data);
                    } else if (message.type == "addTransferContext") {
                        window.PureCloud.addTransferContext(message.data);
                    } else if (message.type == "sendContactSearch") {
                        if (contactSearchCallback) {
                            contactSearchCallback(message.data);
                        }
                    } else if (message.type == "updateUserStatus") {
                        window.PureCloud.User.updateStatus(message.data);
                    } else if (message.type == "updateInteractionState") {
                        window.PureCloud.Interaction.updateState(message.data);
                    } else if (message.type == "setView") {
                        console.log("setView ", message.data);
                        window.PureCloud.User.setView(message.data);
                    } else if (message.type == "updateAudioConfiguration") {
                        window.PureCloud.User.Notification.setAudioConfiguration(message.data);
                    } else if (message.type == "sendCustomNotification") {
                        window.PureCloud.User.Notification.notifyUser(message.data);
                    } else {
                        console.log(message);
                    }
                }
            } catch (e) {
                console.error(e, e.stack);
                // ignore if you can not parse the payload into JSON
            }
        });
    },
    screenPop(searchString, interaction) {
        window.parent.postMessage(JSON.stringify({ type:"screenPop", data:{ searchString, interactionId:interaction } }), "*");
    },
    processCallLog(callLog, interaction, eventName, onSuccess, onFailure) {
        window.parent.postMessage(JSON.stringify({ type:"processCallLog", data:{ callLog, interactionId:interaction, eventName } }), "*");
        var success = true;
        if (success) {
            onSuccess({
                id: callLog.id || Date.now(),
            });
        } else {
            onFailure();
        }
    },
    openCallLog(callLog, interaction) {
        window.parent.postMessage(JSON.stringify({ type:"openCallLog", data:{ callLog, interaction } }), "*");
    },
    contactSearch(searchString, onSuccess, onFailure) {
        contactSearchCallback = onSuccess;
        window.parent.postMessage(JSON.stringify({ type:"contactSearch", data:{ searchString } }), "*");
    },
};
