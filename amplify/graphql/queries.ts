/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const clientAnswerFn = /* GraphQL */ `query ClientAnswerFn(
  $answer: Int
  $matchId: ID
  $matchPlayInstanceId: ID
  $questionIndex: Int
) {
  clientAnswerFn(
    answer: $answer
    matchId: $matchId
    matchPlayInstanceId: $matchPlayInstanceId
    questionIndex: $questionIndex
  )
}
` as GeneratedQuery<
  APITypes.ClientAnswerFnQueryVariables,
  APITypes.ClientAnswerFnQuery
>;
export const getMatch = /* GraphQL */ `query GetMatch($id: ID!) {
  getMatch(id: $id) {
    answerTime
    createdAt
    id
    matchState
    name
    quizId
    start
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetMatchQueryVariables, APITypes.GetMatchQuery>;
export const getMatchAnswer = /* GraphQL */ `query GetMatchAnswer($id: ID!) {
  getMatchAnswer(id: $id) {
    correct
    createdAt
    id
    matchId
    questionIndex
    timeStamp
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchAnswerQueryVariables,
  APITypes.GetMatchAnswerQuery
>;
export const getMatchPlayInstance = /* GraphQL */ `query GetMatchPlayInstance($id: ID!) {
  getMatchPlayInstance(id: $id) {
    createdAt
    id
    matchId
    playerId
    subId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchPlayInstanceQueryVariables,
  APITypes.GetMatchPlayInstanceQuery
>;
export const getMatchPlayerResponse = /* GraphQL */ `query GetMatchPlayerResponse($id: ID!) {
  getMatchPlayerResponse(id: $id) {
    answer
    createdAt
    id
    matchId
    matchPlayInstanceId
    questionIndex
    responseTime
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchPlayerResponseQueryVariables,
  APITypes.GetMatchPlayerResponseQuery
>;
export const getMatchQuestion = /* GraphQL */ `query GetMatchQuestion($id: ID!) {
  getMatchQuestion(id: $id) {
    ans1
    ans2
    ans3
    ans4
    createdAt
    id
    matchId
    prompt
    questionIndex
    timeStamp
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchQuestionQueryVariables,
  APITypes.GetMatchQuestionQuery
>;
export const getMatchVideoStream = /* GraphQL */ `query GetMatchVideoStream($id: ID!) {
  getMatchVideoStream(id: $id) {
    createdAt
    id
    matchId
    start
    streamDelay
    streamState
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchVideoStreamQueryVariables,
  APITypes.GetMatchVideoStreamQuery
>;
export const getQuestion = /* GraphQL */ `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
    ans1
    ans2
    ans3
    ans4
    correct
    createdAt
    id
    orderInd
    prompt
    quizId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetQuestionQueryVariables,
  APITypes.GetQuestionQuery
>;
export const getQuiz = /* GraphQL */ `query GetQuiz($id: ID!) {
  getQuiz(id: $id) {
    createdAt
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetQuizQueryVariables, APITypes.GetQuizQuery>;
export const listByStart = /* GraphQL */ `query ListByStart(
  $filter: ModelMatchFilterInput
  $limit: Int
  $matchState: String!
  $nextToken: String
  $sortDirection: ModelSortDirection
  $start: ModelStringKeyConditionInput
) {
  listByStart(
    filter: $filter
    limit: $limit
    matchState: $matchState
    nextToken: $nextToken
    sortDirection: $sortDirection
    start: $start
  ) {
    items {
      answerTime
      createdAt
      id
      matchState
      name
      quizId
      start
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListByStartQueryVariables,
  APITypes.ListByStartQuery
>;
export const listByStreamStart = /* GraphQL */ `query ListByStreamStart(
  $filter: ModelMatchVideoStreamFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $start: ModelStringKeyConditionInput
  $streamState: String!
) {
  listByStreamStart(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    start: $start
    streamState: $streamState
  ) {
    items {
      createdAt
      id
      matchId
      start
      streamDelay
      streamState
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListByStreamStartQueryVariables,
  APITypes.ListByStreamStartQuery
>;
export const listMatchAnswers = /* GraphQL */ `query ListMatchAnswers(
  $filter: ModelMatchAnswerFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatchAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      correct
      createdAt
      id
      matchId
      questionIndex
      timeStamp
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchAnswersQueryVariables,
  APITypes.ListMatchAnswersQuery
>;
export const listMatchPlayInstances = /* GraphQL */ `query ListMatchPlayInstances(
  $filter: ModelMatchPlayInstanceFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatchPlayInstances(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      createdAt
      id
      matchId
      playerId
      subId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchPlayInstancesQueryVariables,
  APITypes.ListMatchPlayInstancesQuery
>;
export const listMatchPlayerResponses = /* GraphQL */ `query ListMatchPlayerResponses(
  $filter: ModelMatchPlayerResponseFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatchPlayerResponses(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      answer
      createdAt
      id
      matchId
      matchPlayInstanceId
      questionIndex
      responseTime
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchPlayerResponsesQueryVariables,
  APITypes.ListMatchPlayerResponsesQuery
>;
export const listMatchQuestions = /* GraphQL */ `query ListMatchQuestions(
  $filter: ModelMatchQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatchQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      ans1
      ans2
      ans3
      ans4
      createdAt
      id
      matchId
      prompt
      questionIndex
      timeStamp
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchQuestionsQueryVariables,
  APITypes.ListMatchQuestionsQuery
>;
export const listMatchVideoStreams = /* GraphQL */ `query ListMatchVideoStreams(
  $filter: ModelMatchVideoStreamFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatchVideoStreams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      matchId
      start
      streamDelay
      streamState
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchVideoStreamsQueryVariables,
  APITypes.ListMatchVideoStreamsQuery
>;
export const listMatches = /* GraphQL */ `query ListMatches(
  $filter: ModelMatchFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      answerTime
      createdAt
      id
      matchState
      name
      quizId
      start
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchesQueryVariables,
  APITypes.ListMatchesQuery
>;
export const listQuestions = /* GraphQL */ `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      ans1
      ans2
      ans3
      ans4
      correct
      createdAt
      id
      orderInd
      prompt
      quizId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuestionsQueryVariables,
  APITypes.ListQuestionsQuery
>;
export const listQuizzes = /* GraphQL */ `query ListQuizzes(
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizzes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      title
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuizzesQueryVariables,
  APITypes.ListQuizzesQuery
>;
