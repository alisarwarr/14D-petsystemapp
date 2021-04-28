import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkAppsyncEventbridgeSnsSesStepfunctionsBackend from '../lib/cdk-appsync-eventbridge-sns-ses-stepfunctions-backend-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkAppsyncEventbridgeSnsSesStepfunctionsBackend.CdkAppsyncEventbridgeSnsSesStepfunctionsBackendStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
