import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appID = "f362df6db382434b86c118d8d4f826d5"
const Token = "007eJxTYIjNeLzw3fTSq/ueJm95mrnjk2+aT1mdYto63dxubs5l5csUGNKMzYxS0sxSkowtjEyMTZIszJINDS1SLFJM0iyMzFJM1183SWkIZGT4bneGmZEBAkF8bgbf1NSS0gJd58ScHAYGANvDI7w="

export const config = {mode: "rtc", codec: "vp8", appId: appID, token: Token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "Meetup-Call";