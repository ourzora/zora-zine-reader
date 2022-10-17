# ZORA ZINE READER

POC api to normalize zora zine article data for usage with text to voice synthesis.

## Get Uberduck Token:
```
curl -u $API_KEY:$API_SECRET \
  'https://api.uberduck.ai/speak' \
  --data-raw '{"speech":"This is just a test.","voice":"zwf"}'
  
# Sample output:
# { "uuid": "abcd1234-7f75-441e-b0f1-1aee401134d9" }
```