import os
import boto3

s3_client = boto3.client('s3')

def lambda_handler(event, context):
    output_bucket = os.environ['OUTPUT_BUCKET']
    transcription_result = event['TranscriptionJob']['Transcript']['TranscriptFileUri']
    
    # Save transcription result in the output S3 bucket
    s3_client.copy_object(
        Bucket=output_bucket,
        CopySource=transcription_result,
        Key=f"transcription_{transcription_result.split('/')[-1]}"
    )
    
    return {
        'statusCode': 200,
        'body': 'Transcription saved to S3.'
    }
