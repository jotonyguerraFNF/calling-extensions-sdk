/* eslint-disable eqeqeq */
/* eslint-disable import/no-relative-packages */
import CallingExtensions from "../../src/CallingExtensions";
import { messageType, callEndStatus } from "../../src/Constants";
// import CallingExtensions, { Constants } from "@hubspot/calling-extensions-sdk";

export const state = {
  engagementId: 0,
  toNumber: "+1234",
  fromNumber: "+123456",
  userAvailable: false,
  incomingContactName: "",
};

const sizeInfo = {
  width: 400,
  height: 650,
};

function updateDomPhone(number) {
  document.getElementById("clickToDial").innerHTML = number;
}

function clickDialData(number) {
  document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
    type: "clickToDial",
    data: { number, autoPlace: true },
  }), "*");
}

function clickToDial(number) {
  console.log("CLICK TO DIAL FUNCTION");
  setTimeout(clickDialData(number), 600);
}

export function outgoingCall(number) {
  window.setTimeout(() => {
    // eslint-disable-next-line no-use-before-define
    cti.outgoingCall({
      createEngagement: true,
      phoneNumber: number,
    });
  }, 100);
}

export const cti = new CallingExtensions({
  debugMode: true,
  eventHandlers: {
    onReady: data => {
      cti.initialized({
        isLoggedIn: false,
        sizeInfo,
        engagementId: data.engagementId,
      });
      if (data.engagementId) {
        console.log("EngagemendId =", data.engagementId);
      }
    },
    onDialNumber: (data, rawEvent) => {
      const { phoneNumber } = data;
      state.toNumber = phoneNumber;
      updateDomPhone(phoneNumber);
      clickToDial(phoneNumber);
      // need to pass dialNumber to Genesys
    },
    onEngagementCreated: (data, rawEvent) => {
      const { engagementId } = data;
      state.engagementId = engagementId;
    },
    onEndCall: () => {
      window.setTimeout(() => {
        cti.callEnded();
      }, 500);

    },
    onVisibilityChanged: (data, rawEvent) => {
      if (!data.isHidden && !data.isMinimized) {
        console.log("VISIBILITY CHANGED! SHOWING");
        console.log(data);
        setTimeout(console.log("waited"), 400);
      }
      /** The cti's visibility has changed. */
    },
    onCreateEngagementSucceeded: (data, rawEvent) => {
      const { engagementId } = data;
      state.engagementId = engagementId;
    },
    onCreateEngagementFailed: (data, rawEvent) => {
      /** HubSpot was unable to create an engagement for this call. */
    },
    onUpdateEngagementSucceeded: (data, rawEvent) => {
      const { engagementId } = data;
      state.engagementId = engagementId;
    },
    onUpdateEngagementFailed: (data, rawEvent) => {
      /** HubSpot was unable to update the engagement for this call. */
    },
    onCallerIdMatchSucceeded: (data, rawEvent) => {
      const { callerIdMatches } = data;
      if (callerIdMatches.length) {
        const firstCallerIdMatch = callerIdMatches[0];
        if (firstCallerIdMatch.callerIdType === "CONTACT") {
          state.incomingContactName = `${firstCallerIdMatch.firstName} ${firstCallerIdMatch.lastName}`;
        } else if (firstCallerIdMatch.callerIdType === "COMPANY") {
          state.incomingContactName = firstCallerIdMatch.name;
        }
        cti.logDebugMessage({
          message: `Incoming call from ${state.incomingContactName} ${state.fromNumber}`,
          type: `${callerIdMatches.length} Caller ID Matches`,
        });
        cti.navigateToRecord({
          objectCoordinates: firstCallerIdMatch.objectCoordinates,
        });
        return;
      }
      cti.logDebugMessage({
        message: `Incoming call from ${state.fromNumber}`,
        type: "No Caller ID Matches",
      });
    },
    onCallerIdMatchFailed: (data, rawEvent) => {
      cti.logDebugMessage({
        message: `Incoming call from ${state.fromNumber}`,
        type: "Caller ID Match Failed",
      });
    },
    onNavigateToRecordFailed: (data, rawEvent) => {
      console.log(data);
      console.log(rawEvent);
      /** HubSpot was unable to navigate to the desired record page. */
    },
  },
});

export function initialize() {
  cti.initialized({
    isLoggedIn: false,
  });
}

export function logIn() {
  cti.userLoggedIn();
  if (state.userAvailable) {
    console.log("User is available");
  } else {
    // disableButtons([INCOMING_CALL, USER_UNAVAILABLE]);
    // enableButtons([USER_AVAILABLE]);
  }
}

export function logOut() {
  cti.userLoggedOut();
}

export function userAvailable() {
  cti.userAvailable();
  state.userAvailable = true;
}

export function userUnavailable() {
  cti.userUnavailable();
  state.userAvailable = false;
}

export function incomingCall() {
  window.setTimeout(() => {
    cti.incomingCall({
      createEngagement: true,
      fromNumber: state.fromNumber,
      toNumber: state.toNumber,
    });
  }, 500);
}

export function answerCall() {
  cti.callAnswered();
}

export function endCall() {
  cti.callEnded({
    callEndStatus: callEndStatus.INTERNAL_COMPLETED,
  });
}

export function completeCall(data) {
  if (!data || data == {}) {
    data = {
      hs_call_title: "Renewal call",
      hs_call_body: "No Call Data Found",
      hs_call_status: "COMPLETED",
      hs_call_disposition: "f240bbac-87c9-4f6e-bf70-924b57d47db7",
    };
  }
  console.log(this);
  console.log(data);
  cti.callCompleted({
    engagementId: state.engagementId,
    hideWidget: false,
    engagementProperties: data,
  });
  // disableButtons([COMPLETE_CALL]);
  // enableButtons([OUTGOING_CALL, INCOMING_CALL, USER_UNAVAILABLE]);
}

export function sendError(message) {
  cti.sendError({
    type: messageType.ERROR,
    message,
  });
}

export function resizeWidget() {
  sizeInfo.width += 20;
  sizeInfo.height += 20;
  cti.resizeWidget({
    width: sizeInfo.width,
    height: sizeInfo.height,
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // eslint-disable-next-line no-use-before-define
  document.getElementById("clickToDial").addEventListener("click", clickToDialDirect);

  function clickToDialDirect(number) {
    number = number.target.innerHTML;
    document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
      type: "clickToDial",
      data: { number, autoPlace: true },
    }), "*");
  }
});
