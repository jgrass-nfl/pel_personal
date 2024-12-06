import type { Schema } from "../../data/resource"
import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import { env } from "$amplify/env/client-answer-fn";
import { createMatchPlayerResponse } from "../../graphql/mutations";

// Generating the graphql utility code for the lambda functions
// NOTE: You must be in a sandbox to generte these files
// so first run:
//    npx ampx sandbox
// then you can run the generation:
//    npx ampx generate graphql-client-code --out amplify/graphql

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
}
