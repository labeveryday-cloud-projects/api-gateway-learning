import os
import boto3

s3_client = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = os.environ['UPLOAD_BUCKET']
    file_name = event['queryStringParameters']['file_name']
    
    # Generate a pre-signed URL for PUT operation
    presigned_url = s3_client.generate_presigned_url('put_object', Params={
        'Bucket': bucket_name,
        'Key': file_name,
    }, ExpiresIn=3600)
    
    return {
        'statusCode': 200,
        'body': presigned_url
    }
