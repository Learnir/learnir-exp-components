import learnir from "learnir-javascript-sdk";

export let production = true;
export let learnirSDK = (key) => new learnir.LearnirApi(new learnir.Configuration({ baseOptions: { headers: { "key": key } } }));