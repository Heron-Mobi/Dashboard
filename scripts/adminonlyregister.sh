#!/bin/bash

REGION=$1
ENABLE=$2

USERPOOLID=$(aws cloudformation describe-stacks --region ${REGION} \
	--stack-name heron-base \
	--query 'Stacks[0].Outputs[?OutputKey==`UserPoolId`].OutputValue' --output text)


aws cognito-idp update-user-pool --user-pool-id ${USERPOOLID} \
	--region ${REGION} \
	--email-configuration EmailSendingAccount=COGNITO_DEFAULT \
	--auto-verified-attributes email \
	--admin-create-user-config AllowAdminCreateUserOnly=${ENABLE}
