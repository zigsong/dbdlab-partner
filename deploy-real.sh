#!/bin/bash

echo "Deploy To S3 Bucket dbd-realdopt-partner"
npm run build-real
aws s3 sync ./build/ s3://dbd-realdopt-partner
aws cloudfront create-invalidation --distribution-id E2MZ7920GG1TUI --paths "/*" 