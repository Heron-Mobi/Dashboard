#!/bin/bash

REGION=$1

BUCKET=$(aws cloudformation describe-stacks --region ${REGION} \
	--stack-name heron-dashboard \
	--query 'Stacks[0].Outputs[0].OutputValue' --output text )

aws s3 cp dist/ s3://${BUCKET} --recursive
