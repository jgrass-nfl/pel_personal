import type { Schema } from "../../data/resource"
import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import { env } from "$amplify/env/client-answer-fn";
import { createMatchPlayerResponse } from "../../graphql/mutations";

//import outputs from '../../../amplify_outputs.json';

//Amplify.configure(outputs);   // Comment to get running

//const client = generateClient<Schema>();       // Comment to get running

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: "iam",
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
);

const client = generateClient<Schema>({
  authMode: "iam",
});


export const handler: Schema["clientAnswerFn"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { matchId, matchPlayInstanceId, questionIndex, answer } = event.arguments

  // This needs to use an amplify function so the timestamp can't be spoofed.  ALTHOUGH, there was a hint that a
  // required datetime that wasn't passed in would be filled in with the current time.  Which would do what we need.
  let curTime = new Date();
  let curTimeString = curTime.toISOString();

  const { data: matchPlayerResponse, errors: matchPlayerResponseErrors } =
  await client.graphql({
    query: createMatchPlayerResponse,
    variables: {
      input: {
        matchId: matchId,
        matchPlayInstanceId: matchPlayInstanceId,
        questionIndex: questionIndex,
        answer: answer,
        responseTime: curTimeString,
      },
    },
  });

  if (matchPlayerResponseErrors != null) {
    return "Error " + matchPlayerResponseErrors[0].message;
  }
  if (matchPlayerResponse == null) {
    return "No matchPlayerResponse";
  }

  return "matchPlayerResponse (" + matchPlayerResponse.createMatchPlayerResponse.answer + ") " + curTimeString;

/*       // Comment to get running

  const { data: matchPlayerResponse, errors: matchPlayerResponseErrors } =
      await client.models.MatchPlayerResponse.create({
          matchId: matchId,
          matchPlayInstanceId: matchPlayInstanceId,
          questionIndex: questionIndex,
          answer: answer,
          responseTime: curTimeString,
  });

  if (matchPlayerResponseErrors != null) {
    return "Error " + matchPlayerResponseErrors[0].message;
  }
  if (matchPlayerResponse == null) {
    return "No matchPlayerResponse";
  }

  return "matchPlayerResponse (" + matchPlayerResponse.answer + ") " + curTimeString;
  
  */
  
  // return "fail for now";
}

/* working 
export const handler: Schema["clientAnswerFn"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments

  let curTime = new Date();
  let curTimeString = curTime.toISOString();

  //const { data: quizList, errors } = await client.models.Quiz.list();

  const { errors, data: newQuiz } = await client.models.Quiz.create({
    title: "Test quiz " + curTime,
  });

  if (errors != null) {
    return "Error " + errors[0].message;
  }
  if (newQuiz == null) {
    return "No quiz items";
  }
  // return typed from `.returns()`
  return `Hello, ${name}!` + " " + curTimeString + " " + newQuiz.title;
}
*/
