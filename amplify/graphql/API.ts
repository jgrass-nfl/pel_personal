/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Match = {
  __typename: "Match",
  answerTime?: number | null,
  createdAt: string,
  id: string,
  matchState: string,
  name?: string | null,
  quizId?: string | null,
  start: string,
  updatedAt: string,
};

export type MatchAnswer = {
  __typename: "MatchAnswer",
  correct?: number | null,
  createdAt: string,
  id: string,
  matchId?: string | null,
  questionIndex?: number | null,
  timeStamp?: number | null,
  updatedAt: string,
};

export type MatchPlayInstance = {
  __typename: "MatchPlayInstance",
  createdAt: string,
  id: string,
  matchId?: string | null,
  playerId?: string | null,
  subId?: string | null,
  updatedAt: string,
};

export type MatchPlayerResponse = {
  __typename: "MatchPlayerResponse",
  answer?: number | null,
  createdAt: string,
  id: string,
  matchId?: string | null,
  matchPlayInstanceId?: string | null,
  questionIndex?: number | null,
  responseTime?: string | null,
  updatedAt: string,
};

export type MatchQuestion = {
  __typename: "MatchQuestion",
  ans1?: string | null,
  ans2?: string | null,
  ans3?: string | null,
  ans4?: string | null,
  createdAt: string,
  id: string,
  matchId?: string | null,
  prompt?: string | null,
  questionIndex?: number | null,
  timeStamp?: number | null,
  updatedAt: string,
};

export type MatchVideoStream = {
  __typename: "MatchVideoStream",
  createdAt: string,
  id: string,
  matchId?: string | null,
  start: string,
  streamDelay?: number | null,
  streamState: string,
  updatedAt: string,
};

export type Question = {
  __typename: "Question",
  ans1?: string | null,
  ans2?: string | null,
  ans3?: string | null,
  ans4?: string | null,
  correct?: number | null,
  createdAt: string,
  id: string,
  orderInd?: number | null,
  prompt?: string | null,
  quizId?: string | null,
  updatedAt: string,
};

export type Quiz = {
  __typename: "Quiz",
  createdAt: string,
  id: string,
  title?: string | null,
  updatedAt: string,
};

