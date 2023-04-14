import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appID = "f362df6db382434b86c118d8d4f826d5"
const Token = "007eJxTYMj0uSqhInvA5ZulstzpU99S7/JpmdfqaWce/Ba04pHCrAgFhjRjM6OUNLOUJGMLIxNjkyQLs2RDQ4sUixSTNAsjsxTT+iDzlIZARoai6zIsjAwQCOJzM/imppaUFug6J+bkMDAAAKk0H/g="

export const config = {mode: "rtc", codec: "vp8", appId: appID, token: Token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "Meetup-Call";