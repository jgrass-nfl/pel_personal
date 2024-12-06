/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMatch = /* GraphQL */ `subscription OnCreateMatch($filter: ModelSubscriptionMatchFilterInput) {
  onCreateMatch(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMatchSubscriptionVariables,
  APITypes.OnCreateMatchSubscription
>;
export const onCreateMatchAnswer = /* GraphQL */ `subscription OnCreateMatchAnswer(
  $filter: ModelSubscriptionMatchAnswerFilterInput
) {
  onCreateMatchAnswer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMatchAnswerSubscriptionVariables,
  APITypes.OnCreateMatchAnswerSubscription
>;
export const onCreateMatchPlayInstance = /* GraphQL */ `subscription OnCreateMatchPlayInstance(
  $filter: ModelSubscriptionMatchPlayInstanceFilterInput
) {
  onCreateMatchPlayInstance(filter: $filter) {
    createdAt
    id
    matchId
    playerId
    subId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMatchPlayInstanceSubscriptionVariables,
  APITypes.OnCreateMatchPlayInstanceSubscription
>;
export const onCreateMatchPlayerResponse = /* GraphQL */ `subscription OnCreateMatchPlayerResponse(
  $filter: ModelSubscriptionMatchPlayerResponseFilterInput
) {
  onCreateMatchPlayerResponse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMatchPlayerResponseSubscriptionVariables,
  APITypes.OnCreateMatchPlayerResponseSubscription
>;
export const onCreateMatchQuestion = /* GraphQL */ `subscription OnCreateMatchQuestion(
  $filter: ModelSubscriptionMatchQuestionFilterInput
) {
  onCreateMatchQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMatchQuestionSubscriptionVariables,
  APITypes.OnCreateMatchQuestionSubscription
>;
export const onCreateMatchVideoStream = /* GraphQL */ `subscription OnCreateMatchVideoStream(
  $filter: ModelSubscriptionMatchVideoStreamFilterInput
) {
  onCreateMatchVideoStream(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMatchVideoStreamSubscriptionVariables,
  APITypes.OnCreateMatchVideoStreamSubscription
>;
export const onCreateQuestion = /* GraphQL */ `subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onCreateQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateQuestionSubscriptionVariables,
  APITypes.OnCreateQuestionSubscription
>;
export const onCreateQuiz = /* GraphQL */ `subscription OnCreateQuiz($filter: ModelSubscriptionQuizFilterInput) {
  onCreateQuiz(filter: $filter) {
    createdAt
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateQuizSubscriptionVariables,
  APITypes.OnCreateQuizSubscription
>;
export const onDeleteMatch = /* GraphQL */ `subscription OnDeleteMatch($filter: ModelSubscriptionMatchFilterInput) {
  onDeleteMatch(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMatchSubscriptionVariables,
  APITypes.OnDeleteMatchSubscription
>;
export const onDeleteMatchAnswer = /* GraphQL */ `subscription OnDeleteMatchAnswer(
  $filter: ModelSubscriptionMatchAnswerFilterInput
) {
  onDeleteMatchAnswer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMatchAnswerSubscriptionVariables,
  APITypes.OnDeleteMatchAnswerSubscription
>;
export const onDeleteMatchPlayInstance = /* GraphQL */ `subscription OnDeleteMatchPlayInstance(
  $filter: ModelSubscriptionMatchPlayInstanceFilterInput
) {
  onDeleteMatchPlayInstance(filter: $filter) {
    createdAt
    id
    matchId
    playerId
    subId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMatchPlayInstanceSubscriptionVariables,
  APITypes.OnDeleteMatchPlayInstanceSubscription
>;
export const onDeleteMatchPlayerResponse = /* GraphQL */ `subscription OnDeleteMatchPlayerResponse(
  $filter: ModelSubscriptionMatchPlayerResponseFilterInput
) {
  onDeleteMatchPlayerResponse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMatchPlayerResponseSubscriptionVariables,
  APITypes.OnDeleteMatchPlayerResponseSubscription
>;
export const onDeleteMatchQuestion = /* GraphQL */ `subscription OnDeleteMatchQuestion(
  $filter: ModelSubscriptionMatchQuestionFilterInput
) {
  onDeleteMatchQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMatchQuestionSubscriptionVariables,
  APITypes.OnDeleteMatchQuestionSubscription
>;
export const onDeleteMatchVideoStream = /* GraphQL */ `subscription OnDeleteMatchVideoStream(
  $filter: ModelSubscriptionMatchVideoStreamFilterInput
) {
  onDeleteMatchVideoStream(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMatchVideoStreamSubscriptionVariables,
  APITypes.OnDeleteMatchVideoStreamSubscription
>;
export const onDeleteQuestion = /* GraphQL */ `subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onDeleteQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionSubscriptionVariables,
  APITypes.OnDeleteQuestionSubscription
>;
export const onDeleteQuiz = /* GraphQL */ `subscription OnDeleteQuiz($filter: ModelSubscriptionQuizFilterInput) {
  onDeleteQuiz(filter: $filter) {
    createdAt
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteQuizSubscriptionVariables,
  APITypes.OnDeleteQuizSubscription
>;
export const onUpdateMatch = /* GraphQL */ `subscription OnUpdateMatch($filter: ModelSubscriptionMatchFilterInput) {
  onUpdateMatch(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMatchSubscriptionVariables,
  APITypes.OnUpdateMatchSubscription
>;
export const onUpdateMatchAnswer = /* GraphQL */ `subscription OnUpdateMatchAnswer(
  $filter: ModelSubscriptionMatchAnswerFilterInput
) {
  onUpdateMatchAnswer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMatchAnswerSubscriptionVariables,
  APITypes.OnUpdateMatchAnswerSubscription
>;
export const onUpdateMatchPlayInstance = /* GraphQL */ `subscription OnUpdateMatchPlayInstance(
  $filter: ModelSubscriptionMatchPlayInstanceFilterInput
) {
  onUpdateMatchPlayInstance(filter: $filter) {
    createdAt
    id
    matchId
    playerId
    subId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMatchPlayInstanceSubscriptionVariables,
  APITypes.OnUpdateMatchPlayInstanceSubscription
>;
export const onUpdateMatchPlayerResponse = /* GraphQL */ `subscription OnUpdateMatchPlayerResponse(
  $filter: ModelSubscriptionMatchPlayerResponseFilterInput
) {
  onUpdateMatchPlayerResponse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMatchPlayerResponseSubscriptionVariables,
  APITypes.OnUpdateMatchPlayerResponseSubscription
>;
export const onUpdateMatchQuestion = /* GraphQL */ `subscription OnUpdateMatchQuestion(
  $filter: ModelSubscriptionMatchQuestionFilterInput
) {
  onUpdateMatchQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMatchQuestionSubscriptionVariables,
  APITypes.OnUpdateMatchQuestionSubscription
>;
export const onUpdateMatchVideoStream = /* GraphQL */ `subscription OnUpdateMatchVideoStream(
  $filter: ModelSubscriptionMatchVideoStreamFilterInput
) {
  onUpdateMatchVideoStream(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMatchVideoStreamSubscriptionVariables,
  APITypes.OnUpdateMatchVideoStreamSubscription
>;
export const onUpdateQuestion = /* GraphQL */ `subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onUpdateQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateQuestionSubscriptionVariables,
  APITypes.OnUpdateQuestionSubscription
>;
export const onUpdateQuiz = /* GraphQL */ `subscription OnUpdateQuiz($filter: ModelSubscriptionQuizFilterInput) {
  onUpdateQuiz(filter: $filter) {
    createdAt
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateQuizSubscriptionVariables,
  APITypes.OnUpdateQuizSubscription
>;
