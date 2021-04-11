#!/bin/sh

aws configure set aws_access_key_id default_access_key
aws configure set aws_secret_access_key default_secret_key
aws configure set default.region us-east-1
aws configure set default.output json

## Missing dependency for awslocal
pip install localstack_client

awslocal s3api create-bucket --bucket soen-390-dev
