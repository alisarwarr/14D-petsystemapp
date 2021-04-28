import * as cdk from '@aws-cdk/core';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';
//APPSYNC
import * as appsync from '@aws-cdk/aws-appsync';
//EVENTBRIDGE
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
//IAM
import { Effect, PolicyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
//SNS
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
//STEPFUNCTIONS
import * as stepFunctions from '@aws-cdk/aws-stepfunctions';
import * as stepFunctionsTasks from '@aws-cdk/aws-stepfunctions-tasks';
//VTL-REQUEST-RESPONSE
import { EVENT_SOURCE, requestTemplate, responseTemplate } from '../utils/appsync-request-response';

export class CdkAppsyncEventbridgeSnsSesStepfunctionsBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);



    //APPSYNC's API gives you a graphqlApi with apiKey ( for deploying APPSYNC )
    const api = new appsync.GraphqlApi(this, 'graphlApi', {
      name: 'petsystemapp-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      }
    });



    //creating HTTPdatasource ( that will put our event to the eventbus )
    const http_datasource = api.addHttpDataSource('petsystemapp-ds',
      //ENDPOINT for eventbridge
      `https://events.${this.region}.amazonaws.com/`,
      {
        name: 'httpDsWithEventBridge',
        description: 'From Appsync to Eventbridge',
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: 'events'
        }
      }
    );
    //giving permissions for HTTPdatasource
    events.EventBus.grantPutEvents(http_datasource);



    //mutations
    const thatMutation = "createLabreport";
    const details = `\\\"id\\\": \\\"$ctx.args.id\\\", \\\"petAnimal\\\": \\\"$ctx.args.petAnimal\\\", \\\"petColor\\\": \\\"$ctx.args.petColor\\\", \\\"petName\\\": \\\"$ctx.args.petName\\\", \\\"petAge\\\": \\\"$ctx.args.petAge\\\", \\\"petGender\\\": \\\"$ctx.args.petGender\\\", \\\"petWeight\\\": \\\"$ctx.args.petWeight\\\", \\\"petCondition\\\": \\\"$ctx.args.petCondition\\\", \\\"petOwnerName\\\": \\\"$ctx.args.petOwnerName\\\", \\\"petOwnerEmail\\\": \\\"$ctx.args.petOwnerEmail\\\", \\\"petOwnerPhone\\\": \\\"$ctx.args.petOwnerPhone\\\"`;
    //describing resolver for db_datasource ( for send data to dynamoDB )
    http_datasource.createResolver({
      typeName: "Mutation",
      fieldName: thatMutation,
      requestMappingTemplate: appsync.MappingTemplate.fromString(requestTemplate(details, thatMutation)),
      responseMappingTemplate: appsync.MappingTemplate.fromString(responseTemplate()),
    });



    //creating lambdafunction
    const dynamodbLambda = new lambda.Function(this, 'petsystemapp-dynamodbLambda', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'dynamodb.handler'
    });



//**************************DYNAMODB**************************/
    //creating table
    const myTable = new ddb.Table(this, 'petsystemapp-table', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING
      }
    });
    //for give access to lambdafunction ( to get data from dynamoDB's table )
    myTable.grantReadWriteData(dynamodbLambda);
    //for tell lambdafunction ( that this named table consider for storing )
    dynamodbLambda.addEnvironment('TABLE_NAME', myTable.tableName);    
//**************************DYNAMODB**************************/



//**************************SNS**************************/ 
    //create an SNS topic ( for like send topic )
    const snsTopic = new sns.Topic(this, 'petsystemapp-snsTopic');

    const phoneNumber = "+923353089102";
    //following command subscribes our phone to the SNS topic ( whenever a topics comes then goes to phone )
    snsTopic.addSubscription(
      new subscriptions.SmsSubscription(phoneNumber)
    );

    const emailAddress = "alisarwar9596@gmail.com";
    //following command subscribes our email to the SNS topic ( whenever a topics comes then goes to email )
    snsTopic.addSubscription(
      new subscriptions.EmailSubscription(emailAddress)
    );
//**************************SNS**************************/



//*********************ROLES SNSLAMBDA**********************/
    //create a specific role for Lambda function ( emptyrole )
    const role = new Role(this, 'LambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    });

    //giving sns:publish access to lambda    
    const policy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["SNS:Publish", "logs:*", "ses:SendEmail"],
      resources: ['*']
    });

    //granting IAM permissions to role ( not emptyrole )
    role.addToPolicy(policy);
//*********************ROLES SNSLAMBDA**********************/



    //creating lambdafunction
    const SNSnSESlambda = new lambda.Function(this, 'petsystemapp-SNSnSESlambda', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset(path.join(__dirname, "../lambda/SNSnSES")),
      handler: 'index.handler',
      environment : {
        SNS_TOPIC_ARN: snsTopic.topicArn,
        PHONE_NUMBER: phoneNumber,
        EMAIL_ADDRESS: emailAddress,
        REGION: this.region
      },
      //giving role
      role: role
    });



//*********************STEPFUNCTIONS**********************/
    //creating step of stepfunction
    const step1 = new stepFunctionsTasks.LambdaInvoke(
      this,
      "Invoke dynamodbLambda",
      {
        lambdaFunction: dynamodbLambda
      }
    );
    const step2 = new stepFunctionsTasks.LambdaInvoke(
      this,
      "Invoke SNSnSESlambda",
      {
        lambdaFunction: SNSnSESlambda,
        inputPath: "$.Payload"
      }
    );

    //creating chain ( to define the sequence of execution )
    const chain = stepFunctions.Chain
    .start(step1)
    .next(step2);

    //creating statemachine
    const stepFnStateMachine = new stepFunctions.StateMachine(this, 'petsystemapp-stateMachine', {
      definition: chain
    });
//*********************STEPFUNCTIONS**********************/



    //rule fire by default event bus has target statemachine
    const rule = new events.Rule(this, 'appsyncEventbridgeRule', {
      ruleName: 'petsystemapp-appsyncEventbridgeRule',
      description: 'created for appSyncEventbridge',
      eventPattern: {
        source: [EVENT_SOURCE],
        detailType: [thatMutation]
        //every event that has source = "petsystemapp-events" will be sent to our lambda
      },
      targets: [new targets.SfnStateMachine(stepFnStateMachine)]
    });
  }
}