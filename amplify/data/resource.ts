import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { clientAnswerFn } from "../functions/client-answer-fn/resource";

const schema = a.schema({
  clientAnswerFn: a
  .query()
  .arguments({
    matchId: a.id(),
    matchPlayInstanceId: a.id(),
    questionIndex: a.integer(),
    answer: a.integer(),
  })
  .returns(a.string())
  .handler(a.handler.function(clientAnswerFn))
  .authorization(allow => [allow.publicApiKey()]),
  Question: a
  .model({
    quizId: a.id(),
    orderInd: a.integer(),
    prompt: a.string(),
    ans1: a.string(),
    ans2: a.string(),
    ans3: a.string(),
    ans4: a.string(),
    correct: a.integer(),
  })
  .authorization(allow => [allow.publicApiKey()]),
  Quiz: a
  .model({
    title: a.string(),
  })
  .authorization(allow => [allow.publicApiKey()]),
  Match: a
  .model({
    matchState: a.string().required(),
    name: a.string(),
    start: a.datetime().required(),
    quizId: a.id(),
    answerTime: a.integer(),
  })
  .authorization(allow => [allow.publicApiKey()])
  .secondaryIndexes(index => [index('matchState').sortKeys(['start']).queryField('listByStart')]),
  MatchVideoStream: a
  .model({
    matchId: a.id(),
    streamState: a.string().required(),
    start: a.datetime().required(),
    streamDelay: a.integer(),
  })
  .authorization(allow => [allow.publicApiKey()])
  .secondaryIndexes(index => [index('streamState').sortKeys(['start']).queryField('listByStreamStart')]),
  MatchQuestion: a
  .model({
    matchId: a.id(),
    timeStamp: a.integer(),
    questionIndex: a.integer(),
    prompt: a.string(),
    ans1: a.string(),
    ans2: a.string(),
    ans3: a.string(),
    ans4: a.string(),
  })
  .authorization(allow => [allow.publicApiKey()]),
  MatchAnswer: a
  .model({
    matchId: a.id(),
    timeStamp: a.integer(),
    questionIndex: a.integer(),
    correct: a.integer(),
  })
  .authorization(allow => [allow.publicApiKey()]),
  MatchPlayInstance: a
  .model({
    matchId: a.id(),
    playerId: a.id(),
    subId: a.string()
  })
  .authorization(allow => [allow.publicApiKey()]),
  MatchPlayerResponse: a
  .model({
    matchId: a.id(),
    matchPlayInstanceId: a.id(),
    questionIndex: a.integer(),
    answer: a.integer(),
    responseTime: a.datetime(),
  })
  .authorization(allow => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
    //defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
