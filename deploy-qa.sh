#!/bin/bash

echo "Deploy To S3 Bucket dbd-realdopt-partner-web"
npm run build-qa
aws s3 sync ./build/ s3://dbd-realdopt-partner-web
aws cloudfront create-invalidation --distribution-id E3ES8GJYEC1VCX --paths "/*"
