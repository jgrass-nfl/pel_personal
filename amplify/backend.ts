import { defineBackend } from '@aws-amplify/backend';
import { clientAnswerFn } from './functions/client-answer-fn/resource';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  clientAnswerFn,
});


const { groups } = backend.auth.resources


// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.IRole.html
groups["HOSTS"].role