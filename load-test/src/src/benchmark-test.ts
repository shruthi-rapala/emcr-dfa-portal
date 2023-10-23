import { Options } from 'k6/options';
export { SubmitNewApplication } from './dfa-portal-scripts';
import { getExecutionType, getSummaryRes, dfa_thresholds, setUseRandomWaitTime } from './utilities';

//benchmark default to 5m duration
if (!__ENV.ITERS) {
    __ENV.DUR = '10m';
}
let execution_type = getExecutionType();

if (__ENV.RND) {
    setUseRandomWaitTime(true);
}

export const options: Options = {
    scenarios: {
        /*---DFA---*/
        submitNewApplication: {
            exec: 'SubmitNewApplication',
            ...execution_type
        },
    },

    thresholds: {
        ...dfa_thresholds
    }
};

const TEST_TYPE = "benchmark";

export function handleSummary(data: any) {
    return getSummaryRes(TEST_TYPE, data);
}