/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMatch = /* GraphQL */ `mutation CreateMatch(
  $condition: ModelMatchConditionInput
  $input: CreateMatchInput!
) {
  createMatch(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMatchMutationVariables,
  APITypes.CreateMatchMutation
>;
export const createMatchAnswer = /* GraphQL */ `mutation CreateMatchAnswer(
  $condition: ModelMatchAnswerConditionInput
  $input: CreateMatchAnswerInput!
) {
  createMatchAnswer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMatchAnswerMutationVariables,
  APITypes.CreateMatchAnswerMutation
>;
export const createMatchPlayInstance = /* GraphQL */ `mutation CreateMatchPlayInstance(
  $condition: ModelMatchPlayInstanceConditionInput
  $input: CreateMatchPlayInstanceInput!
) {
  createMatchPlayInstance(condition: $condition, input: $input) {
    createdAt
    id
    matchId
    playerId
    subId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMatchPlayInstanceMutationVariables,
  APITypes.CreateMatchPlayInstanceMutation
>;
export const createMatchPlayerResponse = /* GraphQL */ `mutation CreateMatchPlayerResponse(
  $condition: ModelMatchPlayerResponseConditionInput
  $input: CreateMatchPlayerResponseInput!
) {
  createMatchPlayerResponse(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMatchPlayerResponseMutationVariables,
  APITypes.CreateMatchPlayerResponseMutation
>;
export const createMatchQuestion = /* GraphQL */ `mutation CreateMatchQuestion(
  $condition: ModelMatchQuestionConditionInput
  $input: CreateMatchQuestionInput!
) {
  createMatchQuestion(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMatchQuestionMutationVariables,
  APITypes.CreateMatchQuestionMutation
>;
export const createMatchVideoStream = /* GraphQL */ `mutation CreateMatchVideoStream(
  $condition: ModelMatchVideoStreamConditionInput
  $input: CreateMatchVideoStreamInput!
) {
  createMatchVideoStream(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMatchVideoStreamMutationVariables,
  APITypes.CreateMatchVideoStreamMutation
>;
export const createQuestion = /* GraphQL */ `mutation CreateQuestion(
  $condition: ModelQuestionConditionInput
  $input: CreateQuestionInput!
) {
  createQuestion(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateQuestionMutationVariables,
  APITypes.CreateQuestionMutation
>;
export const createQuiz = /* GraphQL */ `mutation CreateQuiz(
  $condition: ModelQuizConditionInput
  $input: CreateQuizInput!
) {
  createQuiz(condition: $condition, input: $input) {
    createdAt
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateQuizMutationVariables,
  APITypes.CreateQuizMutation
>;
export const deleteMatch = /* GraphQL */ `mutation DeleteMatch(
  $condition: ModelMatchConditionInput
  $input: DeleteMatchInput!
) {
  deleteMatch(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchMutationVariables,
  APITypes.DeleteMatchMutation
>;
export const deleteMatchAnswer = /* GraphQL */ `mutation DeleteMatchAnswer(
  $condition: ModelMatchAnswerConditionInput
  $input: DeleteMatchAnswerInput!
) {
  deleteMatchAnswer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchAnswerMutationVariables,
  APITypes.DeleteMatchAnswerMutation
>;
export const deleteMatchPlayInstance = /* GraphQL */ `mutation DeleteMatchPlayInstance(
  $condition: ModelMatchPlayInstanceConditionInput
  $input: DeleteMatchPlayInstanceInput!
) {
  deleteMatchPlayInstance(condition: $condition, input: $input) {
    createdAt
    id
    matchId
    playerId
    subId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMatchPlayInstanceMutationVariables,
  APITypes.DeleteMatchPlayInstanceMutation
>;
export const deleteMatchPlayerResponse = /* GraphQL */ `mutation DeleteMatchPlayerResponse(
  $condition: ModelMatchPlayerResponseConditionInput
  $input: DeleteMatchPlayerResponseInput!
) {
  deleteMatchPlayerResponse(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchPlayerResponseMutationVariables,
  APITypes.DeleteMatchPlayerResponseMutation
>;
export const deleteMatchQuestion = /* GraphQL */ `mutation DeleteMatchQuestion(
  $condition: ModelMatchQuestionConditionInput
  $input: DeleteMatchQuestionInput!
) {
  deleteMatchQuestion(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchQuestionMutationVariables,
  APITypes.DeleteMatchQuestionMutation
>;
export const deleteMatchVideoStream = /* GraphQL */ `mutation DeleteMatchVideoStream(
  $condition: ModelMatchVideoStreamConditionInput
  $input: DeleteMatchVideoStreamInput!
) {
  deleteMatchVideoStream(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchVideoStreamMutationVariables,
  APITypes.DeleteMatchVideoStreamMutation
>;
export const deleteQuestion = /* GraphQL */ `mutation DeleteQuestion(
  $condition: ModelQuestionConditionInput
  $input: DeleteQuestionInput!
) {
  deleteQuestion(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteQuestionMutationVariables,
  APITypes.DeleteQuestionMutation
>;
export const deleteQuiz = /* GraphQL */ `mutation DeleteQuiz(
  $condition: ModelQuizConditionInput
  $input: DeleteQuizInput!
) {
  deleteQuiz(condition: $condition, input: $input) {
    createdAt
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteQuizMutationVariables,
  APITypes.DeleteQuizMutation
>;
export const updateMatch = /* GraphQL */ `mutation UpdateMatch(
  $condition: ModelMatchConditionInput
  $input: UpdateMatchInput!
) {
  updateMatch(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchMutationVariables,
  APITypes.UpdateMatchMutation
>;
export const updateMatchAnswer = /* GraphQL */ `mutation UpdateMatchAnswer(
  $condition: ModelMatchAnswerConditionInput
  $input: UpdateMatchAnswerInput!
) {
  updateMatchAnswer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchAnswerMutationVariables,
  APITypes.UpdateMatchAnswerMutation
>;
export const updateMatchPlayInstance = /* GraphQL */ `mutation UpdateMatchPlayInstance(
  $condition: ModelMatchPlayInstanceConditionInput
  $input: UpdateMatchPlayInstanceInput!
) {
  updateMatchPlayInstance(condition: $condition, input: $input) {
    createdAt
    id
    matchId
    playerId
    subId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMatchPlayInstanceMutationVariables,
  APITypes.UpdateMatchPlayInstanceMutation
>;
export const updateMatchPlayerResponse = /* GraphQL */ `mutation UpdateMatchPlayerResponse(
  $condition: ModelMatchPlayerResponseConditionInput
  $input: UpdateMatchPlayerResponseInput!
) {
  updateMatchPlayerResponse(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchPlayerResponseMutationVariables,
  APITypes.UpdateMatchPlayerResponseMutation
>;
export const updateMatchQuestion = /* GraphQL */ `mutation UpdateMatchQuestion(
  $condition: ModelMatchQuestionConditionInput
  $input: UpdateMatchQuestionInput!
) {
  updateMatchQuestion(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchQuestionMutationVariables,
  APITypes.UpdateMatchQuestionMutation
>;
export const updateMatchVideoStream = /* GraphQL */ `mutation UpdateMatchVideoStream(
  $condition: ModelMatchVideoStreamConditionInput
  $input: UpdateMatchVideoStreamInput!
) {
  updateMatchVideoStream(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchVideoStreamMutationVariables,
  APITypes.UpdateMatchVideoStreamMutation
>;
export const updateQuestion = /* GraphQL */ `mutation UpdateQuestion(
  $condition: ModelQuestionConditionInput
  $input: UpdateQuestionInput!
) {
  updateQuestion(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateQuestionMutationVariables,
  APITypes.UpdateQuestionMutation
>;
export const updateQuiz = /* GraphQL */ `mutation UpdateQuiz(
  $condition: ModelQuizConditionInput
  $input: UpdateQuizInput!
) {
  updateQuiz(condition: $condition, input: $input) {
    createdAt
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateQuizMutationVariables,
  APITypes.UpdateQuizMutation
>;
