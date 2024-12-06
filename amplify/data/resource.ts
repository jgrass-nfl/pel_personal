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
  .authorization(allow => [allow.publicApiKey()])
}).authorization(allow => [allow.resource(clientAnswerFn)]);    // NOTE: This line allows env.AMPLIFY_DATA_GRAPHQL_ENDPOINT to be accessed by client-answer-fn\resource.ts

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
    //defaultAuthorizationMode: 'iam',
  },
});