export type ModelMatchFilterInput = {
  and?: Array< ModelMatchFilterInput | null > | null,
  answerTime?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  matchState?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelMatchFilterInput | null,
  or?: Array< ModelMatchFilterInput | null > | null,
  quizId?: ModelIDInput | null,
  start?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelMatchConnection = {
  __typename: "ModelMatchConnection",
  items:  Array<Match | null >,
  nextToken?: string | null,
};

export type ModelMatchVideoStreamFilterInput = {
  and?: Array< ModelMatchVideoStreamFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  matchId?: ModelIDInput | null,
  not?: ModelMatchVideoStreamFilterInput | null,
  or?: Array< ModelMatchVideoStreamFilterInput | null > | null,
  start?: ModelStringInput | null,
  streamDelay?: ModelIntInput | null,
  streamState?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelMatchVideoStreamConnection = {
  __typename: "ModelMatchVideoStreamConnection",
  items:  Array<MatchVideoStream | null >,
  nextToken?: string | null,
};

export type ModelMatchAnswerFilterInput = {
  and?: Array< ModelMatchAnswerFilterInput | null > | null,
  correct?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  matchId?: ModelIDInput | null,
  not?: ModelMatchAnswerFilterInput | null,
  or?: Array< ModelMatchAnswerFilterInput | null > | null,
  questionIndex?: ModelIntInput | null,
  timeStamp?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelMatchAnswerConnection = {
  __typename: "ModelMatchAnswerConnection",
  items:  Array<MatchAnswer | null >,
  nextToken?: string | null,
};

export type ModelMatchPlayInstanceFilterInput = {
  and?: Array< ModelMatchPlayInstanceFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  matchId?: ModelIDInput | null,
  not?: ModelMatchPlayInstanceFilterInput | null,
  or?: Array< ModelMatchPlayInstanceFilterInput | null > | null,
  playerId?: ModelIDInput | null,
  subId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelMatchPlayInstanceConnection = {
  __typename: "ModelMatchPlayInstanceConnection",
  items:  Array<MatchPlayInstance | null >,
  nextToken?: string | null,
};

export type ModelMatchPlayerResponseFilterInput = {
  and?: Array< ModelMatchPlayerResponseFilterInput | null > | null,
  answer?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  matchId?: ModelIDInput | null,
  matchPlayInstanceId?: ModelIDInput | null,
  not?: ModelMatchPlayerResponseFilterInput | null,
  or?: Array< ModelMatchPlayerResponseFilterInput | null > | null,
  questionIndex?: ModelIntInput | null,
  responseTime?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelMatchPlayerResponseConnection = {
  __typename: "ModelMatchPlayerResponseConnection",
  items:  Array<MatchPlayerResponse | null >,
  nextToken?: string | null,
};

export type ModelMatchQuestionFilterInput = {
  and?: Array< ModelMatchQuestionFilterInput | null > | null,
  ans1?: ModelStringInput | null,
  ans2?: ModelStringInput | null,
  ans3?: ModelStringInput | null,
  ans4?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  matchId?: ModelIDInput | null,
  not?: ModelMatchQuestionFilterInput | null,
  or?: Array< ModelMatchQuestionFilterInput | null > | null,
  prompt?: ModelStringInput | null,
  questionIndex?: ModelIntInput | null,
  timeStamp?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelMatchQuestionConnection = {
  __typename: "ModelMatchQuestionConnection",
  items:  Array<MatchQuestion | null >,
  nextToken?: string | null,
};

export type ModelQuestionFilterInput = {
  and?: Array< ModelQuestionFilterInput | null > | null,
  ans1?: ModelStringInput | null,
  ans2?: ModelStringInput | null,
  ans3?: ModelStringInput | null,
  ans4?: ModelStringInput | null,
  correct?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelQuestionFilterInput | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  orderInd?: ModelIntInput | null,
  prompt?: ModelStringInput | null,
  quizId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelQuestionConnection = {
  __typename: "ModelQuestionConnection",
  items:  Array<Question | null >,
  nextToken?: string | null,
};

export type ModelQuizFilterInput = {
  and?: Array< ModelQuizFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelQuizFilterInput | null,
  or?: Array< ModelQuizFilterInput | null > | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelQuizConnection = {
  __typename: "ModelQuizConnection",
  items:  Array<Quiz | null >,
  nextToken?: string | null,
};

export type ModelMatchConditionInput = {
  and?: Array< ModelMatchConditionInput | null > | null,
  answerTime?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  matchState?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelMatchConditionInput | null,
  or?: Array< ModelMatchConditionInput | null > | null,
  quizId?: ModelIDInput | null,
  start?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMatchInput = {
  answerTime?: number | null,
  id?: string | null,
  matchState: string,
  name?: string | null,
  quizId?: string | null,
  start: string,
};

export type ModelMatchAnswerConditionInput = {
  and?: Array< ModelMatchAnswerConditionInput | null > | null,
  correct?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  matchId?: ModelIDInput | null,
  not?: ModelMatchAnswerConditionInput | null,
  or?: Array< ModelMatchAnswerConditionInput | null > | null,
  questionIndex?: ModelIntInput | null,
  timeStamp?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMatchAnswerInput = {
  correct?: number | null,
  id?: string | null,
  matchId?: string | null,
  questionIndex?: number | null,
  timeStamp?: number | null,
};

export type ModelMatchPlayInstanceConditionInput = {
  and?: Array< ModelMatchPlayInstanceConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  matchId?: ModelIDInput | null,
  not?: ModelMatchPlayInstanceConditionInput | null,
  or?: Array< ModelMatchPlayInstanceConditionInput | null > | null,
  playerId?: ModelIDInput | null,
  subId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMatchPlayInstanceInput = {
  id?: string | null,
  matchId?: string | null,
  playerId?: string | null,
  subId?: string | null,
};

export type ModelMatchPlayerResponseConditionInput = {
  and?: Array< ModelMatchPlayerResponseConditionInput | null > | null,
  answer?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  matchId?: ModelIDInput | null,
  matchPlayInstanceId?: ModelIDInput | null,
  not?: ModelMatchPlayerResponseConditionInput | null,
  or?: Array< ModelMatchPlayerResponseConditionInput | null > | null,
  questionIndex?: ModelIntInput | null,
  responseTime?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMatchPlayerResponseInput = {
  answer?: number | null,
  id?: string | null,
  matchId?: string | null,
  matchPlayInstanceId?: string | null,
  questionIndex?: number | null,
  responseTime?: string | null,
};

export type ModelMatchQuestionConditionInput = {
  and?: Array< ModelMatchQuestionConditionInput | null > | null,
  ans1?: ModelStringInput | null,
  ans2?: ModelStringInput | null,
  ans3?: ModelStringInput | null,
  ans4?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  matchId?: ModelIDInput | null,
  not?: ModelMatchQuestionConditionInput | null,
  or?: Array< ModelMatchQuestionConditionInput | null > | null,
  prompt?: ModelStringInput | null,
  questionIndex?: ModelIntInput | null,
  timeStamp?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMatchQuestionInput = {
  ans1?: string | null,
  ans2?: string | null,
  ans3?: string | null,
  ans4?: string | null,
  id?: string | null,
  matchId?: string | null,
  prompt?: string | null,
  questionIndex?: number | null,
  timeStamp?: number | null,
};

export type ModelMatchVideoStreamConditionInput = {
  and?: Array< ModelMatchVideoStreamConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  matchId?: ModelIDInput | null,
  not?: ModelMatchVideoStreamConditionInput | null,
  or?: Array< ModelMatchVideoStreamConditionInput | null > | null,
  start?: ModelStringInput | null,
  streamDelay?: ModelIntInput | null,
  streamState?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMatchVideoStreamInput = {
  id?: string | null,
  matchId?: string | null,
  start: string,
  streamDelay?: number | null,
  streamState: string,
};

export type ModelQuestionConditionInput = {
  and?: Array< ModelQuestionConditionInput | null > | null,
  ans1?: ModelStringInput | null,
  ans2?: ModelStringInput | null,
  ans3?: ModelStringInput | null,
  ans4?: ModelStringInput | null,
  correct?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelQuestionConditionInput | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  orderInd?: ModelIntInput | null,
  prompt?: ModelStringInput | null,
  quizId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateQuestionInput = {
  ans1?: string | null,
  ans2?: string | null,
  ans3?: string | null,
  ans4?: string | null,
  correct?: number | null,
  id?: string | null,
  orderInd?: number | null,
  prompt?: string | null,
  quizId?: string | null,
};

export type ModelQuizConditionInput = {
  and?: Array< ModelQuizConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelQuizConditionInput | null,
  or?: Array< ModelQuizConditionInput | null > | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateQuizInput = {
  id?: string | null,
  title?: string | null,
};

export type DeleteMatchInput = {
  id: string,
};

export type DeleteMatchAnswerInput = {
  id: string,
};

export type DeleteMatchPlayInstanceInput = {
  id: string,
};

export type DeleteMatchPlayerResponseInput = {
  id: string,
};

export type DeleteMatchQuestionInput = {
  id: string,
};

export type DeleteMatchVideoStreamInput = {
  id: string,
};

export type DeleteQuestionInput = {
  id: string,
};

export type DeleteQuizInput = {
  id: string,
};

export type UpdateMatchInput = {
  answerTime?: number | null,
  id: string,
  matchState?: string | null,
  name?: string | null,
  quizId?: string | null,
  start?: string | null,
};

export type UpdateMatchAnswerInput = {
  correct?: number | null,
  id: string,
  matchId?: string | null,
  questionIndex?: number | null,
  timeStamp?: number | null,
};

export type UpdateMatchPlayInstanceInput = {
  id: string,
  matchId?: string | null,
  playerId?: string | null,
  subId?: string | null,
};

export type UpdateMatchPlayerResponseInput = {
  answer?: number | null,
  id: string,
  matchId?: string | null,
  matchPlayInstanceId?: string | null,
  questionIndex?: number | null,
  responseTime?: string | null,
};

export type UpdateMatchQuestionInput = {
  ans1?: string | null,
  ans2?: string | null,
  ans3?: string | null,
  ans4?: string | null,
  id: string,
  matchId?: string | null,
  prompt?: string | null,
  questionIndex?: number | null,
  timeStamp?: number | null,
};

export type UpdateMatchVideoStreamInput = {
  id: string,
  matchId?: string | null,
  start?: string | null,
  streamDelay?: number | null,
  streamState?: string | null,
};

export type UpdateQuestionInput = {
  ans1?: string | null,
  ans2?: string | null,
  ans3?: string | null,
  ans4?: string | null,
  correct?: number | null,
  id: string,
  orderInd?: number | null,
  prompt?: string | null,
  quizId?: string | null,
};

export type UpdateQuizInput = {
  id: string,
  title?: string | null,
};

export type ModelSubscriptionMatchFilterInput = {
  and?: Array< ModelSubscriptionMatchFilterInput | null > | null,
  answerTime?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  matchState?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionMatchFilterInput | null > | null,
  quizId?: ModelSubscriptionIDInput | null,
  start?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionMatchAnswerFilterInput = {
  and?: Array< ModelSubscriptionMatchAnswerFilterInput | null > | null,
  correct?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  matchId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMatchAnswerFilterInput | null > | null,
  questionIndex?: ModelSubscriptionIntInput | null,
  timeStamp?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMatchPlayInstanceFilterInput = {
  and?: Array< ModelSubscriptionMatchPlayInstanceFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  matchId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMatchPlayInstanceFilterInput | null > | null,
  playerId?: ModelSubscriptionIDInput | null,
  subId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMatchPlayerResponseFilterInput = {
  and?: Array< ModelSubscriptionMatchPlayerResponseFilterInput | null > | null,
  answer?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  matchId?: ModelSubscriptionIDInput | null,
  matchPlayInstanceId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMatchPlayerResponseFilterInput | null > | null,
  questionIndex?: ModelSubscriptionIntInput | null,
  responseTime?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMatchQuestionFilterInput = {
  and?: Array< ModelSubscriptionMatchQuestionFilterInput | null > | null,
  ans1?: ModelSubscriptionStringInput | null,
  ans2?: ModelSubscriptionStringInput | null,
  ans3?: ModelSubscriptionStringInput | null,
  ans4?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  matchId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMatchQuestionFilterInput | null > | null,
  prompt?: ModelSubscriptionStringInput | null,
  questionIndex?: ModelSubscriptionIntInput | null,
  timeStamp?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMatchVideoStreamFilterInput = {
  and?: Array< ModelSubscriptionMatchVideoStreamFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  matchId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMatchVideoStreamFilterInput | null > | null,
  start?: ModelSubscriptionStringInput | null,
  streamDelay?: ModelSubscriptionIntInput | null,
  streamState?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionQuestionFilterInput = {
  and?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
  ans1?: ModelSubscriptionStringInput | null,
  ans2?: ModelSubscriptionStringInput | null,
  ans3?: ModelSubscriptionStringInput | null,
  ans4?: ModelSubscriptionStringInput | null,
  correct?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
  orderInd?: ModelSubscriptionIntInput | null,
  prompt?: ModelSubscriptionStringInput | null,
  quizId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionQuizFilterInput = {
  and?: Array< ModelSubscriptionQuizFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionQuizFilterInput | null > | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ClientAnswerFnQueryVariables = {
  answer?: number | null,
  matchId?: string | null,
  matchPlayInstanceId?: string | null,
  questionIndex?: number | null,
};

export type ClientAnswerFnQuery = {
  clientAnswerFn?: string | null,
};

export type GetMatchQueryVariables = {
  id: string,
};

export type GetMatchQuery = {
  getMatch?:  {
    __typename: "Match",
    answerTime?: number | null,
    createdAt: string,
    id: string,
    matchState: string,
    name?: string | null,
    quizId?: string | null,
    start: string,
    updatedAt: string,
  } | null,
};

export type GetMatchAnswerQueryVariables = {
  id: string,
};

export type GetMatchAnswerQuery = {
  getMatchAnswer?:  {
    __typename: "MatchAnswer",
    correct?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type GetMatchPlayInstanceQueryVariables = {
  id: string,
};

export type GetMatchPlayInstanceQuery = {
  getMatchPlayInstance?:  {
    __typename: "MatchPlayInstance",
    createdAt: string,
    id: string,
    matchId?: string | null,
    playerId?: string | null,
    subId?: string | null,
    updatedAt: string,
  } | null,
};

export type GetMatchPlayerResponseQueryVariables = {
  id: string,
};

export type GetMatchPlayerResponseQuery = {
  getMatchPlayerResponse?:  {
    __typename: "MatchPlayerResponse",
    answer?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    matchPlayInstanceId?: string | null,
    questionIndex?: number | null,
    responseTime?: string | null,
    updatedAt: string,
  } | null,
};

export type GetMatchQuestionQueryVariables = {
  id: string,
};

export type GetMatchQuestionQuery = {
  getMatchQuestion?:  {
    __typename: "MatchQuestion",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    prompt?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type GetMatchVideoStreamQueryVariables = {
  id: string,
};

export type GetMatchVideoStreamQuery = {
  getMatchVideoStream?:  {
    __typename: "MatchVideoStream",
    createdAt: string,
    id: string,
    matchId?: string | null,
    start: string,
    streamDelay?: number | null,
    streamState: string,
    updatedAt: string,
  } | null,
};

export type GetQuestionQueryVariables = {
  id: string,
};

export type GetQuestionQuery = {
  getQuestion?:  {
    __typename: "Question",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    correct?: number | null,
    createdAt: string,
    id: string,
    orderInd?: number | null,
    prompt?: string | null,
    quizId?: string | null,
    updatedAt: string,
  } | null,
};

export type GetQuizQueryVariables = {
  id: string,
};

export type GetQuizQuery = {
  getQuiz?:  {
    __typename: "Quiz",
    createdAt: string,
    id: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type ListByStartQueryVariables = {
  filter?: ModelMatchFilterInput | null,
  limit?: number | null,
  matchState: string,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  start?: ModelStringKeyConditionInput | null,
};

export type ListByStartQuery = {
  listByStart?:  {
    __typename: "ModelMatchConnection",
    items:  Array< {
      __typename: "Match",
      answerTime?: number | null,
      createdAt: string,
      id: string,
      matchState: string,
      name?: string | null,
      quizId?: string | null,
      start: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListByStreamStartQueryVariables = {
  filter?: ModelMatchVideoStreamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  start?: ModelStringKeyConditionInput | null,
  streamState: string,
};

export type ListByStreamStartQuery = {
  listByStreamStart?:  {
    __typename: "ModelMatchVideoStreamConnection",
    items:  Array< {
      __typename: "MatchVideoStream",
      createdAt: string,
      id: string,
      matchId?: string | null,
      start: string,
      streamDelay?: number | null,
      streamState: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMatchAnswersQueryVariables = {
  filter?: ModelMatchAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMatchAnswersQuery = {
  listMatchAnswers?:  {
    __typename: "ModelMatchAnswerConnection",
    items:  Array< {
      __typename: "MatchAnswer",
      correct?: number | null,
      createdAt: string,
      id: string,
      matchId?: string | null,
      questionIndex?: number | null,
      timeStamp?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMatchPlayInstancesQueryVariables = {
  filter?: ModelMatchPlayInstanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMatchPlayInstancesQuery = {
  listMatchPlayInstances?:  {
    __typename: "ModelMatchPlayInstanceConnection",
    items:  Array< {
      __typename: "MatchPlayInstance",
      createdAt: string,
      id: string,
      matchId?: string | null,
      playerId?: string | null,
      subId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMatchPlayerResponsesQueryVariables = {
  filter?: ModelMatchPlayerResponseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMatchPlayerResponsesQuery = {
  listMatchPlayerResponses?:  {
    __typename: "ModelMatchPlayerResponseConnection",
    items:  Array< {
      __typename: "MatchPlayerResponse",
      answer?: number | null,
      createdAt: string,
      id: string,
      matchId?: string | null,
      matchPlayInstanceId?: string | null,
      questionIndex?: number | null,
      responseTime?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMatchQuestionsQueryVariables = {
  filter?: ModelMatchQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMatchQuestionsQuery = {
  listMatchQuestions?:  {
    __typename: "ModelMatchQuestionConnection",
    items:  Array< {
      __typename: "MatchQuestion",
      ans1?: string | null,
      ans2?: string | null,
      ans3?: string | null,
      ans4?: string | null,
      createdAt: string,
      id: string,
      matchId?: string | null,
      prompt?: string | null,
      questionIndex?: number | null,
      timeStamp?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMatchVideoStreamsQueryVariables = {
  filter?: ModelMatchVideoStreamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMatchVideoStreamsQuery = {
  listMatchVideoStreams?:  {
    __typename: "ModelMatchVideoStreamConnection",
    items:  Array< {
      __typename: "MatchVideoStream",
      createdAt: string,
      id: string,
      matchId?: string | null,
      start: string,
      streamDelay?: number | null,
      streamState: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMatchesQueryVariables = {
  filter?: ModelMatchFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMatchesQuery = {
  listMatches?:  {
    __typename: "ModelMatchConnection",
    items:  Array< {
      __typename: "Match",
      answerTime?: number | null,
      createdAt: string,
      id: string,
      matchState: string,
      name?: string | null,
      quizId?: string | null,
      start: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsQuery = {
  listQuestions?:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      ans1?: string | null,
      ans2?: string | null,
      ans3?: string | null,
      ans4?: string | null,
      correct?: number | null,
      createdAt: string,
      id: string,
      orderInd?: number | null,
      prompt?: string | null,
      quizId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuizzesQueryVariables = {
  filter?: ModelQuizFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuizzesQuery = {
  listQuizzes?:  {
    __typename: "ModelQuizConnection",
    items:  Array< {
      __typename: "Quiz",
      createdAt: string,
      id: string,
      title?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateMatchMutationVariables = {
  condition?: ModelMatchConditionInput | null,
  input: CreateMatchInput,
};

export type CreateMatchMutation = {
  createMatch?:  {
    __typename: "Match",
    answerTime?: number | null,
    createdAt: string,
    id: string,
    matchState: string,
    name?: string | null,
    quizId?: string | null,
    start: string,
    updatedAt: string,
  } | null,
};

export type CreateMatchAnswerMutationVariables = {
  condition?: ModelMatchAnswerConditionInput | null,
  input: CreateMatchAnswerInput,
};

export type CreateMatchAnswerMutation = {
  createMatchAnswer?:  {
    __typename: "MatchAnswer",
    correct?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateMatchPlayInstanceMutationVariables = {
  condition?: ModelMatchPlayInstanceConditionInput | null,
  input: CreateMatchPlayInstanceInput,
};

export type CreateMatchPlayInstanceMutation = {
  createMatchPlayInstance?:  {
    __typename: "MatchPlayInstance",
    createdAt: string,
    id: string,
    matchId?: string | null,
    playerId?: string | null,
    subId?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateMatchPlayerResponseMutationVariables = {
  condition?: ModelMatchPlayerResponseConditionInput | null,
  input: CreateMatchPlayerResponseInput,
};

export type CreateMatchPlayerResponseMutation = {
  createMatchPlayerResponse?:  {
    __typename: "MatchPlayerResponse",
    answer?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    matchPlayInstanceId?: string | null,
    questionIndex?: number | null,
    responseTime?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateMatchQuestionMutationVariables = {
  condition?: ModelMatchQuestionConditionInput | null,
  input: CreateMatchQuestionInput,
};

export type CreateMatchQuestionMutation = {
  createMatchQuestion?:  {
    __typename: "MatchQuestion",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    prompt?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateMatchVideoStreamMutationVariables = {
  condition?: ModelMatchVideoStreamConditionInput | null,
  input: CreateMatchVideoStreamInput,
};

export type CreateMatchVideoStreamMutation = {
  createMatchVideoStream?:  {
    __typename: "MatchVideoStream",
    createdAt: string,
    id: string,
    matchId?: string | null,
    start: string,
    streamDelay?: number | null,
    streamState: string,
    updatedAt: string,
  } | null,
};

export type CreateQuestionMutationVariables = {
  condition?: ModelQuestionConditionInput | null,
  input: CreateQuestionInput,
};

export type CreateQuestionMutation = {
  createQuestion?:  {
    __typename: "Question",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    correct?: number | null,
    createdAt: string,
    id: string,
    orderInd?: number | null,
    prompt?: string | null,
    quizId?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateQuizMutationVariables = {
  condition?: ModelQuizConditionInput | null,
  input: CreateQuizInput,
};

export type CreateQuizMutation = {
  createQuiz?:  {
    __typename: "Quiz",
    createdAt: string,
    id: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteMatchMutationVariables = {
  condition?: ModelMatchConditionInput | null,
  input: DeleteMatchInput,
};

export type DeleteMatchMutation = {
  deleteMatch?:  {
    __typename: "Match",
    answerTime?: number | null,
    createdAt: string,
    id: string,
    matchState: string,
    name?: string | null,
    quizId?: string | null,
    start: string,
    updatedAt: string,
  } | null,
};

export type DeleteMatchAnswerMutationVariables = {
  condition?: ModelMatchAnswerConditionInput | null,
  input: DeleteMatchAnswerInput,
};

export type DeleteMatchAnswerMutation = {
  deleteMatchAnswer?:  {
    __typename: "MatchAnswer",
    correct?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteMatchPlayInstanceMutationVariables = {
  condition?: ModelMatchPlayInstanceConditionInput | null,
  input: DeleteMatchPlayInstanceInput,
};

export type DeleteMatchPlayInstanceMutation = {
  deleteMatchPlayInstance?:  {
    __typename: "MatchPlayInstance",
    createdAt: string,
    id: string,
    matchId?: string | null,
    playerId?: string | null,
    subId?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteMatchPlayerResponseMutationVariables = {
  condition?: ModelMatchPlayerResponseConditionInput | null,
  input: DeleteMatchPlayerResponseInput,
};

export type DeleteMatchPlayerResponseMutation = {
  deleteMatchPlayerResponse?:  {
    __typename: "MatchPlayerResponse",
    answer?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    matchPlayInstanceId?: string | null,
    questionIndex?: number | null,
    responseTime?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteMatchQuestionMutationVariables = {
  condition?: ModelMatchQuestionConditionInput | null,
  input: DeleteMatchQuestionInput,
};

export type DeleteMatchQuestionMutation = {
  deleteMatchQuestion?:  {
    __typename: "MatchQuestion",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    prompt?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteMatchVideoStreamMutationVariables = {
  condition?: ModelMatchVideoStreamConditionInput | null,
  input: DeleteMatchVideoStreamInput,
};

export type DeleteMatchVideoStreamMutation = {
  deleteMatchVideoStream?:  {
    __typename: "MatchVideoStream",
    createdAt: string,
    id: string,
    matchId?: string | null,
    start: string,
    streamDelay?: number | null,
    streamState: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionMutationVariables = {
  condition?: ModelQuestionConditionInput | null,
  input: DeleteQuestionInput,
};

export type DeleteQuestionMutation = {
  deleteQuestion?:  {
    __typename: "Question",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    correct?: number | null,
    createdAt: string,
    id: string,
    orderInd?: number | null,
    prompt?: string | null,
    quizId?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteQuizMutationVariables = {
  condition?: ModelQuizConditionInput | null,
  input: DeleteQuizInput,
};

export type DeleteQuizMutation = {
  deleteQuiz?:  {
    __typename: "Quiz",
    createdAt: string,
    id: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateMatchMutationVariables = {
  condition?: ModelMatchConditionInput | null,
  input: UpdateMatchInput,
};

export type UpdateMatchMutation = {
  updateMatch?:  {
    __typename: "Match",
    answerTime?: number | null,
    createdAt: string,
    id: string,
    matchState: string,
    name?: string | null,
    quizId?: string | null,
    start: string,
    updatedAt: string,
  } | null,
};

export type UpdateMatchAnswerMutationVariables = {
  condition?: ModelMatchAnswerConditionInput | null,
  input: UpdateMatchAnswerInput,
};

export type UpdateMatchAnswerMutation = {
  updateMatchAnswer?:  {
    __typename: "MatchAnswer",
    correct?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateMatchPlayInstanceMutationVariables = {
  condition?: ModelMatchPlayInstanceConditionInput | null,
  input: UpdateMatchPlayInstanceInput,
};

export type UpdateMatchPlayInstanceMutation = {
  updateMatchPlayInstance?:  {
    __typename: "MatchPlayInstance",
    createdAt: string,
    id: string,
    matchId?: string | null,
    playerId?: string | null,
    subId?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateMatchPlayerResponseMutationVariables = {
  condition?: ModelMatchPlayerResponseConditionInput | null,
  input: UpdateMatchPlayerResponseInput,
};

export type UpdateMatchPlayerResponseMutation = {
  updateMatchPlayerResponse?:  {
    __typename: "MatchPlayerResponse",
    answer?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    matchPlayInstanceId?: string | null,
    questionIndex?: number | null,
    responseTime?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateMatchQuestionMutationVariables = {
  condition?: ModelMatchQuestionConditionInput | null,
  input: UpdateMatchQuestionInput,
};

export type UpdateMatchQuestionMutation = {
  updateMatchQuestion?:  {
    __typename: "MatchQuestion",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    prompt?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateMatchVideoStreamMutationVariables = {
  condition?: ModelMatchVideoStreamConditionInput | null,
  input: UpdateMatchVideoStreamInput,
};

export type UpdateMatchVideoStreamMutation = {
  updateMatchVideoStream?:  {
    __typename: "MatchVideoStream",
    createdAt: string,
    id: string,
    matchId?: string | null,
    start: string,
    streamDelay?: number | null,
    streamState: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionMutationVariables = {
  condition?: ModelQuestionConditionInput | null,
  input: UpdateQuestionInput,
};

export type UpdateQuestionMutation = {
  updateQuestion?:  {
    __typename: "Question",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    correct?: number | null,
    createdAt: string,
    id: string,
    orderInd?: number | null,
    prompt?: string | null,
    quizId?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateQuizMutationVariables = {
  condition?: ModelQuizConditionInput | null,
  input: UpdateQuizInput,
};

export type UpdateQuizMutation = {
  updateQuiz?:  {
    __typename: "Quiz",
    createdAt: string,
    id: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateMatchSubscriptionVariables = {
  filter?: ModelSubscriptionMatchFilterInput | null,
};

export type OnCreateMatchSubscription = {
  onCreateMatch?:  {
    __typename: "Match",
    answerTime?: number | null,
    createdAt: string,
    id: string,
    matchState: string,
    name?: string | null,
    quizId?: string | null,
    start: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMatchAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionMatchAnswerFilterInput | null,
};

export type OnCreateMatchAnswerSubscription = {
  onCreateMatchAnswer?:  {
    __typename: "MatchAnswer",
    correct?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateMatchPlayInstanceSubscriptionVariables = {
  filter?: ModelSubscriptionMatchPlayInstanceFilterInput | null,
};

export type OnCreateMatchPlayInstanceSubscription = {
  onCreateMatchPlayInstance?:  {
    __typename: "MatchPlayInstance",
    createdAt: string,
    id: string,
    matchId?: string | null,
    playerId?: string | null,
    subId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateMatchPlayerResponseSubscriptionVariables = {
  filter?: ModelSubscriptionMatchPlayerResponseFilterInput | null,
};

export type OnCreateMatchPlayerResponseSubscription = {
  onCreateMatchPlayerResponse?:  {
    __typename: "MatchPlayerResponse",
    answer?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    matchPlayInstanceId?: string | null,
    questionIndex?: number | null,
    responseTime?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateMatchQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionMatchQuestionFilterInput | null,
};

export type OnCreateMatchQuestionSubscription = {
  onCreateMatchQuestion?:  {
    __typename: "MatchQuestion",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    prompt?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateMatchVideoStreamSubscriptionVariables = {
  filter?: ModelSubscriptionMatchVideoStreamFilterInput | null,
};

export type OnCreateMatchVideoStreamSubscription = {
  onCreateMatchVideoStream?:  {
    __typename: "MatchVideoStream",
    createdAt: string,
    id: string,
    matchId?: string | null,
    start: string,
    streamDelay?: number | null,
    streamState: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion?:  {
    __typename: "Question",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    correct?: number | null,
    createdAt: string,
    id: string,
    orderInd?: number | null,
    prompt?: string | null,
    quizId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnCreateQuizSubscription = {
  onCreateQuiz?:  {
    __typename: "Quiz",
    createdAt: string,
    id: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMatchSubscriptionVariables = {
  filter?: ModelSubscriptionMatchFilterInput | null,
};

export type OnDeleteMatchSubscription = {
  onDeleteMatch?:  {
    __typename: "Match",
    answerTime?: number | null,
    createdAt: string,
    id: string,
    matchState: string,
    name?: string | null,
    quizId?: string | null,
    start: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMatchAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionMatchAnswerFilterInput | null,
};

export type OnDeleteMatchAnswerSubscription = {
  onDeleteMatchAnswer?:  {
    __typename: "MatchAnswer",
    correct?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMatchPlayInstanceSubscriptionVariables = {
  filter?: ModelSubscriptionMatchPlayInstanceFilterInput | null,
};

export type OnDeleteMatchPlayInstanceSubscription = {
  onDeleteMatchPlayInstance?:  {
    __typename: "MatchPlayInstance",
    createdAt: string,
    id: string,
    matchId?: string | null,
    playerId?: string | null,
    subId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMatchPlayerResponseSubscriptionVariables = {
  filter?: ModelSubscriptionMatchPlayerResponseFilterInput | null,
};

export type OnDeleteMatchPlayerResponseSubscription = {
  onDeleteMatchPlayerResponse?:  {
    __typename: "MatchPlayerResponse",
    answer?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    matchPlayInstanceId?: string | null,
    questionIndex?: number | null,
    responseTime?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMatchQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionMatchQuestionFilterInput | null,
};

export type OnDeleteMatchQuestionSubscription = {
  onDeleteMatchQuestion?:  {
    __typename: "MatchQuestion",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    prompt?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMatchVideoStreamSubscriptionVariables = {
  filter?: ModelSubscriptionMatchVideoStreamFilterInput | null,
};

export type OnDeleteMatchVideoStreamSubscription = {
  onDeleteMatchVideoStream?:  {
    __typename: "MatchVideoStream",
    createdAt: string,
    id: string,
    matchId?: string | null,
    start: string,
    streamDelay?: number | null,
    streamState: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion?:  {
    __typename: "Question",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    correct?: number | null,
    createdAt: string,
    id: string,
    orderInd?: number | null,
    prompt?: string | null,
    quizId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnDeleteQuizSubscription = {
  onDeleteQuiz?:  {
    __typename: "Quiz",
    createdAt: string,
    id: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMatchSubscriptionVariables = {
  filter?: ModelSubscriptionMatchFilterInput | null,
};

export type OnUpdateMatchSubscription = {
  onUpdateMatch?:  {
    __typename: "Match",
    answerTime?: number | null,
    createdAt: string,
    id: string,
    matchState: string,
    name?: string | null,
    quizId?: string | null,
    start: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMatchAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionMatchAnswerFilterInput | null,
};

export type OnUpdateMatchAnswerSubscription = {
  onUpdateMatchAnswer?:  {
    __typename: "MatchAnswer",
    correct?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMatchPlayInstanceSubscriptionVariables = {
  filter?: ModelSubscriptionMatchPlayInstanceFilterInput | null,
};

export type OnUpdateMatchPlayInstanceSubscription = {
  onUpdateMatchPlayInstance?:  {
    __typename: "MatchPlayInstance",
    createdAt: string,
    id: string,
    matchId?: string | null,
    playerId?: string | null,
    subId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMatchPlayerResponseSubscriptionVariables = {
  filter?: ModelSubscriptionMatchPlayerResponseFilterInput | null,
};

export type OnUpdateMatchPlayerResponseSubscription = {
  onUpdateMatchPlayerResponse?:  {
    __typename: "MatchPlayerResponse",
    answer?: number | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    matchPlayInstanceId?: string | null,
    questionIndex?: number | null,
    responseTime?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMatchQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionMatchQuestionFilterInput | null,
};

export type OnUpdateMatchQuestionSubscription = {
  onUpdateMatchQuestion?:  {
    __typename: "MatchQuestion",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    createdAt: string,
    id: string,
    matchId?: string | null,
    prompt?: string | null,
    questionIndex?: number | null,
    timeStamp?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMatchVideoStreamSubscriptionVariables = {
  filter?: ModelSubscriptionMatchVideoStreamFilterInput | null,
};

export type OnUpdateMatchVideoStreamSubscription = {
  onUpdateMatchVideoStream?:  {
    __typename: "MatchVideoStream",
    createdAt: string,
    id: string,
    matchId?: string | null,
    start: string,
    streamDelay?: number | null,
    streamState: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion?:  {
    __typename: "Question",
    ans1?: string | null,
    ans2?: string | null,
    ans3?: string | null,
    ans4?: string | null,
    correct?: number | null,
    createdAt: string,
    id: string,
    orderInd?: number | null,
    prompt?: string | null,
    quizId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnUpdateQuizSubscription = {
  onUpdateQuiz?:  {
    __typename: "Quiz",
    createdAt: string,
    id: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};
