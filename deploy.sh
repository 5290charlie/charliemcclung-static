#!/bin/bash

aws s3 sync public/ s3://charliemcclung.com/ --delete
aws cloudfront create-invalidation --distribution-id EWQ3XGFZ5HLNL --paths "/*"
