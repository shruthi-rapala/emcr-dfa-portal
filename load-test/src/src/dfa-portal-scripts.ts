import { Rate, Trend } from 'k6/metrics';
import { fillInForm, getHTTPParams, getIterationName, logError, navigate } from './utilities';

// @ts-ignore
import { RegistrantTestParameters, MAX_VU, MAX_ITER } from '../load-test.parameters-APP_TARGET';
import { MyHttp } from './http';
import { fail } from 'k6';
import { generateNewApplication } from './generators/dfa/application';
import { DfaTestParameters } from '../load-test.parameters-dev';

const testParams = DfaTestParameters;
const baseUrl = testParams.baseUrl;
const http = new MyHttp();
const urls = {
  //Metadata
  config: `${baseUrl}/api/Configuration`,
  communities: `${baseUrl}/api/Configuration/codes/communities`,
  provinces: `${baseUrl}/api/Configuration/codes/stateprovinces`,
  countries: `${baseUrl}/api/Configuration/codes/countries`,
  security_questions: `${baseUrl}/api/Configuration/security-questions`,

  //DFA
  start_page: `${baseUrl}`,
  auth_token: testParams.authEndpoint,
  // current_user_exists: `${baseUrl}/api/profiles/current/exists`,
  // current_evacuations: `${baseUrl}/api/Evacuations/current`,
  // conflicts: `${baseUrl}/api/profiles/current/conflicts`,
  // current_profile: `${baseUrl}/api/profiles/current`,
  submitNewApplication: `${baseUrl}/api/applications/create`,
};

const loginFailRate = new Rate('reg_failed_to_login');
const formFailRate = new Rate('reg_failed_form_fetches');
const submitFailRate = new Rate('reg_failed_form_submits');
const submitFile = new Trend('reg_submit_file');
const submitAnonymous = new Trend('reg_submit_anonymous');
const submitProfile = new Trend('reg_submit_profile');
const loadHTMLTime = new Trend('res_load_html_time');
const loadAuthToken = new Trend('reg_load_auth_token');
const loadConfig = new Trend('reg_load_configuration');
const loadSecurityQuestions = new Trend('reg_load_security_questions');
const loadProvincesTime = new Trend('reg_load_provinces');
const loadCountriesTime = new Trend('reg_load_countries');
const loadCommunities = new Trend('reg_load_communities');
const loadProfile = new Trend('reg_load_profile');
const loadProfileExists = new Trend('reg_load_profile_exists');

const getAuthToken = () => {
  //let curr_vu = __VU - 1; //VU's begin at 1, not 0
  //curr_vu = (curr_vu % MAX_VU) + 1;
  //let curr_iter = __ITER % MAX_ITER;
  //let username = `${testParams.usernameBase}${curr_vu}-${curr_iter}`;
  //let password = `${testParams.passwordBase}${curr_vu}-${curr_iter}`
  let username = "DFA00001"
  let password = "98900001"
  const payload = `grant_type=${testParams.grantType}&username=${username}&password=${password}&scope=${testParams.scope}`;
  const params = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${testParams.basicAuth}`,
    },
    timeout: 180000
  };

  const response = http.post(urls.auth_token, payload, params);
  loginFailRate.add(response.status !== 200);
  loadAuthToken.add(response.timings.waiting);
  if (response.status !== 200) {
    console.error(`DFA - ${getIterationName()}: failed to get auth token`);
    logError(response);
    fail(`DFA - ${getIterationName()}: failed to get auth token`);
  }
  return response.json();
}

const getStartPage = () => {
  const params = getHTTPParams();
  const response = http.get(urls.start_page, params);
  formFailRate.add(response.status !== 200);
  loadHTMLTime.add(response.timings.waiting);
  if (response.status !== 200) {
    console.error(`DFA - ${getIterationName()}: failed to get start page`);
  }
}

// const getConfiguration = () => {
//   const params = getHTTPParams();
//   const response = http.get(urls.config, params);
//   formFailRate.add(response.status !== 200);
//   loadConfig.add(response.timings.waiting);
//   if (response.status !== 200) {
//     console.error(`Registrants - ${getIterationName()}: failed to get config`);
//   }
// }

// const getCurrentProfileExists = (token: any) => {
//   const params = getHTTPParams(token.access_token);

//   const response = http.get(urls.current_user_exists, params);
//   formFailRate.add(response.status !== 200);
//   loadProfileExists.add(response.timings.waiting);
//   if (response.status !== 200) {
//     console.error(`Registrants - ${getIterationName()}: failed to check if profile exists`);
//     logError(response);
//     fail(`Registrants - ${getIterationName()}: failed to check if profile exists`);
//   }
//   return response.json();
// }

// const getCurrentProfile = (token: any) => {
//   const params = getHTTPParams(token.access_token);

//   const response = http.get(urls.current_profile, params);
//   formFailRate.add(response.status !== 200);
//   loadProfile.add(response.timings.waiting);
//   if (response.status !== 200) {
//     console.error(`Registrants - ${getIterationName()}: failed to get current profile`);
//     logError(response);
//     fail(`Registrants - ${getIterationName()}: failed to get current profile`);
//   }
//   return response.json();
// }

// const createProfile = (token: any, communities: any, security_questions: any) => {
//   const profile = generateProfile(communities, security_questions);
//   const payload = JSON.stringify(profile);
//   const params = getHTTPParams(token.access_token);

//   const response = http.post(urls.current_profile, payload, params);
//   submitProfile.add(response.timings.waiting);
//   submitFailRate.add(response.status !== 200);
//   if (response.status !== 200) {
//     console.error(`Registrants - ${getIterationName()}: failed to create profile`);
//     logError(response, payload);
//     fail(`Registrants - ${getIterationName()}: failed to create profile`);
//   } else {
//     // console.log(`Registrants - ${getIterationName()}: created profile`);
//   }
// }

const submitNewApplication = (token: any): string | null => {
  const application = generateNewApplication();
  const payload = JSON.stringify(application);
  const params = getHTTPParams(token.access_token);

  const response = http.post(urls.submitNewApplication, payload, params);
  submitFile.add(response.timings.waiting);
  submitFailRate.add(response.status !== 200);
  if (response.status !== 200) {
    console.error(`DFA - ${getIterationName()}: failed submit new application`);
    logError(response, payload);
    fail(`DFA - ${getIterationName()}: failed submit new application`);
  } else {
    console.log(`DFA - ${getIterationName()}: successfully submitted new application`);
  }
  return response.body
}

export function SubmitNewApplication() {
  // navigate();
  getStartPage();
  // getConfiguration();
  // let communities = getCommunities();
  // getProvinces();
  // getCountries();
  navigate();
  let token = getAuthToken();
  //let profile_exists = getCurrentProfileExists(token);
  //navigate();

  //if (profile_exists == false) {
  //New Profile
  //let security_questions = getSecurityQuestions();
  //fillInForm();
  //createProfile(token, communities, security_questions);
  //}
  //else {
  // console.log(`Registrants - ${getIterationName()}: using existing profile`);
  //}

  //let profile = getCurrentProfile(token);
  fillInForm();
  let appId = submitNewApplication(token);
  console.log('created application', appId);
};